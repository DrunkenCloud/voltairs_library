package main

import (
	"log"
	"net/http"
)

func withCORS(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
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
	http.HandleFunc("/verify", withCORS(TokenVerificationHandler))
	http.HandleFunc("/send-code", withCORS(SendCodeHandler))

	log.Println("Server started at localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
