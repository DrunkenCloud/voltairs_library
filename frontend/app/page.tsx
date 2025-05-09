import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, ChevronRight, Star } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BookCard from "@/components/BookCard"
import ReadingListCard from "@/components/ReadingListCard"
import BlogCard from "@/components/BlogCard"


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Featured Books Section */}
        <section className="py-12">
          <div className="container px-4 mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Featured Books</h2>
              <Link href="/discover" className="text-emerald-600 flex items-center text-sm font-medium hover:underline">
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <Tabs defaultValue="trending" className="mb-8">
              <TabsList className="bg-gray-100">
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="new-releases">New Releases</TabsTrigger>
                <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
              </TabsList>
              <TabsContent value="trending" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {[1, 2, 3, 4, 5].map((book) => (
                    <BookCard key={book} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="new-releases" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {[1, 2, 3, 4, 5].map((book) => (
                    <BookCard key={book} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="top-rated" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {[1, 2, 3, 4, 5].map((book) => (
                    <BookCard key={book} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Reading Lists Section */}
        <section className="py-12 bg-gray-50">
          <div className="container px-4 mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Popular Reading Lists</h2>
              <Link
                href="/reading-lists"
                className="text-emerald-600 flex items-center text-sm font-medium hover:underline"
              >
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ReadingListCard title="Best Science Fiction of 2023" books={12} followers={1243} />
              <ReadingListCard title="Must-Read Classics" books={24} followers={3567} />
              <ReadingListCard title="Contemporary Literary Fiction" books={18} followers={982} />
            </div>
          </div>
        </section>

        {/* Community Activity */}
        <section className="py-12">
          <div className="container px-4 mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Community Activity</h2>
              <Link
                href="/community"
                className="text-emerald-600 flex items-center text-sm font-medium hover:underline"
              >
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border">
                <h3 className="font-medium text-lg mb-4">Recent Reviews</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="flex gap-4 pb-4 border-b last:border-0">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">Alex Johnson</span>
                          <span className="text-xs text-gray-500">reviewed</span>
                          <span className="font-medium text-sm">The Midnight Library</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">
                          "A beautiful exploration of the choices we make and the lives we could have lived..."
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border">
                <h3 className="font-medium text-lg mb-4">Reading Challenges</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((challenge) => (
                    <div key={challenge} className="flex gap-4 pb-4 border-b last:border-0">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-1">2023 Reading Challenge</h4>
                        <p className="text-sm text-gray-600 mb-2">Read 50 books in 2023</p>
                        <div className="flex items-center gap-2">
                          <div className="h-2 bg-gray-100 rounded-full w-full">
                            <div className="h-2 bg-emerald-500 rounded-full w-[65%]"></div>
                          </div>
                          <span className="text-xs font-medium">65%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* News & Blogs Section */}
        <section className="py-12 bg-gray-50">
          <div className="container px-4 mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">News & Blogs</h2>
              <Link href="/news" className="text-emerald-600 flex items-center text-sm font-medium hover:underline">
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BlogCard
                title="Interview with Bestselling Author Jane Smith"
                excerpt="We sat down with Jane Smith to discuss her latest novel and her writing process."
                date="May 15, 2023"
                category="Interviews"
              />
              <BlogCard
                title="10 Most Anticipated Books of Summer 2023"
                excerpt="Check out our list of the most exciting new releases coming this summer."
                date="May 10, 2023"
                category="Lists"
              />
              <BlogCard
                title="The Rise of Climate Fiction in Modern Literature"
                excerpt="How climate change is influencing a new generation of writers and storytellers."
                date="May 5, 2023"
                category="Trends"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
