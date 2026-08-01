"use client"

import EarthGlobe from "./earth-globe"

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-secondary via-secondary to-secondary/80 text-secondary-foreground py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-balance">
                Ultimate Graphics Cards & Hardware
              </h2>
              <p className="text-lg md:text-xl text-secondary-foreground/90 leading-relaxed">
                Discover the latest GPUs, CPUs, and gaming hardware with expert reviews and competitive pricing.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-8 border-t border-secondary-foreground/20">
              <div>
                <p className="text-2xl md:text-3xl font-bold">10K+</p>
                <p className="text-sm md:text-base text-secondary-foreground/80">Products</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold">50K+</p>
                <p className="text-sm md:text-base text-secondary-foreground/80">Customers</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold">24/7</p>
                <p className="text-sm md:text-base text-secondary-foreground/80">Support</p>
              </div>
            </div>
          </div>

          {/* Right Image Placeholder */}
          <div className="hidden md:flex items-center justify-center">
            <EarthGlobe />
          </div>
        </div>
      </div>
    </section>
  )
}
