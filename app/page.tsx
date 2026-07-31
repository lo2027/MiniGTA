"use client"

import { useState } from "react"
import { MatrixBackground } from "@/components/matrix-background"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ProductGrid from "@/components/product-grid"
import NewsSection from "@/components/news-section"
import NewsletterSection from "@/components/newsletter-section"
import Footer from "@/components/footer"
import { Hal9000Assistant } from "@/components/hal-9000-assistant"

export default function Home() {
  const [activeTab, setActiveTab] = useState("products")

  return (
    <main className="min-h-screen bg-background relative">
      <MatrixBackground />

      <div className="relative z-10 opacity-50">
        <Header />
        <HeroSection />

        {/* Main Content Tabs */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="flex gap-4 mb-8 border-b border-border">
            <button
              onClick={() => setActiveTab("products")}
              className={`px-4 py-3 font-semibold transition-colors ${
                activeTab === "products"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Graphics Cards
            </button>
            <button
              onClick={() => setActiveTab("news")}
              className={`px-4 py-3 font-semibold transition-colors ${
                activeTab === "news"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Latest News
            </button>
          </div>

          {activeTab === "products" && <ProductGrid />}
          {activeTab === "news" && <NewsSection />}
        </section>

        <NewsletterSection />
        <Footer />
      </div>

      <Hal9000Assistant />
    </main>
  )
}
