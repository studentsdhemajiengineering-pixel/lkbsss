import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Users, Newspaper, GalleryHorizontal, PlusCircle } from "lucide-react";
import Link from "next/link";

const stats = [
  { title: "Total Users", value: "1,254", icon: Users, change: "+12.5%" },
  { title: "News Articles", value: "89", icon: Newspaper, change: "+5" },
  { title: "Gallery Images", value: "340", icon: GalleryHorizontal, change: "+22" },
  { title: "Site Visits", value: "24,890", icon: BarChart, change: "+8.2%" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold font-headline tracking-tight">Welcome back, Admin!</h2>
        <p className="text-muted-foreground">Here's a snapshot of your website's activity.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h3 className="text-2xl font-semibold font-headline mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/admin/news/new">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Article
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/admin/gallery/upload">
              <PlusCircle className="mr-2 h-4 w-4" /> Upload to Gallery
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/admin/resources/new">
              <PlusCircle className="mr-2 h-4 w-4" /> Post Announcement
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/admin/users/new">
              <PlusCircle className="mr-2 h-4 w-4" /> Create New User
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
