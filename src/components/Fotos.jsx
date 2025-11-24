import React, { useState } from 'react';
import Img1 from '../assets/fotos/Img1.png';
import Img2 from '../assets/fotos/Img2.png';
import Img3 from '../assets/fotos/Img3.png';
import Img4 from '../assets/fotos/Img4.png';
import Img5 from '../assets/fotos/Img5.png';

const images = [
  {
    src: Img1,
    name: "Guacho",
    age: "1 Ano",
    weight: "2 Kg",
    uploader: "Rafael",
    comments: [
      { author: "Clóvis", text: "Muito fofo!" },
      { author: "Claudio", text: "Da um baita churrasco!" },
    ]
  },
    {
    src: Img2,
    name: "Agatha",
    age: "2 Ano",
    weight: "3 Kg",
    uploader: "Rafael",
    comments: [
      { author: "Sofia", text: "Muito Viva!" },
    ]
  },
   {
    src: Img4,
    name: "Guacho",
    age: "1 Ano",
    weight: "2 Kg",
    uploader: "Rafael",
    comments: [
      { author: "Clóvis", text: "Muito fofo!" },
      { author: "Claudio", text: "Da um baita churrasco!" },
    ]
  },
   {
    src: Img3,
    name: "Guacho",
    age: "1 Ano",
    weight: "2 Kg",
    uploader: "Rafael",
    comments: [
      { author: "Clóvis", text: "Muito fofo!" },
      { author: "Claudio", text: "Da um baita churrasco!" },
    ]
  },
  {
    src: Img5,
    name: "Agatha",
    age: "2 Ano",
    weight: "3 Kg",
    uploader: "Rafael",
    comments: [
      { author: "Sofia", text: "Muito Viva!" },
    ]
  },
  {
    src: Img1,
    name: "Agatha",
    age: "2 Ano",
    weight: "3 Kg",
    uploader: "Rafael",
    comments: [
      { author: "Sofia", text: "Muito Viva!" },
    ]
  },
  // Data das Imagens
];

function Popup({ data, onClose }) {
  const [commentText, setCommentText] = useState("");         
  const [comments, setComments] = useState(data?.comments || []);

  if (!data) return null;

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    const newComment = { author: "Você", text: commentText };
    setComments(prev => [...prev, newComment]);
    setCommentText("");
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* fundo escuro */}
      <div
        className="absolute inset-0 bg-black opacity-80"
        onClick={onClose}
      />
      <div className="relative flex bg-white rounded-xl shadow-2xl w-[647px] h-[420px] overflow-hidden z-10">
        {/* imagem */}
        <div className="flex-none w-[370px] h-full bg-c3">
          <img
            src={data.src}
            alt={data.name}
            className="object-cover w-full h-full"
          />
        </div>

        {/* conteúdo */}
        <div className="relative flex flex-col flex-1 px-7 py-3">
          <span className="absolute top-3.5 left-3.5 text-sm text-c6">@{data.uploader}</span>
          <span className="pt-8 font-serif font-bold text-[30px] leading-10 text-p5">
            {data.name}
          </span>
          <span className="text-base text-p5">{data.age} | {data.weight}</span>
          <div className="mt-8">
            {comments.map((c, i) => (
              <div className="flex" key={i}>
                <span className="font-semibold text-sm text-p5 mr-1">{c.author}:</span>
                <span className="text-sm text-p5">{c.text}</span>
              </div>
            ))}
          </div>

          {/* Caixa de Comentários */}
          <div className="flex gap-2 mt-auto pb-1">
            <input
              className="flex-1 py-2 px-2 rounded-lg bg-linear-to-r from-c5 to-gray-c5 text-c8 placeholder-c7 text-base focus:outline-none"
              placeholder="Comentar"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddComment();
                }
              }}
            />
            <button className="p-2" onClick={handleAddComment}>
              <svg height="20" width="20" fill="#2E8EFF" viewBox="0 0 20 20">
                <path d="M2 16L17 9.5L2 3V8.5L13 9.5L2 10.5V16Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


function Fotos() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <main className="flex flex-col items-center min-h-screen pt-30 pb-24 bg-white">
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
      <Popup
        data={typeof selectedIndex === 'number' ? images[selectedIndex] : null}
        onClose={() => setSelectedIndex(null)}
      />
    </main>
  );
}

export default Fotos;

