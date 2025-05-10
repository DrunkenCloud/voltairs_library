import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import MobileNav from "@/components/mobile-nav"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { UserProvider } from "@/components/user-context"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <UserProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <Navbar />
            {children}
            <MobileNav />
            <Footer />
            <div className="pb-16 md:pb-0" />
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  )
}
