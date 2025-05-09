"use client"

import Link from "next/link"
import { BookOpen, Search, Compass, BookmarkIcon, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function MobileNav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50 md:hidden">
      <div className="flex items-center justify-around h-16">
        <Link
          href="/discover"
          className="flex flex-col items-center justify-center text-gray-500 hover:text-emerald-600"
        >
          <Compass className="w-5 h-5" />
          <span className="text-xs mt-1">Discover</span>
        </Link>
        <Link href="/browse" className="flex flex-col items-center justify-center text-gray-500 hover:text-emerald-600">
          <BookOpen className="w-5 h-5" />
          <span className="text-xs mt-1">Browse</span>
        </Link>
        <Link
          href="/my-books"
          className="flex flex-col items-center justify-center text-gray-500 hover:text-emerald-600"
        >
          <BookmarkIcon className="w-5 h-5" />
          <span className="text-xs mt-1">My Books</span>
        </Link>
        <Link
          href="/community"
          className="flex flex-col items-center justify-center text-gray-500 hover:text-emerald-600"
        >
          <Users className="w-5 h-5" />
          <span className="text-xs mt-1">Community</span>
        </Link>
        <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="flex flex-col items-center justify-center text-gray-500 hover:text-emerald-600 h-auto p-0"
            >
              <Search className="w-5 h-5" />
              <span className="text-xs mt-1">Search</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Search</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2 mt-4">
              <div className="grid flex-1 gap-2">
                <Input placeholder="Search books, authors, genres..." className="w-full" autoFocus />
              </div>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Popular Searches</h4>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  Fantasy
                </Button>
                <Button variant="outline" size="sm">
                  Stephen King
                </Button>
                <Button variant="outline" size="sm">
                  New Releases
                </Button>
                <Button variant="outline" size="sm">
                  Book Clubs
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
