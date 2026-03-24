import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-lg font-bold text-primary mb-3">{siteConfig.name}</h3>
            <p className="text-sm text-base-content/70 max-w-xs">{siteConfig.description}</p>
          </div>
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="text-base-content/70 hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/about" className="text-base-content/70 hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-base-content/70 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-base-content/70">
              <li>{siteConfig.phone}</li>
              <li>{siteConfig.email}</li>
              <li>{siteConfig.location.city}, {siteConfig.location.province}</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-base-300 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-base-content/50">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
