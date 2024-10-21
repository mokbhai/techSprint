import React, { useState, useEffect } from "react";

import RevolvingPhotos from "../../Components/RevolvingPhotos/RevolvingPhotos";
import YouTubePlayer from "../../Components/YouTubePlayer";
import URL from "../../apiconfig";
import { useAlert } from "../../AlertContext";

const WelcomeComponent = () => {
  const videoIds = ["6qyu9fVyees", "mSy5KJOjISs"];
  const [title, setTitle] = useState("TechSprint");
  const [videos, setVideos] = useState([]);
  const [description, setDescription] = useState(
    "TechSprint is an upcoming technical carnival aimed at enriching the curiosity, creativity, and scientific attitude among students from Class 6 to 12. It is an excellent platform for young minds to explore the exciting world of technology, engage in hands-on technical events, and showcase their skills in this amazing competitions. The event will inspire students to think outside the box, develop problem-solving abilities, and embrace the digital future. Get ready to be ignited with knowledge and fun!"
  );

  const alert = useAlert();

  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        const response = await fetch(`${URL}/api/aboutUs`);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title || "TechSprint");
          setVideos(data.videos || videoIds);
          setDescription(
            data.description ||
              "TechSprint is an upcoming technical carnival aimed at enriching the curiosity, creativity, and scientific attitude among students from Class 6 to 12. It is an excellent platform for young minds to explore the exciting world of technology, engage in hands-on technical events, and showcase their skills in this amazing competitions. The event will inspire students to think outside the box, develop problem-solving abilities, and embrace the digital future. Get ready to be ignited with knowledge and fun!"
          );
        } else {
          console.error("Failed to fetch about us data:", response.statusText);
          alert("Failed to fetch about us data:");
        }
      } catch (error) {
        console.error("Error fetching about us data:", error.message);
        alert("Failed to fetch about us data:");
      }
    };

    fetchAboutUsData();
  }, []);

  return (
    <div className="flex flex-col h-auto rounded-xl">
      <div className="flex flex-col w-full justify-evenly items-center py-4 md:p-8  ">
        {/* <p className="font-serif font-extrabold text-3xl sm:text-4xl md:text-5xl ">
          WELCOME
        </p> */}
        <p className="text-3xl pt-2 sm:text-5xl md:text-5xl lg:text-7xl font-avenger text-center mb-3 text-slate-400">
          {title.toTitleCase()}
        </p>
        <p className="tracking-widest font-semibold p-2 sm:p-4 m-2 sm:m-4 text-justify text-sm sm:text-base">
          {description}
        </p>
      </div>
      {/* <div className="hidden lg:flex lg:w-1/2 justify-center items-center mt-4 lg:mt-0"> */}
      {/* 
      <div className="hidden  lg:flex md:flex lg:flex-wrap gap-3 w-full md:w-1/2 items-center justify-evenly p-4 md:p-8 bg-slate-900">
        <RevolvingPhotos />
      </div> */}

      {/* YouTube Players */}
      <div className="flex flex-wrap min-w-min justify-center items-center mt-4 lg:mt-0 gap-4">
        {videos.map((videoId) => (
          <div
            key={videoId} // Key should be on the outer div
            className="rounded-xl hero-img glowing-border h-auto min-w-min"
          >
            <YouTubePlayer key={videoId} id={videoId} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomeComponent;
