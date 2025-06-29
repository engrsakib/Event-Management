import React, { useState } from "react";

const galleryImages = [
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b8a?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b8a?auto=format&fit=crop&w=500&q=80",
];

export default function ImageGallery() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  const openModal = (img) => {
    setModalImg(img);
    setModalOpen(true);
  };

  function GalleryModal({ open, img, onClose }) {
    if (!open) return null;
    return (
      <div
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 animate-fadeIn"
        onClick={onClose}
      >
        <img
          src={img}
          alt="zoomed"
          className="max-h-[80vh] max-w-[92vw] rounded-2xl shadow-2xl border-4 border-white animate-zoomIn"
        />
      </div>
    );
  }

  return (
    <>
      <section className="max-w-6xl mx-auto mt-24 px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-[#7F0B0B] animate-fadeInDown tracking-tight">
          Photo Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-7">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="relative group rounded-3xl overflow-hidden shadow-lg cursor-pointer animate-fadeIn hover:ring-4 ring-[#7F0B0B]/30"
              onClick={() => openModal(img)}
            >
              <img
                src={img}
                alt={`gallery-${i}`}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#7F0B0B]/80 via-transparent to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">
                <span className="text-6xl text-white drop-shadow-lg font-bold animate-bounce">
                  +
                </span>
              </div>
            </div>
          ))}
        </div>
        <GalleryModal
          open={modalOpen}
          img={modalImg}
          onClose={() => setModalOpen(false)}
        />
      </section>
    </>
  );
}
