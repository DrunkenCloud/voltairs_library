"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { backendUrl } from "@/lib/utils"

type UserContextType = {
  isLoggedIn: boolean
  username: string
  setIsLoggedIn: (val: boolean) => void
  setUsername: (val: string) => void
  loading: boolean
}

const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  username: "",
  setIsLoggedIn: () => {},
  setUsername: () => {},
  loading: false
})

function parseJwt(token: string): { username?: string } {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (err) {
    return {}
  }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        setLoading(false) 
        return
      }

      try {
        const res = await fetch(`${backendUrl}/verify-user`, {
          method: "GET",
          headers: {
            "Authorization": token,
          },
        })

        if (res.ok) {
          const payload = parseJwt(token)
          if (payload?.username) {
            setUsername(payload.username)
            setIsLoggedIn(true)
          }
        } else {
          console.warn("Token verification failed.")
          setIsLoggedIn(false)
        }
        setLoading(false)
      } catch (err) {
        console.error("Verification error:", err)
        setIsLoggedIn(false)
        setLoading(false)
      }
    }

    verifyToken()
  }, [])

  return (
    <UserContext.Provider value={{ isLoggedIn, username, setIsLoggedIn, setUsername, loading }}>
      {children}
    </UserContext.Provider>
  )
}


export const useUser = () => useContext(UserContext)
