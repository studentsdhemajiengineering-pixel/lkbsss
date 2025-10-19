"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";
import { Logo } from "@/components/logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/gallery", label: "Gallery" },
  { href: "/resources", label: "Resources" },
];

export default function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-foreground/80",
        pathname === href ? "text-foreground" : "text-foreground/60"
      )}
      prefetch={false}
    >
      {label}
    </Link>
  );
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        <div className="flex items-center md:hidden">
            <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-6 text-lg font-medium mt-8">
                    <Logo />
                    {navLinks.map((link) => (
                        <NavLink key={link.href} {...link} />
                    ))}
                </nav>
            </SheetContent>
            </Sheet>
            <div className="ml-4 md:hidden">
              <Logo />
            </div>
        </div>

        <nav className="ml-6 hidden items-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <LanguageSwitcher />
          <Button asChild className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-light))] text-primary-foreground hover:opacity-90 transition-opacity">
            <Link href="/login">
              <User className="mr-2 h-4 w-4" /> Login
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
