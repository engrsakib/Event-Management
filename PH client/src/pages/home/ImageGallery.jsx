import React, { useState } from "react";

const galleryImages = [
  "https://5.imimg.com/data5/SELLER/Default/2024/11/462865092/KL/FV/UY/73009269/event-management-services.jpeg",
  "https://media.licdn.com/dms/image/v2/C4E1BAQHQzcJ-Mte5JQ/company-background_10000/company-background_10000/0/1584692313412/atelier_events_dc_llc_cover?e=2147483647&v=beta&t=F_uTm6zZYC0A3yQ8v4IGuRAO2ir5zq-TmhnDPl3P_bM",
  "https://4.imimg.com/data4/WR/TX/MY-23918569/wedding-reception-event-services.jpg",
  "https://onlinecareertraining.bergen.edu/common/images/1/16842/event-management.jpg",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=500&q=80",
  "https://www.universityevents.harvard.edu/sites/default/files/Homepage-Photo-PG-The-Plaza.jpg",
  "https://www.mbatuts.com/wp-content/uploads/2019/11/Event-Planning-Business-in-plan.jpg",
  "https://news.miami.edu/uonline/_assets/images/images-stories/2023/10/event-management-sports-lg.jpg",
  "https://www.training.com.au/wp-content/uploads/event-manager.jpeg",
  "https://gomomentus.com/hs-fs/hubfs/shutterstock_2140269661.jpg?length=1280&name=shutterstock_2140269661.jpg",
  "https://blog.inevent.com/wp-content/uploads/2024/01/networking-min-1024x577.png",
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
