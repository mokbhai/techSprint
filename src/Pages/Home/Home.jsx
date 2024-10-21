import React, { useContext } from "react";
import { EventsContext } from "../../../src/Components/EventsContext";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import EventCard from "../../Components/EventCard/EventCard";
import LoadingCircle from "../../Components/lodingCircle";
import HeroComp from "./hero";
import CompetitionComponent, { MobileCompetitionSchedule } from "./comptition";
import ironman from "../../Assets/ironman.png";
import ironmanr from "../../Assets/ironmanr.png";
import WelcomeComponent from "./welcome";
import circleForRotation from "../../Assets/circleForRotation.png";
import trophy from "../../Assets/trophy.avif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";
import { hover } from "@testing-library/user-event/dist/hover";

const Home = () => {
  const { events, loading } = useContext(EventsContext);

  // const uniqueEvents = [];
  const jrEvents = [];
  const srEvents = [];

  if (!loading) {
    for (const event of events) {
      if (event.category == "sr") {
        srEvents.push(event);
      } else {
        jrEvents.push(event);
      }
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-center bg-black bg-cover text-slate-400">
      <div className="flex flex-col gap-3">
        {/* Hero Section */}
        <HeroComp />

        {/* Competitions Section */}
        <div className="hidden lg:block">
          <CompetitionComponent />
        </div>
        {/* Competitions Section */}
        <div className="lg:hidden sm:block">
          <MobileCompetitionSchedule />
        </div>
        {/* Events Section */}
        <div
          id="eventSection"
          className=" border rounded-xl shadow overflow-hidden bg-gradient-to-r from-slate-900 to-black p-4 sm:p-8 m-3"
        >
          <div>
            <p className="text-3xl sm:text-5xl md:text-5xl lg:text-7xl font-avenger text-center p-4 sm:p-8">
              Events
            </p>
          </div>
          {loading ? (
            <div className="flex flex-wrap justify-center gap-8 sm:gap-0">
              <LoadingCircle />
            </div>
          ) : (
            <div>
              <p className="text-lg sm:text-lg md:text-lg lg:text-3xl font-avenger text-center p-4 sm:p-8">
                Events for Seniors (8th to 12th Class)
              </p>

              <div className="flex flex-wrap justify-center gap-8 sm:gap-0">
                {srEvents.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
              </div>

              <h2 className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-avenger text-center p-4 sm:p-8">
                Events for Juniors (5th to 7th Class)
              </h2>
              <div className="flex flex-wrap justify-center gap-8 sm:gap-0">
                {jrEvents.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Welcome Section */}
        <div className="m-3 border p-5 flex flex-col h-auto shadow rounded-xl overflow-hidden bg-gradient-to-l from-black to-slate-900">
          <WelcomeComponent />
        </div>

        <Footer glowingBorder={false} />
      </div>
      <div className="animate-bounce hover:motion-safe:animate-none fixed m-5 bottom-0 right-4 flex flex-wrap ">
        <button
          className="shadow-lg shadow-yellow-500  hover:shadow-blue-400 hover:scale-x-105 hover:bg-black 
          tracking-widest font-avenger text-yellow-500 hover:text-slate-400 text-xl sm:text-2xl md:text-3xl text-center 
          rounded-xl  border relative group p-1 sm:p-2  mt-2 sm:mt-4 px-3 sm:px-5"
          onClick={() => {
            window.location.href = "/contact";
          }}
          style={{ hover: "smooth" }}
        >
          <FontAwesomeIcon icon={faPhone} className="mr-2" />
          <span className="hidden group-hover:block ">CONTACT US</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
