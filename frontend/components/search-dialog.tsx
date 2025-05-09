import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function SearchDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-10 px-0 md:hidden">
          <Search className="h-4 w-4" />
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
  )
}
