"use client"

import Link from "next/link"

type BlogCardProps = {
  title: string
  excerpt: string
  date: string
  category: string
}

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, date, category }) => {
  return (
    <div className="bg-white p-6 rounded-xl border hover:shadow-md transition-shadow">
      <div className="text-xs font-medium text-emerald-600 mb-2">{category}</div>
      <h3 className="font-medium text-lg mb-3 line-clamp-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{excerpt}</p>
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">{date}</div>
        <Link href="#" className="text-emerald-600 text-sm font-medium hover:underline">
          Read more
        </Link>
      </div>
    </div>
  )
}

export default BlogCard
