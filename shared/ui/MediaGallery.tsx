'use client';

import { useState } from 'react';
import Image from 'next/image';

import { TMDBImage } from '@/shared/types/media';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from './carousel';
import { ScrollArea, ScrollBar } from './scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './dialog';

type MediaGalleryProps = {
  images: TMDBImage[];
  title: string;
};

export function MediaGallery({ images, title }: MediaGalleryProps) {
  const [open, setOpen] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  function openImage(index: number) {
    setSelectedIndex(index);
    setOpen(true);

    setTimeout(() => {
      carouselApi?.scrollTo(index);
    }, 0);
  }

  return (
    <>
      <ScrollArea className="ring-foreground/10 w-full rounded-md bg-white shadow-xs ring-1">
        <div className="flex w-max gap-4 p-4">
          {images.map((img, index) => (
            <button
              key={`${img.file_path}-${index}`}
              type="button"
              onClick={() => openImage(index)}
              className="group relative aspect-video h-[180px] shrink-0 overflow-hidden rounded-md bg-neutral-100"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                alt={`${title} media ${index + 1}`}
                fill
                sizes="320px"
                className="object-cover transition-transform duration-200 group-hover:scale-105"
              />
            </button>
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-0 bg-black p-0 text-white sm:max-w-7xl">
          <DialogTitle className="sr-only">{title} media gallery</DialogTitle>

          <DialogDescription className="sr-only">
            Image gallery for {title}. Use previous and next buttons to browse
            images.
          </DialogDescription>

          <Carousel
            setApi={setCarouselApi}
            opts={{
              startIndex: selectedIndex,
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {images.map((img, index) => (
                <CarouselItem key={img.file_path}>
                  <div className="relative h-[75vh] w-full">
                    <Image
                      src={`https://image.tmdb.org/t/p/original${img.file_path}`}
                      alt={`${title} media ${index + 1}`}
                      fill
                      sizes="90vw"
                      className="object-contain"
                      loading="eager"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="text-foreground left-4" />
            <CarouselNext className="text-foreground right-4" />
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  );
}
