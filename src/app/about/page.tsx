
import Image from "next/image";
import Link from "next/link";
import { PlayCircle, Camera, Target, Eye, BookOpen, Film } from "lucide-react";
import { interviewsAndPodcasts, galleryImages } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const featuredVideos = interviewsAndPodcasts.slice(0, 2);
  const featuredImages = galleryImages.slice(0, 4);

  return (
    <div className="bg-background text-foreground">
      <main className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <article className="space-y-16">
          {/* Header Section */}
          <header className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              About Luit Kumar Barman
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Engineer • Film Producer • Social Activist • Author
            </p>
          </header>

          {/* Hero Video */}
          <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <video
              src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          {/* Biography Section */}
          <section className="prose prose-lg max-w-none dark:prose-invert">
            <div className="bg-card p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold font-headline mb-6">A Journey of Impact</h2>
              <p>
                Luit Kumar Barman is an engineer by education, but his professional journey has expanded far beyond a single discipline. He currently serves as the Managing Director of Medishine Pharmaceuticals Pvt Ltd and is a Director at Genix India Developers Pvt Ltd, demonstrating his leadership in the business sector.
              </p>
              <p>
                A renowned film producer in Assam, his work has garnered international acclaim. His most recent film, "Boomba Ride," was screened at the prestigious 75th Cannes Film Festival, a testament to his creative vision and storytelling prowess. His contributions to cinema were further recognized when he received the Rajat Kamal Award at the 69th National Film Festival.
              </p>
              <p>
                Beyond the world of business and film, Mr. Barman is a well-known social activist in Assam, dedicated to community welfare and driving positive change. His recent foray into acting in a musical video has been widely appreciated across all sections of society. Adding another dimension to his multifaceted career, he is also a novelist. His latest book, "Damn It," has received widespread appreciation from readers across India, showcasing his talent as a compelling storyteller.
              </p>
            </div>
          </section>

          {/* Mission and Vision Section */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                       <Target className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold font-headline">Our Mission</h2>
                  </div>
                  <p className="text-muted-foreground">To leverage technology and community engagement to create transparent, accessible, and efficient services that empower every citizen and foster inclusive growth.</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-accent/10 rounded-full">
                        <Eye className="w-8 h-8 text-accent" />
                    </div>
                    <h2 className="text-2xl font-bold font-headline">Our Vision</h2>
                  </div>
                  <p className="text-muted-foreground">A future where digital innovation and social responsibility converge to build a connected, informed, and thriving society for all.</p>
                </CardContent>
              </Card>
            </div>
          </section>


          {/* Video Gallery Section */}
          <section>
            <h2 className="text-3xl font-bold font-headline text-center mb-10">In Conversation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredVideos.map((video) => (
                <Link key={video.id} href={video.url} target="_blank" rel="noopener noreferrer">
                  <div className="relative rounded-2xl overflow-hidden group shadow-lg">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <PlayCircle className="w-20 h-20 text-white/80" />
                    </div>
                    <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-4 w-full">
                       <h3 className="text-white font-bold text-lg">{video.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Photo Gallery Section */}
          <section>
            <h2 className="text-3xl font-bold font-headline text-center mb-10">Moments in Time</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredImages.map((image) => {
                 return (
                  <div key={image.id} className="relative aspect-square rounded-xl overflow-hidden group shadow-lg">
                    <Image
                      src={`/images/gallery/${image.imageId}`}
                      alt={image.title}
                      fill
                      objectFit="cover"
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
                      <p className="text-white text-center text-sm font-semibold">{image.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-10">
                <Button asChild>
                    <Link href="/gallery" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md">
                        View Full Gallery
                        <Camera className="ml-2 -mr-1 h-5 w-5" />
                    </Link>
                </Button>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
