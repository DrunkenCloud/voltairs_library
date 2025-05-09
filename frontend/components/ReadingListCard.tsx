"use client"

import { Button } from "@/components/ui/button"

type ReadingListCardProps = {
  title: string
  books: number
  followers: number
}

const ReadingListCard: React.FC<ReadingListCardProps> = ({ title, books, followers }) => {
  return (
    <div className="bg-white p-6 rounded-xl border hover:shadow-md transition-shadow">
      <h3 className="font-medium text-lg mb-3">{title}</h3>
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4].map((book) => (
          <div key={book} className="w-12 h-16 bg-gray-100 rounded overflow-hidden">
            <img src="/placeholder.svg?height=64&width=48" alt="Book cover" className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="w-12 h-16 bg-emerald-50 rounded flex items-center justify-center text-emerald-600 text-xs font-medium">
          +{books - 4}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">{books} books</div>
        <div className="text-sm text-gray-500">{followers.toLocaleString()} followers</div>
      </div>
      <Button variant="outline" className="w-full mt-4 border-emerald-600 text-emerald-600 hover:bg-emerald-50">
        Follow List
      </Button>
    </div>
  )
}

export default ReadingListCard
