import React, { useEffect, useState } from "react";
import "./About.css";
import Navbar from "../../Components/Navbar/Navbar";
import aboutbg from "../../Assets/blueMultiverse.jpg";
import URL from "../../apiconfig";
import Footer from "../../Components/Footer/Footer";
import YouTubePlayer from "../../Components/YouTubePlayer";
import { useAlert } from "../../AlertContext";

const About = () => {
  const [videos, setVideos] = useState(["6qyu9fVyees", "mSy5KJOjISs"]);
  const [title, setTitle] = useState("TechSprint");
  const [description, setDescription] = useState(
    "TechSprint is an upcoming technical carnival aimed at enriching the curiosity, creativity, and scientific attitude among students from Class 6 to 12. It is an excellent platform for young minds to explore the exciting world of technology, engage in hands-on technical events, and showcase their skills in this amazing competitions. The event will inspire students to think outside the box, develop problem-solving abilities, and embrace the digital future. Get ready to be ignited with knowledge and fun!"
  );

  const alert = useAlert();

  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        const response = await fetch(`${URL}/api/aboutUs`);
        const data = await response.json();
        console.log(data);
        if (data.videos) setVideos(data.videos);
        setTitle(data.title || "TechSprint 2023");
        setDescription(
          data.description ||
            "TechSprint, a technical carnival aimed at enriching the curiosity, creativity, and scientific attitude among students from Class 5 to 12. It provided an excellent platform to the young minds to explore the exciting world of technology, engage in hands-on technical events, and showcase their skills in the amazing competitions that were organized. The event inspired students to think outside the box, develop problem-solving abilities, and embrace the digital future."
        );
      } catch (error) {
        console.error("Error fetching about us data:", error.message);
        alert("Error fetching About Us data");
      }
    };

    fetchAboutUsData();
  }, []);

  return (
    <>
      <div
        className="w-full min-h-screen bg-center bg-cover bg-black"
        style={{ backgroundImage: `url(${aboutbg})` }}
      >
        <Navbar />
        <div className=" flex flex-col justify-center items-center bg-black bg-opacity-35 px-4 py-8">
          <p className="rounded-xl bg-black p-3 mb-8 bg-opacity-40 font-avenger text-red-600 text-3xl gap-3 text-center">
            {/* Added margin-bottom, centered text */}
            {title}
          </p>
          <p className="about-text-container text-slate-300 border-red-600 border rounded-lg bg-black p-5 hover:bg-opacity-100 bg-opacity-50 text-2xl text-justify leading-relaxed font-avenger tracking-widest w-full md:w-3/4 mb-8">
            {/* Added margin-bottom, responsive width */}
            {description}
          </p>
          {/* WelcomeComponent moved outside */}
          <div className="flex flex-wrap w-full justify-center items-center mt-4 lg:mt-0 gap-4">
            {videos.map((videoId) => (
              <div
                key={videoId} // Key should be on the outer div
                className="rounded-xl hero-img glowing-border h-auto w-fit"
              >
                <YouTubePlayer key={videoId} id={videoId} />
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default About;
