import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { newsArticles } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { NewsArticle } from "@/lib/placeholder-data";

export default function NewsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter">
          News & Articles
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl/relaxed">
          Stay up-to-date with the latest stories, announcements, and insights from Digital Connect.
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {newsArticles.map((article: NewsArticle) => {
          const articleImage = PlaceHolderImages.find(p => p.id === article.imageId);
          return (
            <Card key={article.id} className="flex flex-col overflow-hidden">
                {articleImage && 
                <Link href={`/news/${article.id}`} className="block overflow-hidden">
                    <Image
                    src={articleImage.imageUrl}
                    alt={articleImage.description}
                    data-ai-hint={articleImage.imageHint}
                    width={600}
                    height={400}
                    className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                    />
                </Link>
                }
              <CardHeader>
                <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
                    <span>{article.date}</span>
                    <Badge variant="secondary">{article.category}</Badge>
                </div>
                <CardTitle className="text-xl font-headline leading-tight">
                  <Link href={`/news/${article.id}`}>{article.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-4">{article.excerpt}</p>
              </CardContent>
              <CardFooter>
                 <Button asChild variant="link" className="p-0 h-auto">
                    <Link href={`/news/${article.id}`}>Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
