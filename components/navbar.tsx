"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navItems = [
  { name: "HOME", href: "/" },
  //{ name: "ABOUT", href: "/about" },
  { name: "MONEY", href: "/money" },
  //{ name: "MACHINERIES", href: "/machineries" },
  //{ name: "MARKET", href: "/market" },
  { name: "MENTOR", href: "/mentor" },
  { name: "MORE", href: "/more" },
  //{ name: "GALLERY", href: "/gallery" },
  { name: "OUR STARTUPS", href: "/startups" },
  //{ name: "CONTACT", href: "/contact" },
  { name: "IN-CUBATE", href: "/incubate" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 animate-slide-up h-20">
      <div className="absolute inset-0 bg-white/85 backdrop-blur-md rounded-b-3xl shadow-2xl shadow-[#af363c]/20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#af363c]/10 via-transparent to-[#8b2635]/10 rounded-b-3xl"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#af363c]/70 to-transparent"></div>
      <div className="relative container mx-auto px-6 h-full flex items-center justify-between rounded-b-3xl">
        <Link href="/" className="flex items-center animate-slide-in-left group">
          <Image
            src="/citbif-new-logo.png"
            alt="CITIL Logo"
            width={400}
            height={400}
            className="transition-all duration-300 group-hover:scale-105 filter brightness-100"
            style={{ width: 'auto', height: '120px' }}
            priority
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=60&width=200"
            }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 animate-slide-in-right">
          {navItems.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold transition-all duration-300 hover:scale-105 relative group px-4 py-2.5 rounded-xl stagger-${index + 1} ${
                item.name === "IN-CUBATE"
                  ? "bg-gradient-to-r from-[#af363c] to-[#8b2635] text-white shadow-lg shadow-[#af363c]/30 hover:shadow-xl hover:shadow-[#af363c]/40 font-bold"
                  : pathname === item.href
                    ? "text-[#af363c] font-bold"
                    : "text-slate-800 hover:text-[#af363c] font-medium"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.name}
              {item.name !== "IN-CUBATE" && (
                <span
                  className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-[#af363c] to-[#8b2635] transition-all duration-300 rounded-full ${
                    pathname === item.href ? "w-3/4" : "w-0 group-hover:w-3/4"
                  }`}
                ></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-slate-700 hover:text-[#af363c] transition-all duration-300 hover:scale-110"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-md animate-slide-down shadow-2xl rounded-b-3xl border-t border-[#af363c]/10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#af363c]/3 to-transparent rounded-b-3xl"></div>
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block text-sm font-semibold transition-all duration-300 hover:scale-105 py-3 px-5 rounded-xl ${
                  item.name === "IN-CUBATE"
                    ? "bg-gradient-to-r from-[#af363c] to-[#8b2635] text-white font-bold shadow-lg shadow-[#af363c]/30"
                    : pathname === item.href
                      ? "text-[#af363c]"
                      : "text-slate-700 hover:text-[#af363c]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
