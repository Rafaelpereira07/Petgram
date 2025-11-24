import React, { useState } from 'react';
import images from './FeedData';
import FeedModal from './FeedModal';

function FeedFotosItem() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
  <main className="flex flex-col items-center min-h-screen pt-20 md:pt-40 pb-24 bg-white px-4">
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 w-full max-w-6xl">
      {images.map((img, idx) => (
        <div
          key={idx}
          className="rounded overflow-hidden shadow-sm bg-white cursor-pointer transition-transform hover:scale-105"
          onClick={() => setSelectedIndex(idx)}
        >
          <img
            src={img.src}
            alt={img.name}
            className="w-full h-auto aspect-square object-cover"
          />
        </div>
      ))}
    </div>
    <FeedModal
      data={typeof selectedIndex === 'number' ? images[selectedIndex] : null}
      onClose={() => setSelectedIndex(null)}
    />
  </main>
);
}

export default FeedFotosItem;
