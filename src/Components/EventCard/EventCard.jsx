import React from "react";
import "./EventCard.css";
import { useNavigate } from "react-router-dom";
import URL from "../../apiconfig";

const DevEventCard = ({ event, onClick }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (!onClick) {
      navigate(`/event/${event._id}`);
    } else {
      onClick(event._id);
    }
  };

  let backgroundImageUrl;

  if (event.photos && event.photos[0]) {
    backgroundImageUrl = event.photos[0]?.file
      ? `url(${event.photos[0]?.file})`
      : `url(${URL}/api/file/view/${event.photos[0]})`;
  } else backgroundImageUrl = "https://wallpapercave.com/wp/wp3842313.jpg";

  // backgroundImageUrl = `url(${event.photos[0]?.file})`;

  let charImageUrl;
  if (event.avengerCharacter) {
    charImageUrl = event.avengerCharacter?.file
      ? `${event.avengerCharacter?.file}`
      : `${URL}/api/file/view/${event.avengerCharacter}`;
  } else charImageUrl = "https://wallpapercave.com/wp/wp3842313.jpg";

  return (
    <div className="flip-card tracking-wider" onClick={handleCardClick}>
      <div
        className="flip-card-front text-center "
        style={{ backgroundImage: backgroundImageUrl, borderRadius: "4px" }}
      >
        <div className="inner flex flex-col justify-between">
          <div className="p-5 w-24">
            <img src={charImageUrl} className="fly-animation" alt="Event" />
          </div>
          {/* <div
            className="font-avenger text-red-600 rounded-xl bg-black bg-opacity-20 text-4xl"
            style={{
              textShadow:
                "2px 2px 0 #000, 2px 2px 0 #000, 2px 2px 0 #000, 2px 2px 0 #000",
            }}
          >
            <h3>{event.eventName}</h3>
          </div> */}
          <div className="bg-black text-slate-400 rounded-t-xl rounded-r-xl p-5 bg-opacity-55">
            <div
              className="font-normal font-avenger text-3xl "
              style={{
                textShadow:
                  "2px 2px 0 #000, 2px 2px 0 #000, 2px 2px 0 #000, 2px 2px 0 #000",
              }}
            >
              <p>{event.eventName?.toTitleCase()}</p>
            </div>
            {/* <p>Day: {event.day}</p>
            <p>Shift: {event.shift}</p> */}
          </div>
        </div>
      </div>
      <div
        className="flip-card-back text-center "
        style={{ backgroundImage: backgroundImageUrl, borderRadius: "4px" }}
      >
        <div className="inner h-full overflow-hidden flex flex-col justify-between p-1">
          <div className="p-2 w-20">
            <img src={charImageUrl} className="fly-animation" alt="Event" />
          </div>

          <div className="text-yellow-500 w-full m-auto font-avenger tracking-widest text-xl bg-black bg-opacity-55 rounded-xl p-2 ">
            <p className="">Click to view details</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MobileEventCard = ({ event, onClick }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (!onClick) {
      navigate(`/event/${event._id}`);
    } else {
      onClick(event._id);
    }
  };

  let backgroundImageUrl;

  if (event.photos && event.photos[0]) {
    backgroundImageUrl = event.photos[0]?.file
      ? `url(${event.photos[0]?.file})`
      : `url(${URL}/api/file/view/${event.photos[0]})`;
  } else {
    backgroundImageUrl = "https://wallpapercave.com/wp/wp3842313.jpg";
  }

  let charImageUrl;
  if (event.avengerCharacter) {
    charImageUrl = event.avengerCharacter?.file
      ? `${event.avengerCharacter?.file}`
      : `${URL}/api/file/view/${event.avengerCharacter}`;
  } else {
    charImageUrl = "https://wallpapercave.com/wp/wp3842313.jpg";
  }

  return (
    <div
      className="flex flex-wrap flip-card tracking-wider"
      onClick={handleCardClick}
    >
      <div
        className="flip-card-front text-center"
        style={{
          backgroundImage: backgroundImageUrl,
          borderRadius: "4px",
          height: "250px", // Reduced height
          width: "180px", // Reduced width
        }}
      >
        <div className="inner flex flex-col justify-between">
          <div className="p-2 w-16">
            {" "}
            {/* Reduced width for character image */}
            <img src={charImageUrl} className="fly-animation" alt="Event" />
          </div>
          <div className="bg-black text-slate-400 rounded-t-xl rounded-r-xl p-2 bg-opacity-55">
            <div
              className="font-normal font-avenger text-xl" // Reduced font size
              style={{
                textShadow:
                  "2px 2px 0 #000, 2px 2px 0 #000, 2px 2px 0 #000, 2px 2px 0 #000",
              }}
            >
              <p>{event.eventName.toTitleCase()}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flip-card-back text-center"
        style={{
          backgroundImage: backgroundImageUrl,
          borderRadius: "4px",
          height: "250px", // Reduced height
          width: "180px", // Reduced width
        }}
      >
        <div className="inner h-full overflow-hidden flex flex-col justify-between p-1">
          <div className="p-1 w-16">
            {" "}
            {/* Reduced width for character image */}
            <img src={charImageUrl} className="fly-animation" alt="Event" />
          </div>
          <div className="text-red-600 w-full m-auto font-avenger tracking-widest text-lg bg-black bg-opacity-55 rounded-xl p-1">
            {" "}
            {/* Reduced font size */}
            <p>Click to view details</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventCard = ({ event, onClick }) => {
  return (
    <div>
      <div className="block sm:hidden">
        <MobileEventCard event={event} onClick={onClick} />
      </div>
      <div className="hidden sm:block">
        <DevEventCard event={event} onClick={onClick} />
      </div>
    </div>
  );
};

export default EventCard;
