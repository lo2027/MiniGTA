"use client"

import { useState } from "react"
import Image from "next/image"
import HackConsole from "./hack-console"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image
              src="/computerz-logo.png"
              alt="Computerz Gamers Logo"
              width={280}
              height={70}
              className="h-12 md:h-16 w-auto max-w-[180px] md:max-w-[250px]"
              priority
            />
          </a>
          <HackConsole />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center text-foreground">
          <a href="#" className="hover:text-primary transition-colors">
            Shop
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            News
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            About
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Contact
          </a>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
            <span>🛒</span>
            <span>Cart</span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors text-2xl"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-4 space-y-3">
          <a href="#" className="block py-2 text-foreground hover:text-primary">
            Shop
          </a>
          <a href="#" className="block py-2 text-foreground hover:text-primary">
            News
          </a>
          <a href="#" className="block py-2 text-foreground hover:text-primary">
            About
          </a>
          <a href="#" className="block py-2 text-foreground hover:text-primary">
            Contact
          </a>
          <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <span>🛒</span>
            <span>Cart</span>
          </button>
        </div>
      )}
    </header>
  )
}
