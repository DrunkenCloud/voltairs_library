package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
)

var jwtKey string

func InitJWT() {
	err := godotenv.Load(filepath.Join("..", ".env"))
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}
	jwtKey = os.Getenv("JWT_KEY")
	if jwtKey == "" {
		log.Fatal("JWT_KEY not set")
	}
}

func GenerateJWT(username string) (string, error) {
	claims := jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(1 * time.Minute).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(jwtKey))
}

func VerifyToken(tokenString string) error {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (any, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(jwtKey), nil
	})

	if err != nil || !token.Valid {
		return fmt.Errorf("invalid or expired token")
	}
	return nil
}
