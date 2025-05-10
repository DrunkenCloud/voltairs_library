"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { backendUrl } from "@/lib/utils";
import { useRouter } from "next/navigation"
import { useUser } from "@/components/user-context"

export default function LoginPage() {

  const router = useRouter();
  const [username, setInputUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setIsLoggedIn, setUsername } = useUser()
  
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backendUrl}/login` ,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        setUsername(username);
        router.push(`/user/${username}`);
      } else if (response.status == 401) {
        setMessage("Invalid username or password.");
      } else if (response.status == 400) {
        setMessage(`Missing username or password.`);
      } else {
        const text = response.text();
        setMessage(`Login Failed: ${text}`);
      }
    } catch (e) {
      setMessage("Network error: could not connect to server.");
      console.error("Login error:", e);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border">
          <h2 className="text-2xl font-bold mb-6 text-center">Log in to your account</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="reader123"
                onChange={(e) => setInputUsername(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full" onClick={handleLoginSubmit}>
              Log In
            </Button>
            {message && <p className="text-sm text-red-500">{message}</p>}
          </form>

          <p className="text-sm text-gray-600 text-center mt-6">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-emerald-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
