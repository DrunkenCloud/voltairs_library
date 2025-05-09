"use client"

import Link from "next/link"
import { Star } from "lucide-react"

const BookCard = () => {
  return (
    <Link href="/book/1" className="group">
      <div className="aspect-[2/3] bg-gray-100 rounded-lg overflow-hidden mb-3 group-hover:shadow-md transition-shadow">
        <img src="/placeholder.svg?height=300&width=200" alt="Book cover" className="w-full h-full object-cover" />
      </div>
      <h3 className="font-medium text-sm line-clamp-1 group-hover:text-emerald-600 transition-colors">
        The Midnight Library
      </h3>
      <p className="text-xs text-gray-500">Matt Haig</p>
      <div className="flex items-center gap-1 mt-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className="w-3 h-3 fill-amber-400 text-amber-400" />
        ))}
        <span className="text-xs text-gray-500 ml-1">4.2</span>
      </div>
    </Link>
  )
}

export default BookCard
