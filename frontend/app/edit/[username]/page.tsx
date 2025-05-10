"use client"

import { useEffect, useState } from "react"
import { use } from "react"
import { backendUrl, parseJWT } from "@/lib/utils"

export default function EditProfileClient({ params }: { params: Promise<{ username: string }> }) {
  const currUsername = use(params).username
  const [bio, setBio] = useState("")
  const [photo, setPhoto] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        setMessage("You are not logged in.")
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`${backendUrl}/verify-user`, {
          method: "GET",
          headers: {
            "Authorization": token
          },
        })

        if (!response.ok && parseJWT(token) == currUsername) {
          const text = await response.text()
          setMessage("Unauthorized: " + text)
        }
      } catch (error) {
        console.error("Verification failed:", error)
        setMessage("Failed to verify user.")
      } finally {
        setLoading(false)
      }
    }

    verifyUser()
  }, [currUsername])

  const handleUpdate = async () => {
    const token = localStorage.getItem("token")
    if (!token) return

    const response = await fetch(`${backendUrl}/update-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify({
        username: currUsername,
        bio,
        photo,
      }),
    })

    if (response.ok) {
      setMessage("Profile updated successfully!")
    } else {
      const text = await response.text()
      setMessage("Error: " + text)
    }
  }

  if (loading) {
    return <p className="text-center mt-10">Verifying...</p>
  }

  if (message.startsWith("Unauthorized") || message.startsWith("Failed") || message === "You are not logged in.") {
    return <p className="text-center mt-10 text-red-600">{message}</p>
  }

  return (
    <div>
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <input
          type="text"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          placeholder="Profile Photo URL"
          className="w-full p-2 border mb-2 rounded"
        />
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Your bio"
          className="w-full p-2 border mb-2 rounded"
        />
        <button
          onClick={handleUpdate}
          className="bg-emerald-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
        {message && <p className="mt-2 text-sm">{message}</p>}
      </div>
    </div>
  )
}
