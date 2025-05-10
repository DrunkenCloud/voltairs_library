"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, ChevronDown, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SearchDialog from "./search-dialog"
import { useUser } from "@/components/user-context"


export default function Navbar() {
  const { isLoggedIn, username, loading, setIsLoggedIn, setUsername } = useUser()

  function handleLogout() {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setUsername("")
  }  

  if (loading) return null

  return (
    <header className="border-b">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <BookOpen className="w-6 h-6 text-emerald-600" />
            <span>Bookshelf</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm font-medium hover:text-emerald-600 transition-colors">
                Discover <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/choice-awards" className="w-full">
                    Choice Awards
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/new-releases" className="w-full">
                    New Releases
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/giveaway" className="w-full">
                    Giveaway
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/news-interviews" className="w-full">
                    News & Interviews
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm font-medium hover:text-emerald-600 transition-colors">
                Browse <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/recommendations" className="w-full">
                    Recommendations
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/reviews" className="w-full">
                    Reviews
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/lists" className="w-full">
                    Lists
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/authors" className="w-full">
                    Authors
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/my-books" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              My Books
            </Link>
            <Link href="/community" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Community
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search books, authors..."
              className="pl-10 w-[300px] rounded-full bg-gray-50 border-gray-200 focus-visible:ring-emerald-500"
            />
          </div>

          <SearchDialog />

          {isLoggedIn ? (
            <>
              <Link href="/">
                <Button onClick={handleLogout} variant="ghost" size="sm" className="hidden md:inline-flex">
                  Sign Out
                </Button>
              </Link>
              <Link href={`/user/${username}`}>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 hidden md:inline-flex">
                  My Profile
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="hidden md:inline-flex">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 hidden md:inline-flex">
                  Join Now
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
