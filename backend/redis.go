package main

import (
	"context"
	"log"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/joho/godotenv"
	"github.com/redis/go-redis/v9"
)

var (
	RedisClient *redis.Client
	ctx         = context.Background()
)

func InitRedis() {
	ctx := context.Background()

	err := godotenv.Load(filepath.Join("..", ".env"))
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	requiredEnvVars := []string{
		"REDIS_ADDRESS",
		"REDIS_USERNAME",
		"REDIS_PASSWORD",
		"REDIS_DB",
	}

	env := make(map[string]string)
	for _, key := range requiredEnvVars {
		value := os.Getenv(key)
		if value == "" {
			log.Fatalf("Missing required environment variable: %s", key)
		}
		env[key] = value
	}

	db, err := strconv.Atoi(env["REDIS_DB"])
	if err != nil {
		log.Fatalf("Invalid REDIS_DB value: %v", err)
	}

	RedisClient = redis.NewClient(&redis.Options{
		Addr:     env["REDIS_ADDRESS"],
		Username: env["REDIS_USERNAME"],
		Password: env["REDIS_PASSWORD"],
		DB:       db,
	})

	if err := RedisClient.Set(ctx, "foo", "bar", 0).Err(); err != nil {
		log.Fatalf("Error setting key: %v", err)
	}
}

func RedisSet(key, value string, tim time.Duration) error {
	return RedisClient.Set(ctx, key, value, tim).Err()
}

func RedisGet(key string) (string, error) {
	return RedisClient.Get(ctx, key).Result()
}

func RedisDel(key string) (int64, error) {
	return RedisClient.Del(ctx, key).Result()
}
