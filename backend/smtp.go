package main

import (
	"fmt"
	"log"
	"net/smtp"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
)

var smtpPort = "587"
var stmpHost = "smtp.gmail.com"
var sysMail string
var sysMailPassword string

var auth smtp.Auth

func InitStmp() {
	err := godotenv.Load(filepath.Join("..", ".env"))
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}
	sysMail = os.Getenv("SYSMAIL")
	sysMailPassword = os.Getenv("SYSMAIL_PASS")
	auth = smtp.PlainAuth("", sysMail, sysMailPassword, stmpHost)
}

func SendVerificationCode(Code int, Email string) error {
	subject := "Subject: Your Verification Code\n"
	body := fmt.Sprintf("Hello,\n\nYour verification code is %06d.\n\nThanks.", Code)
	msg := []byte(subject + "\n" + body)

	if err := smtp.SendMail(stmpHost+":"+smtpPort, auth, sysMail, []string{Email}, msg); err != nil {
		fmt.Println("smtp.go -> SendVerificationCode: ", err.Error())
		return err
	}

	return nil
}
