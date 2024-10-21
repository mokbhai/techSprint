import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import URL from "../../apiconfig";
import Footer from "../../Components/Footer/Footer";
import { useAlert } from "../../AlertContext";
import LoadingCircle from "../../Components/lodingCircle";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const minZoomLevel = 0.6;
  const [zoomLevel, setZoomLevel] = useState(minZoomLevel);
  const imageRef = useRef(null);

  const alert = useAlert();

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await fetch(
          `${URL}/api/gallery?v=${new Date().getTime()}`
        );
        const data = await response.json();
        console.log();
        if (data && data.photos) setPhotos(data.photos);
        if (!data || !data.photos) {
          setPhotos([]);
          alert("No Photos are available");
        }
      } catch (error) {
        alert("Error fetching gallery data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  const openModal = (photoId) => {
    setSelectedImage(photoId);
    setIsModalOpen(true);
    setZoomLevel(minZoomLevel);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const zoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 0.2);
  };

  const zoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(minZoomLevel, prevZoom - 0.2));
  };

  const getImageUrl = (img) => {
    if (img.file && img.file.startsWith("/")) return `${URL}${img.file}`;
    if (img.file && img.file.startsWith("http")) return `${img.file}`;
    if (img._id) return `${URL}/api/file/view/${img._id}`;
    return `${URL}/api/file/view/${img}`;
  };
  return (
    <div className="bg-gradient-to-r overflow-hidden from-slate-950 to-slate-900">
      <Navbar />

      <div className="flex flex-col w-full min-h-screen  ">
        {loading && <LoadingCircle />}

        <div className="p-10 tracking-widest min-h-screen text-slate-400 text-center gap-1 justify-center flex flex-wrap bg-opacity-95 relative">
          {photos.map((photoId, index) => (
            <div
              key={index}
              className={`w-46 h-64 m-3 rounded-xl shadow-md shadow-blue-600 transition-transform duration-300 transform relative ${
                hoveredImage === photoId
                  ? "scale-150 z-40"
                  : hoveredImage
                  ? "opacity-80"
                  : "opacity-80"
              }`}
              onMouseEnter={() => setHoveredImage(photoId)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <img
                src={getImageUrl(photoId)}
                className="w-full h-64 object-cover object-center rounded-xl"
                alt="Gallery"
                onClick={() => {
                  openModal(photoId);
                  setHoveredImage(null);
                }}
                onLoad={() => setLoading(false)}
                onError={() => console.error(`Failed to load image ${photoId}`)}
              />
              {loading && <LoadingCircle />} {/* Loading indicator */}
            </div>
          ))}
        </div>
        <div>
          {isModalOpen && (
            <div
              className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-50"
              onClick={(e) => {
                if (
                  e.target === e.currentTarget ||
                  e.target === imageRef.current
                ) {
                  closeModal();
                }
              }}
            >
              <div className="w-full min-h-screen flex items-center justify-center rounded-xl p-auto shadow-xl">
                <img
                  ref={imageRef}
                  src={getImageUrl(selectedImage)}
                  className="scroll object-cover object-center rounded-3xl shadow-xl shadow-blue-600 hover:shadow-2xl hover:shadow-blue-600 transform"
                  alt="Selected"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: "center",
                    pointerEvents: zoomLevel > 1 ? "none" : "auto",
                  }}
                />
                <div className="hidden lg:block lg:absolute lg:bottom-0 lg:right-1/2 lg:hover:bottom-1">
                  <button
                    className="bg-slate-700 text-8xl text-white p-2 m-2 rounded-full"
                    onClick={zoomIn}
                  >
                    +
                  </button>
                  <button
                    className="bg-gray-700 text-8xl text-white p-2 m-2 rounded-full"
                    onClick={zoomOut}
                  >
                    -
                  </button>
                </div>
                <div className="absolute top-0 right-0 lg:hover:top-10">
                  <button
                    className="bg-gray-700 text-8xl lg:text-8xl sm:text-xl text-white p-2 m-2 rounded-full"
                    onClick={closeModal}
                  >
                    x
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
