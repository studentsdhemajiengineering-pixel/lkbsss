"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, Newspaper, GalleryHorizontal, Users, Files, Settings, LogOut } from "lucide-react"

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { logout } from "@/lib/auth"

const adminNavLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Home },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/gallery", label: "Gallery", icon: GalleryHorizontal },
  { href: "/admin/resources", label: "Resources", icon: Files },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

function AdminLogo() {
    return (
        <Link href="/admin/dashboard" className="flex items-center space-x-3" prefetch={false}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                <Image src="/images/logo-profile.jpg" alt="Luit Kumar Barman" width={40} height={40} className="object-cover"/>
            </div>
            <div>
                <h1 className="text-lg font-bold">Luit Kumar Barman</h1>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
        </Link>
    )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await logout();
    window.location.href = '/admin/login';
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <AdminLogo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {adminNavLinks.map((link) => (
              <SidebarMenuItem key={link.href}>
                <Link href={link.href} className="w-full">
                  <SidebarMenuButton 
                    isActive={pathname === link.href} 
                    tooltip={{children: link.label}}
                  >
                    <link.icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator />
           <div className="flex items-center gap-3 p-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://i.pravatar.cc/150?u=admin" alt="Admin" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
           </div>
          <SidebarSeparator />
          <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip={{children: 'Logout'}} onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold font-headline">
            {adminNavLinks.find(link => pathname.startsWith(link.href))?.label || "Admin"}
          </h1>
        </header>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
