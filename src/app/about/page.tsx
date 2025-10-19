import Image from "next/image";
import Link from "next/link";
import { PlayCircle, Camera } from "lucide-react";
import { interviewsAndPodcasts, galleryImages } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

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

          {/* Hero Image */}
          <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://picsum.photos/seed/about/1200/600"
              alt="Luit Kumar Barman"
              layout="fill"
              objectFit="cover"
              className="transform hover:scale-105 transition-transform duration-500"
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
                 const imgData = PlaceHolderImages.find(p => p.id === image.imageId);
                 return imgData ? (
                  <div key={image.id} className="relative aspect-square rounded-xl overflow-hidden group shadow-lg">
                    <Image
                      src={imgData.imageUrl}
                      alt={imgData.description}
                      data-ai-hint={imgData.imageHint}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
                      <p className="text-white text-center text-sm font-semibold">{image.title}</p>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
            <div className="text-center mt-10">
                <Link href="/gallery" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90">
                    View Full Gallery
                    <Camera className="ml-2 -mr-1 h-5 w-5" />
                </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
