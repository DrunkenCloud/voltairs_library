package main

import (
	"log"
	"net/http"
)

func withCORS(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, Username")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		h.ServeHTTP(w, r)
	}
}

func main() {
	InitDB()
	InitJWT()
	InitStmp()
	InitRedis()
	defer DB.Close()

	http.HandleFunc("/signup", withCORS(SignupHandler))
	http.HandleFunc("/login", withCORS(LoginHandler))
	http.HandleFunc("/send-code", withCORS(SendCodeHandler))
	http.HandleFunc("/update-user", withCORS(UpdateUserHandler))
	http.HandleFunc("/verify-user", withCORS(TokenVerificationHandler))

	log.Println("Server started at localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
