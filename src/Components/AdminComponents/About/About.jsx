import React, { useState, useEffect } from "react";
import axios from "axios";
import URL from "../../../apiconfig";
import { useAlert } from "../../../AlertContext";

const About = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoInput, setVideoInput] = useState(""); // State for the input field
  const [videos, setVideos] = useState([]);
  const alert = useAlert();

  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        const response = await fetch(`${URL}/api/aboutUs`);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setDescription(data.description);
        } else {
          console.error(
            "Failed to fetch about us data:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching about us data:", error.message);
      }
    };

    fetchAboutUsData();
  }, []);

  const handleVideoAdd = () => {
    if (videoInput.trim() !== "") {
      setVideos([...videos, videoInput.trim()]);
      setVideoInput(""); // Clear the input field after adding
    }
  };

  const handleVideoRemove = (index) => {
    const updatedVideos = [...videos];
    updatedVideos.splice(index, 1);
    setVideos(updatedVideos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const aboutUsData = {
      title,
      description,
      videos,
    };

    try {
      const Authorization = localStorage.getItem("token");
      const response = await axios.post(
        `${URL}/api/aboutus/create`,
        aboutUsData,
        {
          headers: {
            Authorization,
            "Content-Type": "application/json",
          },
        }
      );
      // Handle successful response (e.g., redirect, update state)
      alert(response.data.message);
      // Consider clearing the form after successful submission
      setTitle("");
      setDescription("");
      setVideos([]);
    } catch (error) {
      console.error("Error updating About Us section:", error);
      alert("Error updating About Us section");
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div className="about-us-update text-black">
      <h2 className="text-3xl font-bold mb-5 text-center">Update About Us</h2>
      <form onSubmit={handleSubmit} className="bg-gray-200 flex flex-col p-4">
        {" "}
        {/* Added padding */}
        {/* Title */}
        <label htmlFor="title" className="mb-1">
          Title:
        </label>{" "}
        {/* Added label for */}
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded p-2 mb-2"
        />
        {/* Description */}
        <label htmlFor="description" className="mb-1">
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded p-2 mb-2"
        />
        {/* Video Input */}
        <div className="flex mb-2">
          {" "}
          {/* Container for input and button */}
          <input
            type="text"
            value={videoInput}
            onChange={(e) => setVideoInput(e.target.value)}
            placeholder="Enter Video ID"
            className="border rounded p-2 mr-2 flex-grow"
          />
          <button
            type="button"
            onClick={handleVideoAdd}
            className="bg-green-500 text-white p-2 rounded"
          >
            Add
          </button>
        </div>
        {/* Display added videos */}
        <ul>
          {videos.map((video, index) => (
            <li key={index} className="flex items-center mb-1">
              <span className="mr-2">{video}</span>
              <button
                type="button"
                onClick={() => handleVideoRemove(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded w-fit"
        >
          Update About Us
        </button>
      </form>
    </div>
  );
};

export default About;
