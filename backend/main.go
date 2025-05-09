package main

import (
	"log"
	"net/http"
)

func main() {
	InitDB()
	InitJWT()
	defer DB.Close()

	http.HandleFunc("/signup", SignupHandler)
	http.HandleFunc("/login", LoginHandler)
	http.HandleFunc("/verify", TokenVerificationHandler)

	log.Println("Server started at :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
