import Image from "next/image";
import { galleryImages } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { GalleryImage } from "@/lib/placeholder-data";

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
        {galleryImages.map((image: GalleryImage) => {
          return (
            <div key={image.id} className="relative aspect-square rounded-xl overflow-hidden group shadow-lg">
                <Image
                  src={`/images/gallery/${image.imageId}`}
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
