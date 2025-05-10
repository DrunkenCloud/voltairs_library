"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { backendUrl, parseJWT } from "@/lib/utils"

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
          const payload = parseJWT(token)
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
