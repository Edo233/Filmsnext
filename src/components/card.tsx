import Link from 'next/link';
import React from 'react';

export interface CardProps {
  id: string;
  title: string;
  img_url: string;
  vote_average: number;
}

export default function Card({ id, title, img_url, vote_average }: CardProps) {
  return (
  <Link href={`/singl/${id}`}>
   <div className='w-full aspect-[2/3] rounded-lg relative cursor-pointer group'>
      <div className='relative w-full h-full rounded-lg overflow-hidden'>
        <img 
          className='w-full h-full object-cover'
          src={img_url} 
          alt={title}
          loading="lazy"
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pt-16' />
      </div>
      <div className='absolute bottom-0 left-0 right-0 p-3 text-center'>
        <h3 className='text-white text-lg font-bold tracking-wide line-clamp-2 
                      drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'>
          {title}
        </h3>
        <div className='absolute top-2 right-2 w-8 h-8 rounded-full bg-yellow-500 
                       flex items-center justify-center shadow-lg'>
          <span className='text-black text-sm font-bold'>{vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
   </Link> 
  );
}