"use client"

import { useState } from "react"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { backendUrl } from "@/lib/utils"

export default function EditProfileClient({ currUsername }: { currUsername: string }) {
  const [bio, setBio] = useState("")
  const [photo, setPhoto] = useState("")
  const [message, setMessage] = useState("")

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

  return (
    <div>
        <Navbar />
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
        <button onClick={handleUpdate} className="bg-emerald-600 text-white px-4 py-2 rounded">
            Save Changes
        </button>
        {message && <p className="mt-2 text-sm">{message}</p>}
        </div>
        <Footer />
    </div>
  )
}
