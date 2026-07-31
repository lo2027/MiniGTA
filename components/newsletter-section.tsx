"use client"

import type React from "react"
import { useState } from "react"
import { subscribeToNewsletter } from "@/app/actions/newsletter"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setMessage("")

    const result = await subscribeToNewsletter(email)

    setLoading(false)
    setSubscribed(result.success)
    setMessage(result.message)

    if (result.success) {
      setEmail("")
      setTimeout(() => {
        setSubscribed(false)
        setMessage("")
      }, 5000)
    }
  }

  return (
    <section className="bg-black text-green-400 py-12 md:py-16">
      <div className="max-w-2xl mx-auto px-4 md:px-6 text-center space-y-6">
        {/* Header */}
        <div className="space-y-2 md:space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">Stay Updated on Latest Tech News</h2>
          <p className="text-lg md:text-xl text-green-400/90">
            Subscribe to our newsletter for exclusive deals, reviews, and breaking hardware announcements.
          </p>
        </div>

        {/* Subscription Form */}
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400/60 text-xl">✉</span>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full bg-green-400/10 border border-green-400/30 rounded-lg pl-12 pr-4 py-3 text-green-400 placeholder:text-green-400/60 focus:outline-none focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 transition-all disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-400 text-black px-6 md:px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-50"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {message && (
          <div
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg max-w-md mx-auto ${
              subscribed ? "text-green-400 bg-green-400/20" : "text-red-400 bg-red-400/20"
            }`}
          >
            <span className="text-xl">{subscribed ? "✓" : "⚠"}</span>
            <span className="font-semibold">{message}</span>
          </div>
        )}

        {/* PayPal Logo */}
        <div className="pt-4 border-t border-green-400/20">
          <p className="text-sm text-green-400/80 mb-3">We Accept</p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="text-green-400 font-bold text-xl">PAYPAL</div>
            <span className="text-green-400/60">•</span>
            <div className="text-green-400 font-bold text-xl">CREDIT CARD</div>
            <span className="text-green-400/60">•</span>
            <div className="text-green-400 font-bold text-xl">DEBIT</div>
          </div>
        </div>
      </div>
    </section>
  )
}
