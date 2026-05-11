import type { CSSProperties } from 'react';
import Image, { StaticImageData } from 'next/image';

import { cn } from '@/shared/lib/utils';

type Poster = {
  key: string;
  src: string | StaticImageData;
  alt: string;
};

type PosterColumnProps = {
  posters: Poster[];
  duration?: number;
  className?: string;
  startOffset?: string;
};

export function PosterColumn({
  posters,
  duration = 36,
  className,
  startOffset = '0px',
}: PosterColumnProps) {
  return (
    <div className={cn('h-full min-w-0 overflow-hidden', className)}>
      <div style={{ transform: `translateY(${startOffset})` }}>
        <div
          className="poster-marquee-track flex flex-col"
          style={
            {
              '--poster-marquee-duration': `${duration}s`,
            } as CSSProperties
          }
        >
          <PosterStack posters={posters} />
          <PosterStack posters={posters} ariaHidden />
        </div>
      </div>
    </div>
  );
}

function PosterStack({
  posters,
  ariaHidden = false,
}: {
  posters: Poster[];
  ariaHidden?: boolean;
}) {
  return (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 flex-col gap-5 pb-5 xl:gap-6 xl:pb-6"
    >
      {posters.map((poster) => (
        <div
          key={poster.key}
          className="relative aspect-2/3 w-full shrink-0 overflow-hidden rounded-3xl"
        >
          <Image
            src={poster.src}
            alt={ariaHidden ? '' : poster.alt}
            fill
            className="object-cover"
            placeholder={typeof poster.src === 'string' ? 'empty' : 'blur'}
            sizes="(min-width: 1280px) 14vw, (min-width: 1024px) 16vw, 0px"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}
