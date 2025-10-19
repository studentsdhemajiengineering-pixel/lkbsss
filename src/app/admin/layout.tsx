"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const adminNavLinks = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/gallery", label: "Gallery", icon: GalleryHorizontal },
  { href: "/admin/resources", label: "Resources", icon: Files },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
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
                <Link href="/" className="w-full">
                    <SidebarMenuButton tooltip={{children: 'Logout'}}>
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold font-headline">
            {adminNavLinks.find(link => pathname === link.href)?.label || "Admin"}
          </h1>
        </header>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
