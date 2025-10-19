
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Resource } from "@/lib/types";
import { Download } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useFirebase } from "@/firebase/provider";
import { getResources } from "@/lib/services";
import { useState, useEffect } from "react";

export default function ResourcesPage() {
  const { firestore } = useFirebase();
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    if (firestore) {
      getResources(firestore).then(setResources);
    }
  }, [firestore]);


  const getBadgeVariant = (category: Resource["category"]) => {
    switch (category) {
      case "Announcement":
        return "default";
      case "Scheme":
        return "secondary";
      case "Press Release":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter">
          Official Resources
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl/relaxed">
          Find all official announcements, government schemes, and press releases in one place.
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60%]">Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((resource: Resource) => (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium">{resource.title}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(resource.category)}>{resource.category}</Badge>
                  </TableCell>
                  <TableCell>{new Date(resource.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="icon">
                      <Link href={resource.link} aria-label={`Download ${resource.title}`}>
                        <Download className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
