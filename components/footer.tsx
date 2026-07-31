export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">C</span>
              </div>
              <h3 className="font-bold text-lg">Computerz.org</h3>
            </div>
            <p className="text-sm text-secondary-foreground/70">
              Your ultimate destination for computer hardware, news, and reviews.
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-bold text-secondary-foreground">Shop</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li>
                <a href="#" className="hover:text-secondary-foreground transition-colors">
                  Graphics Cards
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-foreground transition-colors">
                  CPUs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-foreground transition-colors">
                  Motherboards
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-foreground transition-colors">
                  Memory & Storage
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h4 className="font-bold text-secondary-foreground">Info</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li>
                <a href="#" className="hover:text-secondary-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-foreground transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-foreground transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-foreground transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-bold text-secondary-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li>
                <a href="#" className="hover:text-secondary-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-foreground transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-foreground transition-colors">
                  Returns
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-secondary-foreground/60">© 2025 Computerz.org. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-secondary-foreground/60">
            <a href="#" className="hover:text-secondary-foreground transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-secondary-foreground transition-colors">
              Discord
            </a>
            <a href="#" className="hover:text-secondary-foreground transition-colors">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
