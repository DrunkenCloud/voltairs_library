package main

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"golang.org/x/crypto/bcrypt"
)

func SignupHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var user SignupPayload
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid data", http.StatusBadRequest)
		return
	}

	if user.Username == "" || user.Password == "" {
		http.Error(w, "Username and password are required", http.StatusBadRequest)
		return
	}

	expectedCode, err := RedisGet(user.Email)
	if err != nil {
		fmt.Println("handlers.go -> SignupHandler: ", err.Error())
	}
	if expectedCode == "" || expectedCode != user.Code {
		http.Error(w, "Invalid or expired verification code", http.StatusUnauthorized)
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println("handlers.go -> SignupHandler: ", err.Error())
		http.Error(w, "Server error", http.StatusInternalServerError)
		return
	}

	_, err = DB.Exec("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", user.Username, hash, user.Email)
	if err != nil {
		fmt.Println("handlers.go -> SignupHandler: ", err.Error())
		http.Error(w, "User already exists", http.StatusBadRequest)
		return
	}

	_, err = RedisDel(user.Email)
	if err != nil {
		fmt.Println("handlers.go -> SignupHandler: ", err.Error())
	}
	w.WriteHeader(http.StatusCreated)
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	var user User
	json.NewDecoder(r.Body).Decode(&user)

	if user.Username == "" || user.Password == "" {
		http.Error(w, "Username and password are required", http.StatusBadRequest)
		return
	}

	var hashed string
	err := DB.QueryRow("SELECT password FROM users WHERE username = ?", user.Username).Scan(&hashed)
	if err != nil {
		fmt.Println("handlers.go -> LoginHandler: ", err.Error())
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(hashed), []byte(user.Password))
	if err != nil {
		fmt.Println("handlers.go -> LoginHandler: ", err.Error())
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	token, err := GenerateJWT(user.Username)
	if err != nil {
		fmt.Println("handlers.go -> LoginHandler: ", err.Error())
		http.Error(w, "Could not generate token", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"token": token})
}

func SendCodeHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	type Req struct {
		Email string `json:"email"`
	}
	var req Req
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || req.Email == "" {
		http.Error(w, "Invalid email", http.StatusBadRequest)
		return
	}

	rateLimitKey := "ratelimit:" + req.Email
	ok, _ := RedisClient.SetNX(ctx, rateLimitKey, "1", 1*time.Minute).Result()
	if !ok {
		http.Error(w, "Wait 1 minute before requesting again", http.StatusTooManyRequests)
		return
	}

	code := fmt.Sprintf("%06d", rand.Intn(1000000))

	if err := RedisSet(req.Email, code, 10*time.Minute); err != nil {
		http.Error(w, "Failed to store code", http.StatusInternalServerError)
		return
	}

	codeInt, _ := strconv.Atoi(code)
	SendVerificationCode(codeInt, req.Email)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Code sent"))
}

func TokenVerificationHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "Only GET allowed", http.StatusMethodNotAllowed)
		return
	}

	tokenString := r.Header.Get("Authorization")
	_, err := VerifyToken(tokenString)
	if err != nil {
		http.Error(w, "Invalid token", http.StatusUnauthorized)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func UpdateUserHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}

	tokenString := r.Header.Get("Authorization")
	usernameFromToken, err := VerifyToken(tokenString)
	if err != nil {
		http.Error(w, "Invalid token", http.StatusUnauthorized)
		return
	}

	var req User
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid body", http.StatusBadRequest)
		return
	}

	if req.Username != usernameFromToken {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	_, err = DB.Exec("UPDATE users SET bio = ?, photo = ? WHERE username = ?", req.Bio, req.Photo, req.Username)
	if err != nil {
		fmt.Println("handlers.go -> UpdateUserHandler: ", err.Error())
		http.Error(w, "DB error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Profile updated"))
}
