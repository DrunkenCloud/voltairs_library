import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import MobileNav from "@/components/mobile-nav"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <MobileNav />
          <div className="pb-16 md:pb-0" />
        </ThemeProvider>
      </body>
    </html>
  )
}
