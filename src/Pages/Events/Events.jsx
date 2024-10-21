import React, { useContext } from "react";
import { EventsContext } from "../../../src/Components/EventsContext";
import "./Events.css";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import EventCard from "../../Components/EventCard/EventCard";
import TeamDetails from "../../Components/TeamDetails/TeamDetails";
import Logo from "../../Components/Logo";
import LoadingCircle from "../../Components/lodingCircle";

const Events = () => {
  const { events, loading } = useContext(EventsContext);

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
    <>
      <div
        className="bg-cover bg-center bg-gradient-to-l overflow-hidden from-slate-900 to-black  min-h-screen text-slate-400"
        // style={{backgroundImage: `url(${eventbg})`}}
      >
        <Navbar />
        <div className="pt-7 pb-7  w-full h-full">
          <div className=" flex flex-col   ">
            <div className="flex justify-center">
              <Logo />
            </div>
            {loading ? (
              <LoadingCircle />
            ) : (
              <div>
                <h2 className="sm:text-2xl md:text-2xl lg:text-3xl font-avenger text-center p-4 sm:p-8">
                  Events for Seniors (8th to 12th Class)
                </h2>

                <div className="flex flex-wrap justify-center gap-8">
                  {srEvents.map((event, index) => (
                    <EventCard key={index} event={event} />
                  ))}
                </div>

                <h2 className="sm:text-2xl md:text-2xl lg:text-3xl font-avenger text-center p-4 sm:p-8">
                  Events for Juniors (5th to 7th Class)
                </h2>
                <div className="flex flex-wrap justify-center gap-8">
                  {jrEvents.map((event, index) => (
                    <EventCard key={index} event={event} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Events;
