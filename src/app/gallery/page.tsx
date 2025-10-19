
'use client';
import Image from "next/image";
import type { GalleryImage } from "@/lib/types";

const galleryImages: Omit<GalleryImage, 'imageId' | 'published_at'>[] = [
    { id: '1', title: 'Gallery Image 1',  imageUrl:  '/images/gallery/gallery1.jpg' },
    { id: '2', title: 'Gallery Image 2', imageUrl: '/images/gallery/gallery2.jpg' },
    { id: '3', title: 'Gallery Image 3', imageUrl: '/images/gallery/gallery3.jpg' },
    { id: '4', title: 'Gallery Image 4', imageUrl: '/images/gallery/gallery4.jpg' },
    { id: '5', title: 'Gallery Image 5', imageUrl: '/images/gallery/gallery5.jpg' },
    { id: '6', title: 'Gallery Image 6', imageUrl: '/images/gallery/gallery6.jpg' },
    { id: '7', title: 'Gallery Image 7', imageUrl: '/images/gallery/gallery7.jpg' },
    { id: '8', title: 'Gallery Image 8', imageUrl: '/images/gallery/gallery8.jpg' },
    { id: '9', title: 'Gallery Image 9', imageUrl: '/images/gallery/gallery9.jpg' },
    { id: '10', title: 'Gallery Image 10', imageUrl: '/images/gallery/gallery10.jpg' },
    { id: '11', title: 'Gallery Image 11', imageUrl: '/images/gallery/gallery11.jpg' },
    { id: '12', title: 'Gallery Image 12', imageUrl: '/images/gallery/gallery12.jpg' },
    { id: '13', title: 'Gallery Image 13', imageUrl: '/images/gallery/gallery13.jpg' },
    { id: '14', title: 'Gallery Image 14', imageUrl: '/images/gallery/gallery14.jpg' },
    { id: '15', title: 'Gallery Image 15', imageUrl: '/images/gallery/gallery15.jpg' },
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
