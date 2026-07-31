"use client"

const newsArticles = [
  {
    id: 1,
    title: "NVIDIA Announces Next-Gen RTX 5090 with Revolutionary AI Capabilities",
    date: "Dec 1, 2025",
    category: "Hardware",
    excerpt: "The new flagship GPU brings unprecedented performance for gaming and AI workloads...",
    image: "/nvidia-rtx-5090-graphics-card.jpg",
    link: "https://www.techpowerup.com/gpu-specs/",
  },
  {
    id: 2,
    title: "AMD Radeon RX 7000 Series Drops in Price - Best Gaming Value Yet",
    date: "Nov 28, 2025",
    category: "News",
    excerpt: "AMD slashes prices on their latest generation graphics cards, making high-end gaming affordable...",
    image: "/amd-radeon-graphics-card.jpg",
    link: "https://www.amd.com/en/graphics/radeon",
  },
  {
    id: 3,
    title: "Intel Arc A-Series GPUs Show Strong Growth in Q4 2025",
    date: "Nov 25, 2025",
    category: "Market",
    excerpt: "Intel's discrete GPU division gains market share as new drivers improve performance...",
    image: "/intel-arc-gpu-graphics-card.jpg",
    link: "https://www.intel.com/content/www/us/en/products/details/discrete-gpus/arc.html",
  },
  {
    id: 4,
    title: "Gaming Performance Benchmarks: 2025 Graphics Card Showdown",
    date: "Nov 22, 2025",
    category: "Reviews",
    excerpt: "We tested the top graphics cards in the latest AAA titles to see which reigns supreme...",
    image: "/gaming-graphics-card-benchmark.jpg",
    link: "https://www.techpowerup.com/reviews/",
  },
  {
    id: 5,
    title: "VRAM Wars: Why 16GB Is Now the Standard for Gaming GPUs",
    date: "Nov 20, 2025",
    category: "Analysis",
    excerpt: "Manufacturers increase memory as games demand more bandwidth and texture quality...",
    image: "/graphics-card-memory-vram.jpg",
    link: "https://www.anandtech.com/",
  },
  {
    id: 6,
    title: "Ray Tracing Performance Leaps Forward in Latest Driver Updates",
    date: "Nov 18, 2025",
    category: "Technology",
    excerpt: "New DLSS 4 technology doubles frame rates in ray-traced games without quality loss...",
    image: "/ray-tracing-graphics-card-performance.jpg",
    link: "https://www.nvidia.com/en-us/geforce/",
  },
]

export default function NewsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsArticles.map((article) => (
        <a
          key={article.id}
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all bg-card hover:border-primary/50 cursor-pointer block"
        >
          {/* Image */}
          <div className="relative overflow-hidden bg-muted aspect-video">
            <img
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              loading="lazy"
              crossOrigin="anonymous"
            />
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
              {article.category}
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-3 flex flex-col h-full">
            <div className="flex-1">
              <p className="text-xs md:text-sm text-muted-foreground mb-2">{article.date}</p>
              <h3 className="font-bold text-base md:text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{article.excerpt}</p>
            </div>

            {/* Read More Link */}
            <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
              Read More <span>→</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}
