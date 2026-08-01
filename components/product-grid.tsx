"use client"

const products = [
  {
    id: 1,
    name: "ASUS RTX 5090 ROG ASTRAL",
    price: "€3,299",
    rating: 4.9,
    reviews: 524,
    image: "/high-end-gaming-graphics-card-nvidia-rtx.jpg",
    badge: "Best Seller",
    link: "https://computerz.taoify.shop/goods/New-Asus-RTX5090-ROG-ASTRAL-Night-God-Applicable-to-Gaming-AI-Artificial-Intelligence-Graphics-Card-gtu7mp",
    category: "Graphics Cards",
  },
  {
    id: 2,
    name: "Gigabyte RTX 5080 WINDFORCE",
    price: "€1,499",
    rating: 4.7,
    reviews: 412,
    image: "/graphics-card-rtx-5080.jpg",
    badge: "Featured",
    link: "https://computerz.taoify.shop/goods/Suitable-for-Gigabyte-GeForce-RTX-5080-WINDFORCE-OC-SFF-16G-Wind-Magic-Gaming-Graphics-Card-vnz6km",
    category: "Graphics Cards",
  },
  {
    id: 3,
    name: "NVIDIA RTX 5070Ti Gaming Pro",
    price: "€899",
    rating: 4.6,
    reviews: 356,
    image: "/graphics-card-rtx-5070-gaming.jpg",
    badge: "Hot Deal",
    link: "https://computerz.taoify.shop/goods/Applicable-to-the-new-overseas-original-Tongde-RTX5070TiGamingPro16G-e-sports-game-graphics-card-GPU-computing-power-q9uco7",
    category: "Graphics Cards",
  },
  {
    id: 4,
    name: "Xikii FF07 Mini ITX Gaming PC R7 9800X3D",
    price: "€3,699",
    rating: 4.8,
    reviews: 289,
    image: "/xikii-ff07-mini-itx-gaming-pc.jpg",
    badge: "New",
    link: "https://computerz.taoify.shop/goods/Xikii-FF07-host-mini-ITX-gaming-computer-Ryzen-R7-9800X3D-ASUS-RTX5090D-Night-God-mxodmt",
    category: "Gaming PCs",
  },
  {
    id: 5,
    name: "Huawei Ascend Atlas 300i Pro AI",
    price: "€1,699",
    rating: 4.7,
    reviews: 156,
    image: "/huawei-atlas-300i-pro.jpg",
    badge: "AI",
    link: "https://computerz.taoify.shop/goods/Applicable-to-Huawei-Shengteng-Atlas-300i-Pro-domestic-big-model-ai-reasoning-card-server-graphics-card-96GB-co82ax",
    category: "AI Hardware",
  },
  {
    id: 6,
    name: "NVIDIA DGX Spark AI 128GB+4T",
    price: "€4,499",
    rating: 5.0,
    reviews: 98,
    image: "/nvidia-dgx-spark-desktop.png",
    badge: "Premium",
    link: "https://computerz.taoify.shop/goods/NVIDIA-DGX-Spark-desktop-level-personal-AI-computer-mini-supercomputer-graphics-card-128GB-4T-27jw2c",
    category: "AI Computers",
  },
]

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {products.map((product) => (
        <a
          key={product.id}
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`group rounded-xl overflow-hidden hover:shadow-lg transition-all bg-card block ${
            product.id === 1 ? "" : "border border-border hover:border-primary/50"
          }`}
        >
          {/* Image Container */}
          <div
            className={`relative overflow-hidden aspect-square ${
              product.id === 4 || product.id === 5 ? "bg-black" : "bg-muted"
            }`}
          >
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className={`w-full h-full group-hover:scale-105 transition-transform ${
                product.id === 4 || product.id === 5 ? "object-contain p-4" : "object-cover"
              }`}
              loading="lazy"
            />
            {product.badge && (
              <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                {product.badge}
              </div>
            )}
            <div className="absolute bottom-3 left-3 bg-black/70 text-green-400 px-2 py-1 rounded text-xs font-medium">
              {product.category}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-5 space-y-3 md:space-y-4">
            <h3 className="font-bold text-base md:text-lg text-foreground line-clamp-2">{product.name}</h3>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span>⭐</span>
                <span className="font-semibold text-foreground">{product.rating}</span>
              </div>
              <span className="text-xs md:text-sm text-muted-foreground">({product.reviews})</span>
            </div>

            {/* Price and Button */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-xl md:text-2xl font-bold text-primary">{product.price}</span>
              <button className="bg-primary text-primary-foreground p-2 md:p-2.5 rounded-lg hover:opacity-90 transition-opacity">
                🛒
              </button>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}
