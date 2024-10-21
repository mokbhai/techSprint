import React, { useContext } from "react";
import "./RevolvingPhotos.css";
import { EventsContext } from "../EventsContext";
import URL from "../../apiconfig";
import LoadingCircle from "../lodingCircle"; 

const RevolvingPhotos = () => {
  const { events, loading } = useContext(EventsContext);

  if (loading) {
    return <LoadingCircle />;
  }

  if (!events || events.length === 0) {
    return <div>No events found.</div>;
  }

  return (
    <div className="w-1/2 flex justify-center items-center relative">
      {" "}
      {/* Added relative positioning */}
      <div className="box">
        {events.map((event, index) => {
          let imageUrl;

          if (event.photos && event.photos[0]) {
            // Check if photos array exists and has elements
            imageUrl = event.photos[0].file
              ? `${event.photos[0].file}`
              : `${URL}/api/file/view/${event.photos[0]}`;
          } else {
            imageUrl = "https://wallpapercave.com/wp/wp3842313.jpg";
          }

          return (
            <span key={event._id || index} style={{ "--i": index + 1 }}>
              <img
                src={imageUrl}
                alt={`${event.eventName}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://wallpapercave.com/wp/wp3842313.jpg";
                }}
              />
              <div className="event-name absolute text-center bottom-0 left-0 w-full bg-black bg-opacity-50 text-slate-300 p-2">
                {event.eventName}
              </div>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default RevolvingPhotos;
