import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Bookmark, BookOpen, ChevronDown, Heart, MessageSquare, Share2, Star, User } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function BookPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="container px-4 py-8 mx-auto">
        <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-emerald-600 mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Browse
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="aspect-[2/3] bg-gray-100 rounded-lg overflow-hidden mb-4 max-w-[300px] mx-auto md:mx-0">
              <img
                src="/placeholder.svg?height=450&width=300"
                alt="Book cover"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-3 max-w-[300px] mx-auto md:mx-0">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <BookOpen className="w-4 h-4 mr-2" /> Start Reading
              </Button>
              <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                <Bookmark className="w-4 h-4 mr-2" /> Add to Library
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="flex-1">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="flex-1">
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="flex-1">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-sm text-emerald-600 mb-2">
              <Link href="#" className="hover:underline">
                Fiction
              </Link>
              <span>•</span>
              <Link href="#" className="hover:underline">
                Contemporary
              </Link>
              <span>•</span>
              <Link href="#" className="hover:underline">
                Literary Fiction
              </Link>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">The Midnight Library</h1>
            <p className="text-lg text-gray-600 mb-4">
              by{" "}
              <Link href="#" className="text-emerald-600 hover:underline">
                Matt Haig
              </Link>
            </p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="ml-2 text-lg font-medium">4.2</span>
                <span className="ml-1 text-sm text-gray-500">(2,341 ratings)</span>
              </div>
              <div className="text-sm text-gray-500">
                Published: <span className="text-gray-700">August 13, 2020</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-8">
              <h2 className="font-medium mb-2">Synopsis</h2>
              <p className="text-gray-700 mb-3">
                Between life and death there is a library, and within that library, the shelves go on forever. Every
                book provides a chance to try another life you could have lived. To see how things would be if you had
                made other choices...
              </p>
              <p className="text-gray-700 mb-3">
                Somewhere out beyond the edge of the universe there is a library that contains an infinite number of
                books, each one the story of another reality. One tells the story of your life as it is, along with
                another book for the other life you could have lived if you had made a different choice at any point in
                your life.
              </p>
              <Button variant="ghost" size="sm" className="text-emerald-600">
                Read More <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="mb-8">
              <h2 className="font-medium mb-4">Book Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Pages</div>
                  <div className="font-medium">304</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Language</div>
                  <div className="font-medium">English</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Publisher</div>
                  <div className="font-medium">Viking</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">ISBN</div>
                  <div className="font-medium">9780525559474</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Format</div>
                  <div className="font-medium">Hardcover, eBook, Audio</div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="reviews">
              <TabsList className="bg-gray-100 w-full justify-start">
                <TabsTrigger value="reviews" className="flex-1 md:flex-none">
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="quotes" className="flex-1 md:flex-none">
                  Quotes
                </TabsTrigger>
                <TabsTrigger value="similar" className="flex-1 md:flex-none">
                  Similar Books
                </TabsTrigger>
              </TabsList>
              <TabsContent value="reviews" className="mt-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-medium">Reader Reviews</h3>
                  <Button variant="outline" size="sm">
                    Write a Review
                  </Button>
                </div>
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="pb-6 border-b last:border-0">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">Alex Johnson</span>
                            <span className="text-xs text-gray-500">March 15, 2023</span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <h4 className="font-medium mb-2">A beautiful exploration of choices and regrets</h4>
                          <p className="text-gray-700">
                            This book really made me think about the choices we make and the lives we could have lived.
                            The concept of the library between life and death is fascinating, and Matt Haig's writing is
                            both accessible and profound. I found myself reflecting on my own life choices long after
                            finishing the book.
                          </p>
                          <div className="flex items-center gap-4 mt-3">
                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-emerald-600">
                              Helpful (24)
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-emerald-600">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Load More Reviews
                </Button>
              </TabsContent>
              <TabsContent value="quotes" className="mt-6">
                <div className="space-y-6">
                  {[1, 2, 3, 4].map((quote) => (
                    <div key={quote} className="bg-gray-50 p-4 rounded-lg border-l-4 border-emerald-500">
                      <p className="text-gray-700 italic mb-2">"The only way to learn is to live."</p>
                      <div className="text-right text-sm text-gray-500">Page 42 • Liked by 156 readers</div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Load More Quotes
                </Button>
              </TabsContent>
              <TabsContent value="similar" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((book) => (
                    <Link href="#" key={book} className="group">
                      <div className="aspect-[2/3] bg-gray-100 rounded-lg overflow-hidden mb-3 group-hover:shadow-md transition-shadow">
                        <img
                          src="/placeholder.svg?height=300&width=200"
                          alt="Book cover"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium text-sm line-clamp-1 group-hover:text-emerald-600 transition-colors">
                        The Invisible Life of Addie LaRue
                      </h3>
                      <p className="text-xs text-gray-500">V.E. Schwab</p>
                    </Link>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
