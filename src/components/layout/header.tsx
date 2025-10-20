
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, ChevronDown, BookOpenCheck, CalendarCheck, FileWarning, HeartPulse, Mail, Home, Globe, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { useUser } from "@/firebase/provider";
import { getAuth, signOut } from "firebase/auth";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/resources", label: "Resources" },
];

const services = [
  { href: "/services/appointment-booking", label: "Appointment Booking", icon: CalendarCheck},
  { href: "/services/grievance-system", label: "Grievance Redressal", icon: FileWarning},
  { href: "/services/health-support", label: "Health Support", icon: HeartPulse},
  { href: "/services/education-support", label: "Education Support", icon: BookOpenCheck},
  { href: "/services/invitation-request", label: "Invitation Request", icon: Mail },
  { href: "/services/real-estate-consultancy", label: "Real Estate Consultancy", icon: Home },
];

const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'as', name: 'অসমীয়া', flag: '🇮🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
];


export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setLanguage] = useState('en');
  const { user } = useUser();

  const handleLogout = async () => {
    await signOut(getAuth());
    router.push('/');
  };

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-blue-200",
        pathname === href ? "text-white font-medium" : "text-blue-100"
      )}
      prefetch={false}
      onClick={() => setSheetOpen(false)}
    >
      {label}
    </Link>
  );

  const ServiceDropdownMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex items-center gap-1 transition-colors hover:text-blue-200", 
            pathname.startsWith("/services") ? "text-white font-medium" : "text-blue-100"
        )}>
          Services <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-white text-gray-800 rounded-lg shadow-xl mt-2">
        {services.map((service) => (
          <DropdownMenuItem key={service.href} asChild>
            <Link href={service.href} className="block px-4 py-3 hover:bg-gray-50 border-b">
                <service.icon className="mr-2 h-4 w-4 text-gray-600" />
                <span>{service.label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const LanguageSelector = () => (
      <div className="relative">
        <button
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="flex items-center space-x-1 hover:text-blue-200 transition-colors text-blue-100"
        >
            <Globe className="w-4 h-4" />
            <span>{languages.find(lang => lang.code === currentLanguage)?.flag}</span>
        </button>
        {isLanguageOpen && (
            <div className="absolute top-full right-0 w-40 bg-white text-gray-800 rounded-lg shadow-xl mt-2">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => {
                        setLanguage(lang.code as any);
                        setIsLanguageOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                        currentLanguage === lang.code ? 'bg-blue-50 text-blue-800' : ''
                    }`}
                >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                </button>
            ))}
            </div>
        )}
      </div>
  );
  
  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
                <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden mr-2 hover:bg-blue-800">
                    <Menu className="h-6 w-6 text-white" />
                    <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-blue-900 text-white">
                    <div className="flex flex-col gap-6 text-lg font-medium mt-8">
                        <Logo />
                        <nav className="flex flex-col gap-4 mt-4">
                          {navLinks.map((link) => (
                              <NavLink key={link.href} {...link} />
                          ))}
                           {user && (
                            <NavLink href="/user-dashboard" label="Dashboard" />
                          )}
                          <div className="text-blue-200">Services</div>
                          <div className="flex flex-col gap-3 pl-4">
                            {services.map(service => (
                               <Link key={service.href} href={service.href} className="text-sm text-blue-100 hover:text-white" onClick={() => setSheetOpen(false)}>
                                 {service.label}
                               </Link>
                            ))}
                          </div>
                        </nav>
                         {user && (
                            <Button onClick={handleLogout} variant="outline" className="mt-6 bg-transparent text-white border-white">
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        )}
                    </div>
                </SheetContent>
                </Sheet>
                <Logo />
            </div>

            <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
              {navLinks.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
              <ServiceDropdownMenu />
               {user && (
                <NavLink href="/user-dashboard" label="Dashboard" />
              )}
              <LanguageSelector />
            </nav>

            <div className="hidden md:flex items-center justify-end space-x-2">
              {user ? (
                <div className="flex items-center gap-4">
                    <span className="text-sm text-blue-100 hidden lg:block">Welcome, {user.displayName || 'User'}</span>
                    <Button onClick={handleLogout} variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                        <LogOut className="mr-2 h-4 w-4"/>
                        Logout
                    </Button>
                </div>
              ) : (
                <div className="hidden">
                  <Button asChild variant="default" className="bg-blue-700 hover:bg-blue-600 text-white text-sm">
                    <Link href="/login">
                      Login
                    </Link>
                  </Button>
                   <Button asChild variant="secondary" className="bg-white text-blue-800 hover:bg-gray-100 text-sm">
                    <Link href="/register">
                      Register
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            <div className="md:hidden">
                {user ? (
                    <Button asChild size="sm" variant="outline" className="bg-transparent border-white text-white">
                        <Link href="/user-dashboard">
                            <User className="h-4 w-4"/>
                        </Link>
                    </Button>
                ) : (
                    <div className="hidden">
                      <Button asChild size="sm" variant="default" className="bg-blue-700 hover:bg-blue-600 text-white">
                          <Link href="/login">
                              Login
                          </Link>
                      </Button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </header>
  );
}
