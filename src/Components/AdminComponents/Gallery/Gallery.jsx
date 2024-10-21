import React, { useEffect, useState } from "react";
import axios from "axios";
import URL from "../../../apiconfig";
import "./gallery.css";
import { useAlert } from "../../../AlertContext";

const Gallery = () => {
  const [gallery, setGallery] = useState({ photos: [], video: "" });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const alert = useAlert();

  useEffect(() => {
    fetchGallery();
  }, [loading, files]);

  const fetchGallery = async () => {
    try {
      const response = await axios.get(
        `${URL}/api/gallery?v=${new Date().getTime()}`
      );
      if (response.data) setGallery(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching gallery:", error.message);
      // alert("Error fetching gallery");
    }
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleDeletePhoto = async (photo) => {
    setLoading(true);
    let id;
    if (typeof photo == "string") id = photo;
    else {
      id = photo._id;
    }
    try {
      const Authorization = localStorage.getItem("token");
      await axios.delete(`${URL}/api/file/${id}`, {
        headers: { Authorization },
      });
      setGallery((prevGallery) => ({
        ...prevGallery,
        photos: prevGallery.photos.filter((photoId) => photoId !== id),
      }));

      setLoading(false);
    } catch (error) {
      console.error("Error deleting photo:", error);
      alert("Error deleting photo");
      setLoading(false);
    }
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const Authorization = localStorage.getItem("token");

    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append("upload", file);
        formData.append("type", "Gallery");
        const response = await fetch(URL + "/api/file/upload", {
          method: "POST",
          headers: {
            Authorization,
          },
          body: formData,
        });

        const data = await response.json();
        if (data.error) alert(data.error);
        else alert(data.message, "");
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
    setLoading(false);
  };

  const getImageUrl = (img) => {
    if (img.file && img.file.startsWith("/")) return `${URL}${img.file}`;
    if (img.file && img.file.startsWith("http")) return `${img.file}`;
    if (img._id) return `${URL}/api/file/view/${img._id}`;
    return `${URL}/api/file/view/${img}`;
  };

  return (
    <div className="gallery-container p-10">
      <h1 className="text-3xl font-bold mb-5 text-center">Gallery</h1>
      <div className="gallery-list mb-5 grid grid-cols-4 gap-4">
        {gallery.photos.map((photo) => (
          <div
            key={getImageUrl(photo)}
            className="gallery-item bg-gray-200 p-4 rounded flex flex-col items-center"
          >
            <img
              src={getImageUrl(photo)}
              alt="Gallery"
              className="w-full h-40 object-cover rounded mb-2"
            />
            <button
              className="bg-red-600 p-2 rounded text-white"
              onClick={() => handleDeletePhoto(photo)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {loading && <div className="loader">Uploading...</div>}
      {!loading && (
        <div className="upload-section">
          <h2 className="text-2xl mb-4">Add New Photo</h2>
          <input type="file" multiple onChange={handleFileChange} />
          <button onClick={handleFileSubmit}>Upload</button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
