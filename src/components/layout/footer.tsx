import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="w-full bg-secondary text-secondary-foreground">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 px-4 py-12 md:px-6">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm text-muted-foreground">
            Connecting communities, one click at a time.
          </p>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-5 w-5 hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5 hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4 font-headline">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
            <li><Link href="/news" className="text-muted-foreground hover:text-primary">News</Link></li>
            <li><Link href="/gallery" className="text-muted-foreground hover:text-primary">Gallery</Link></li>
            <li><Link href="/services" className="text-muted-foreground hover:text-primary">Services</Link></li>
            <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 font-headline">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/resources" className="text-muted-foreground hover:text-primary">Announcements</Link></li>
            <li><Link href="/resources" className="text-muted-foreground hover:text-primary">Schemes</Link></li>
            <li><Link href="/resources" className="text-muted-foreground hover:text-primary">Press Releases</Link></li>
            <li><Link href="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
          </ul>
        </div>
        <div>
           <h4 className="font-semibold mb-4 font-headline">Admin</h4>
            <ul className="space-y-2 text-sm">
                <li>
                    <Button variant="link" asChild className="p-0 h-auto text-muted-foreground hover:text-primary">
                        <Link href="/admin">Admin Dashboard</Link>
                    </Button>
                </li>
            </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container flex flex-col md:flex-row justify-between items-center py-4 px-4 md:px-6 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Digital Connect. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
