"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { backendUrl } from "@/lib/utils"
import { useRouter } from 'next/navigation';

export default function SignUpPage() {

  const router = useRouter();
  const [message, setMessage] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const username = (document.getElementById("username") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const code = (document.getElementById("code") as HTMLInputElement).value;

    if (!username || !email || !password || !code) {
      setMessage("All fields including verification code are required.");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/signup`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email, code }),
      });

      if (response.ok) {
        router.push('/login');
      } else {
        const text = await response.text();
        setMessage(`${text}`);
      }
    } catch (e) {
      setMessage("Network error: could not connect to server.");
      console.error("Signup error:", e);
    }
  }

  const handleSendCode = async () => {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    if (!email) {
      setMessage("Please enter your email first.");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/send-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email }),
      });

      const text = await response.text();
      if (response.ok) {
        setCodeSent(true);
        setMessage("Verification code sent to email.");
      } else {
        setMessage(`Failed to send code: ${text}`);
      }
    } catch (err) {
      setMessage("Network error.");
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border">
          <h2 className="text-2xl font-bold mb-6 text-center">Create your account</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Your Username"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="flex gap-2">
                <input
                  id="email"
                  type="email"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="you@example.com"
                />
                <Button type="button" onClick={handleSendCode} className="whitespace-nowrap">
                  Get Code
                </Button>
              </div>
            </div>

            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                Verification Code
              </label>
              <input
                id="code"
                type="text"
                maxLength={6}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="6-digit code"
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
              />
            </div>

            <Button type="submit" className="w-full" onClick={handleSignUpSubmit}>
              Sign Up
            </Button>
            {message && <p className="text-sm text-red-500">{message}</p>}
          </form>

          <p className="text-sm text-gray-600 text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-600 font-medium hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
