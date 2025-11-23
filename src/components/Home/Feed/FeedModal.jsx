import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FeedModal({ data, onClose }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(data?.comments || []);
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
      <div className="relative flex bg-white rounded-xl shadow-2xl mt-50 w-[640px] h-[420px] overflow-hidden z-10">
        {/* Image */}
        <div className="flex-none w-[369px] h-full bg-c3">
          <img
            src={data.src}
            alt={data.name}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Content */}
        <div className="relative flex flex-col flex-1 px-7 py-3">
          {/* Clickable username only if not admin */}
          <span
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
          {/* Comment Box */}
          <div className="flex gap-0 mt-auto pb-1">
            <input
              className="flex-1 py-3 px-1 rounded-lg bg-linear-to-r from-c3 to-c2 text-c8 placeholder-c7 text-base focus:outline-none"
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
    </div>
  );
}

export default FeedModal;
