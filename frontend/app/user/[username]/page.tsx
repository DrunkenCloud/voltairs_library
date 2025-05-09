import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, ChevronDown, Filter, List, Search, Star, LayoutGrid } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function MyBooksPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="container px-4 py-8 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Books</h1>
            <p className="text-gray-600">Keep track of your reading journey</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <BookOpen className="w-4 h-4 mr-2" /> Add Book
          </Button>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="all">All Books</TabsTrigger>
              <TabsTrigger value="reading">Currently Reading</TabsTrigger>
              <TabsTrigger value="read">Read</TabsTrigger>
              <TabsTrigger value="want">Want to Read</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search your books..."
                  className="pl-10 w-full md:w-[250px] rounded-lg bg-gray-50 border-gray-200"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="bg-white rounded-lg border">
              {[1, 2, 3, 4, 5].map((book) => (
                <div key={book} className="flex items-start gap-4 p-4 border-b last:border-0">
                  <div className="w-16 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <img
                      src="/placeholder.svg?height=96&width=64"
                      alt="Book cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                      <h3 className="font-medium">The Midnight Library</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-xs font-medium">
                          Currently Reading
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Matt Haig</p>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="ml-1 text-xs text-gray-500">Your rating</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Last read: <span className="text-gray-700">Yesterday</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-gray-500">Progress: 65% (Page 198 of 304)</div>
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                        <div className="h-1.5 bg-emerald-500 rounded-full w-[65%]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Button variant="ghost" size="sm">
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <Button variant="outline">Load More Books</Button>
            </div>
          </TabsContent>

          <TabsContent value="reading" className="mt-0">
            <div className="bg-white rounded-lg border">
              {[1, 2, 3].map((book) => (
                <div key={book} className="flex items-start gap-4 p-4 border-b last:border-0">
                  <div className="w-16 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <img
                      src="/placeholder.svg?height=96&width=64"
                      alt="Book cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                      <h3 className="font-medium">The Midnight Library</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-xs font-medium">
                          Currently Reading
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Matt Haig</p>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="ml-1 text-xs text-gray-500">Your rating</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Last read: <span className="text-gray-700">Yesterday</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-gray-500">Progress: 65% (Page 198 of 304)</div>
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                        <div className="h-1.5 bg-emerald-500 rounded-full w-[65%]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Button variant="ghost" size="sm">
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="read" className="mt-0">
            <div className="bg-white rounded-lg border">
              {[1, 2].map((book) => (
                <div key={book} className="flex items-start gap-4 p-4 border-b last:border-0">
                  <div className="w-16 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <img
                      src="/placeholder.svg?height=96&width=64"
                      alt="Book cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                      <h3 className="font-medium">Project Hail Mary</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">
                          Completed
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Andy Weir</p>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="ml-1 text-xs text-gray-500">Your rating</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Finished: <span className="text-gray-700">March 15, 2023</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Button variant="ghost" size="sm">
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="want" className="mt-0">
            <div className="bg-white rounded-lg border">
              {[1, 2, 3].map((book) => (
                <div key={book} className="flex items-start gap-4 p-4 border-b last:border-0">
                  <div className="w-16 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <img
                      src="/placeholder.svg?height=96&width=64"
                      alt="Book cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                      <h3 className="font-medium">Tomorrow, and Tomorrow, and Tomorrow</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs font-medium">
                          Want to Read
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Gabrielle Zevin</p>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="text-xs text-gray-500">
                        Added: <span className="text-gray-700">April 2, 2023</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Button variant="ghost" size="sm">
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-emerald-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Reading Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Books Read This Year</h3>
              <div className="text-3xl font-bold text-emerald-600">12</div>
              <div className="text-xs text-gray-500 mt-1">+3 from last year</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Reading Goal Progress</h3>
              <div className="text-3xl font-bold text-emerald-600">48%</div>
              <div className="h-2 bg-gray-100 rounded-full w-full mt-2">
                <div className="h-2 bg-emerald-500 rounded-full w-[48%]"></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">12/25 books</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Average Rating</h3>
              <div className="flex items-center">
                <div className="text-3xl font-bold text-emerald-600 mr-2">4.2</div>
                <div className="flex">
                  {[1, 2, 3, 4].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <Star className="w-4 h-4 fill-amber-400/50 text-amber-400" />
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Based on 25 books</div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Reading Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-medium text-lg mb-3">2023 Reading Challenge</h3>
              <p className="text-gray-600 mb-4">Read 25 books in 2023</p>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-emerald-500 rounded-full w-[48%]"></div>
                </div>
                <span className="text-sm font-medium">48%</span>
              </div>
              <div className="text-sm text-gray-500 mb-4">12 of 25 books completed</div>
              <Button variant="outline" className="w-full">
                View Challenge
              </Button>
            </div>
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-medium text-lg mb-3">Genre Explorer Challenge</h3>
              <p className="text-gray-600 mb-4">Read books from 10 different genres</p>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-emerald-500 rounded-full w-[60%]"></div>
                </div>
                <span className="text-sm font-medium">60%</span>
              </div>
              <div className="text-sm text-gray-500 mb-4">6 of 10 genres explored</div>
              <Button variant="outline" className="w-full">
                View Challenge
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
