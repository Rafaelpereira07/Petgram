import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FeedModal({ data, onClose }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(data?.comments || []);
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();

  if (!data) return null;

  const isAdmin = data.uploader === "admin";

  const handleUserClick = () => {
    if (!isAdmin) {
      navigate("../user/card");
    }
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    const newComment = { author: "Você", text: commentText };
    setComments(prev => [...prev, newComment]);
    setCommentText("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-65"
        onClick={onClose}
      />
      <div className="hidden md:flex relative bg-white rounded-xl shadow-2xl mt-50 w-[640px] h-[420px] overflow-hidden z-10">
        <div className="flex-none w-[369px] h-full bg-c3">
          <img
            src={data.src}
            alt={data.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="relative flex flex-col flex-1 px-7 py-3">          <span
            className={`absolute top-3.5 left-3.5 text-sm text-c6 ${
              !isAdmin ? "cursor-pointer hover:text-blue-700" : ""
            }`}
            onClick={!isAdmin ? handleUserClick : null}
            title={!isAdmin ? "Ver perfil do autor" : ""}
          >
            @{data.uploader}
          </span>
          <span className="absolute top-9.5 left-3.5 font-serif font-bold text-[30px] leading-10 text-p5">
            {data.name}
          </span>
          <div>
            <span className="absolute top-20 left-3.5 text-[16px] text-p5">
              {data.age === "1" ? "1 Ano" : `${data.age} Anos`} | {data.weight} Kg
            </span>
          </div>
          <div className="mt-[50%]">
            {comments.map((c, i) => (
              <div className="flex" key={i}>
                <span className="font-semibold text-sm text-p5 mr-1">{c.author}:</span>
                <span className="text-sm text-p5">{c.text}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-0 mt-auto pb-1">
            <input
              className="flex-1 py-3 rounded-lg bg-linear-to-r from-c3 to-c2 text-c8 placeholder-c7 text-base focus:outline-none"
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
            <button className="p-1" onClick={handleAddComment}>
              <svg height="30" width="30" fill="#2E8EFF" viewBox="0 0 20 20">
                <path d="M2 16L17 9.5L2 3V8.5L13 9.5L2 10.5V16Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex md:hidden relative flex-col bg-white rounded-xl shadow-2xl w-[90vw] max-h-[85vh] overflow-hidden z-10">
        <div className={`relative w-full ${showComments ? 'h-48' : 'h-full'}  transition-all duration-300`}>
          <img
            src={data.src}
            alt={data.name}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="absolute bottom-3 left-3 text-white">
            <div className="font-serif font-bold text-2xl mb-1">
              {data.name}
            </div>
            <div className="text-sm">
              {data.age === "1" ? "1 Ano" : `${data.age} Anos`} | {data.weight} Kg
            </div>
          </div>
          <button 
            className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow-lg"
            onClick={() => setShowComments(!showComments)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" 
                fill="#2E8EFF"
              />
            </svg>
          </button>
          <span
            className={`absolute top-3 left-3 text-sm text-white ${
              !isAdmin ? "cursor-pointer hover:text-blue-200" : ""
            }`}
            onClick={!isAdmin ? handleUserClick : null}
            title={!isAdmin ? "Ver perfil do autor" : ""}
          >
            @{data.uploader}
          </span>
        </div>
        {showComments && (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4 py-3">
              <div className="mb-4">
                {comments.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
                ) : (
                  comments.map((c, i) => (
                    <div className="flex mb-2" key={i}>
                      <span className="font-semibold text-sm text-p5 mr-1">{c.author}:</span>
                      <span className="text-sm text-p5 flex-1">{c.text}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="flex gap-2 pb-2 px-4">
              <input
                className="flex-1 py-2 px-3 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Comentar..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddComment();
                  }
                }}
              />
              <button 
                className="p-2 bg-blue-500 rounded-lg disabled:opacity-50"
                onClick={handleAddComment}
                disabled={!commentText.trim()}
              >
                <svg height="20" width="20" fill="white" viewBox="0 0 20 20">
                  <path d="M2 16L17 9.5L2 3V8.5L13 9.5L2 10.5V16Z" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedModal;