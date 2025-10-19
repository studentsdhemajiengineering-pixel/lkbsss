import { ArrowRight, BookOpenCheck, CalendarCheck, FileWarning, HeartPulse } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Appointment Booking",
    description: "Schedule appointments with government officials.",
    icon: <CalendarCheck className="h-8 w-8 text-primary" />,
    href: "/services/appointment-booking",
  },
  {
    title: "Grievance Redressal",
    description: "Lodge and track grievances and complaints.",
    icon: <FileWarning className="h-8 w-8 text-primary" />,
    href: "/services/grievance-system",
  },
  {
    title: "Health Support",
    description: "Access health schemes and support services.",
    icon: <HeartPulse className="h-8 w-8 text-primary" />,
    href: "/services/health-support",
  },
  {
    title: "Education Support",
    description: "Apply for scholarships and educational programs.",
    icon: <BookOpenCheck className="h-8 w-8 text-primary" />,
    href: "/services/education-support",
  },
];

export default function ServicesPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter">
          Our Services
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl/relaxed">
          Access a wide range of government services online.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.title} className="flex flex-col">
            <CardHeader className="flex flex-row items-start gap-4">
              {service.icon}
              <div className="flex-1">
                <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
              <Button asChild className="w-full">
                <Link href={service.href}>
                  Access Service <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
