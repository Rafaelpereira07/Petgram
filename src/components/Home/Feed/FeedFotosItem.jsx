import React, { useState } from 'react';
import images from './FeedData';
import FeedModal from './FeedModal';

function FeedFotosItem() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <main className="flex flex-col items-center min-h-screen pt-40 pb-24 bg-white">
      <div className="grid grid-cols-3 gap-5">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="rounded overflow-hidden shadow-sm bg-white cursor-pointer"
            onClick={() => setSelectedIndex(idx)}
          >
            <img
              src={img.src}
              alt={img.name}
              className="w-50 h-50 object-cover mx-auto"
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
