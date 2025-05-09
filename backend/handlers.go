package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

func SignupHandler(w http.ResponseWriter, r *http.Request) {
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

	w.WriteHeader(http.StatusCreated)
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	var user User
	json.NewDecoder(r.Body).Decode(&user)

	fmt.Println(user.Username, user.Password)
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

	fmt.Println(user.Username)
	fmt.Println(user.Password)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"token": token})
}

func TokenVerificationHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var reqBody struct {
		Token string `json:"token"`
	}
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		fmt.Println("handlers.go -> TokenVerificationHandler: ", err.Error())
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if reqBody.Token == "" {
		http.Error(w, "Token is required", http.StatusUnauthorized)
		return
	}

	if err := VerifyToken(reqBody.Token); err != nil {
		fmt.Println("handlers.go -> TokenVerificationHandler: ", err.Error())
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Token is valid"))
}
