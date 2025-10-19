import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Facebook, Instagram, Linkedin, Rss, Twitter, Youtube } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { newsArticles, socialPosts, galleryImages } from '@/lib/placeholder-data';
import type { SocialPost, NewsArticle, GalleryImage } from '@/lib/placeholder-data';

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');
const socialIcons: { [key: string]: React.ReactNode } = {
  Twitter: <Twitter className="h-6 w-6 text-sky-500" />,
  Facebook: <Facebook className="h-6 w-6 text-blue-600" />,
  Instagram: <Instagram className="h-6 w-6 text-pink-500" />,
  LinkedIn: <Linkedin className="h-6 w-6 text-sky-700" />,
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="relative w-full h-[70vh] flex items-center justify-center">
        {heroImage &&
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        }
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container px-4 md:px-6 text-center text-white space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
            Welcome to Digital Connect
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-200">
            Your central hub for official announcements, news, and community engagement. Stay informed, stay connected.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-light))] text-primary-foreground hover:opacity-90 transition-opacity">
              <Link href="/resources">Explore Resources</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/news">Latest News</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="social" className="w-full py-12 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tighter">
              Catch the Buzz
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl/relaxed">
              Follow us on social media for real-time updates and highlights.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {socialPosts.map((post: SocialPost) => (
              <Card key={post.id} className="flex flex-col">
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  {socialIcons[post.platform]}
                  <div>
                    <CardTitle className="text-base">{post.username}</CardTitle>
                    <p className="text-sm text-muted-foreground">{post.platform}</p>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm">{post.content}</p>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="news" className="w-full py-12 md:py-20 lg:py-24 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tighter">
              News & Articles
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl/relaxed">
              The latest stories, updates, and features from our team.
            </p>
          </div>
          <Tabs defaultValue="latest" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="latest"><Rss className="mr-2 h-4 w-4" />Latest</TabsTrigger>
              <TabsTrigger value="video"><Youtube className="mr-2 h-4 w-4" />Video</TabsTrigger>
              <TabsTrigger value="podcast">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                Podcasts
              </TabsTrigger>
            </TabsList>
            <TabsContent value="latest">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {newsArticles.slice(0, 3).map((article: NewsArticle) => {
                  const articleImage = PlaceHolderImages.find(p => p.id === article.imageId);
                  return (
                    <Card key={article.id} className="overflow-hidden">
                      {articleImage && 
                        <Link href={`/news/${article.id}`} className="block">
                          <Image
                            src={articleImage.imageUrl}
                            alt={articleImage.description}
                            data-ai-hint={articleImage.imageHint}
                            width={600}
                            height={400}
                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                      }
                      <CardHeader>
                        <CardTitle className="text-lg font-headline">{article.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
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
            </TabsContent>
            <TabsContent value="video">
               <div className="text-center py-16 text-muted-foreground">Video news content coming soon.</div>
            </TabsContent>
            <TabsContent value="podcast">
                <div className="text-center py-16 text-muted-foreground">Podcasts coming soon.</div>
            </TabsContent>
          </Tabs>
           <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/news">View All News</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="gallery" className="w-full py-12 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6">
           <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tighter">
              From Our Gallery
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl/relaxed">
              A glimpse into our latest events and initiatives.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.slice(0, 4).map((image: GalleryImage, index: number) => {
              const imgData = PlaceHolderImages.find(p => p.id === image.imageId);
              return (
                <div key={image.id} className={`relative aspect-square rounded-lg overflow-hidden group ${index >= 2 ? 'hidden md:block' : ''}`}>
                  {imgData &&
                    <Image
                      src={imgData.imageUrl}
                      alt={imgData.description}
                      data-ai-hint={imgData.imageHint}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  }
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <p className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">{image.title}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/gallery">View Full Gallery <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
