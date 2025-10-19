
'use client';
import Image from "next/image";
import type { GalleryImage } from "@/lib/types";

const galleryImages: Omit<GalleryImage, 'imageId' | 'published_at'>[] = [
    { id: '1', title: 'Community Gathering', imageUrl: '/images/gallery/1.jpg' },
    { id: '2', title: 'Inauguration Ceremony', imageUrl: '/images/gallery/2.jpg' },
    { id: '3', title: 'Youth Skill Program', imageUrl: '/images/gallery/3.jpg' },
    { id: '4', title: 'Cultural Event', imageUrl: '/images/gallery/4.jpg' },
    { id: '5', title: 'Health Camp', imageUrl: '/images/gallery/5.jpg' },
    { id: '6', title: 'Award Function', imageUrl: '/images/gallery/6.jpg' },
    { id: '7', title: 'Press Conference', imageUrl: '/images/gallery/7.jpg' },
    { id: '8', title: 'Felicitation Program', imageUrl: '/images/gallery/8.jpg' },
    { id: '9', title: 'Community Gathering', imageUrl: '/images/gallery/1.jpg' },
    { id: '10', title: 'Inauguration Ceremony', imageUrl: '/images/gallery/2.jpg' },
    { id: '11', title: 'Youth Skill Program', imageUrl: '/images/gallery/3.jpg' },
    { id: '12', title: 'Cultural Event', imageUrl: '/images/gallery/4.jpg' },
];


export default function GalleryPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter">
          Our Gallery
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl/relaxed">
          A visual journey through our events, initiatives, and community moments.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image) => {
          return (
            <div key={image.id} className="relative aspect-square rounded-xl overflow-hidden group shadow-lg">
                <Image
                  src={image.imageUrl}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-white font-bold text-lg font-headline">{image.title}</h3>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
