import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import URL from "../../../src/apiconfig";
import { EventsContext } from "../../../src/Components/EventsContext";
import Navbar from "../../Components/Navbar/Navbar";
import eventbg from "../../Assets/eventbg.jpg";
import "./Eventpage.css";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { useAlert } from "../../AlertContext";
import LoadingCircle from "../../Components/lodingCircle";

const EventPage = () => {
  const { id: eventId } = useParams();
  const navigate = useNavigate();
  const { events, loading } = useContext(EventsContext);
  const [event, setEvent] = useState(null);
  const [showMoreEligibilities, setShowMoreEligibilities] = useState(false);
  const [showMoreRules, setShowMoreRules] = useState(false);
  const alert = useAlert();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${URL}/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
        alert("Error fetching event");
      }
    };

    const foundEvent = events.find(
      (event) => event?._id == eventId || event?.id == eventId
    );

    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      // fetchEvent();
    }
    console.log(event);
  }, [eventId, events]);

  const handleApplyNow = () => {
    navigate("/Registration", { state: { event } });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: event?.eventName,
          text: event?.description,
          url: window.location.href,
        })
        .then(() => alert("Shared successfully", "success"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      const link = window.location.href;
      navigator.clipboard
        .writeText(link)
        .then(() => {
          alert("Link copied to clipboard. Ready to share!");
        })
        .catch((error) => console.error("Error copying link:", error));
    }
  };

  if (loading) return <LoadingCircle />;

  if (!event) return <p>Event not found or failed to load.</p>;

  const download = (ruleId) => {
    try {
      window.open(`${URL}/api/file/view/${ruleId}`, "_blank");
    } catch (error) {
      console.error("Error downloading document:", error);
    }
    // window.open(`http://localhost:4000/uploads/1729056464895-850672757.pdf`, "_blank");
  };

  const getPhotoUrl = (photo) => {
    return photo?._id
      ? `${URL}/api/file/view/${photo._id}`
      : `${URL}/api/file/view/${photo}`;
  };

  return (
    <>
      <div
        className="bg-cover bg-center bg-fixed bg-black text-slate-300 opacity-80"
        style={{ backgroundImage: `url(${eventbg})` }}
      >
        <div className="w-full h-full bg-gradient-to-r overflow-hidden from-slate-900 to-black bg-opacity-95">
          <Navbar />
          <div className="container mx-auto px-4 py-8 lg:py-16">
            {/* Main Container */}
            <div className="px-4 flex flex-col lg:flex-col gap-8 rounded-xl border-2 border-blue-600 shadow relative">
              {/* Event Title */}
              <h2 className="gradient-text font-avenger text-center lg:text-left tracking-widest underline text-4xl sm:text-5xl md:text-6xl lg:text-7xl py-5">
                {event?.eventName?.toTitleCase()}
              </h2>
              <div className="flex flex-col lg:flex-row ">
                {/* Added "relative" here */}

                {/* Left Column: Text Content */}
                <div className="lg:w-1/2 flex flex-col justify-center items-center px-4 py-8 lg:py-0">
                  <div className="text-center lg:text-left rounded-xl flex flex-col items-center lg:items-start bg-transparent text-slate-300">
                    {/* Event Type & Description */}
                    <div className="flex flex-col items-center lg:items-start w-full mb-8 lg:mb-16">
                      <div className="flex-col">
                        <p className="font-avenger tracking-widest text-yellow-500 text-xl sm:text-2xl ">
                          Description:
                        </p>
                        <p className="text-justify text-lg sm:text-xl">
                          {event?.description}
                        </p>
                      </div>
                    </div>

                    {/* Eligibilities & Rules */}
                    <div className="w-full flex flex-col gap-7 mb-8 lg:mb-16">
                      <div className="flex flex-col justify-center gap-3  w-full">
                        <p className="font-avenger tracking-widest text-yellow-500 text-xl sm:text-2xl ">
                          Eligibilities:
                        </p>
                        <ul className="list-outside list-disc text-lg sm:text-xl text-start w-full">
                          {event?.eligibilities &&
                            event?.eligibilities
                              ?.slice(
                                0,
                                showMoreEligibilities
                                  ? event?.eligibilities?.length
                                  : 2
                              )
                              ?.map((rule, index) => (
                                <li key={index}>{rule}</li>
                              ))}
                        </ul>
                        {event?.eligibilities &&
                          event?.eligibilities?.length > 2 && (
                            <button
                              className="text-yellow-500 font-bold text-sm"
                              onClick={() =>
                                setShowMoreEligibilities(!showMoreEligibilities)
                              }
                            >
                              {showMoreEligibilities
                                ? "Read Less"
                                : "Read More"}
                            </button>
                          )}

                        <p className="font-avenger tracking-widest text-yellow-500 text-xl sm:text-2xl ">
                          Rules:
                        </p>
                        <ul className="list-outside list-disc text-lg sm:text-xl text-start tracking-wider w-full">
                          {event?.rules &&
                            event?.rules
                              ?.slice(
                                0,
                                showMoreRules ? event?.rules?.length : 2
                              )
                              ?.map((rule, index) => (
                                <li key={index}>{rule}</li>
                              ))}
                        </ul>
                        {event?.rules && event?.rules?.length > 2 && (
                          <button
                            className="text-yellow-500 font-bold text-sm"
                            onClick={() => setShowMoreRules(!showMoreRules)}
                          >
                            {showMoreRules ? "Read Less" : "Read More"}
                          </button>
                        )}
                      </div>
                      {/* Download Buttons */}

                      <div className="flex flex-col sm:flex-row justify-evenly items-center gap-3 w-full">
                        <p className="">For more Infomation:</p>
                        {event?.ruleBook && (
                          <div>
                            <button
                              className="bg-blue-700 hover:text-yellow-500 hover:space-x-105 text-slate-300 font-avenger tracking-widest text-sm sm:text-base md:text-lg  py-2 px-4 rounded-full"
                              onClick={() => download(event?.ruleBook)}
                            >
                              Download Rule Book
                            </button>
                          </div>
                        )}

                        {event?.brochure && (
                          <button
                            className="w-fit bg-blue-700 hover:text-yellow-500 hover:space-x-105 text-slate-300 font-avenger tracking-widest text-sm sm:text-base md:text-lg  py-2 px-4 rounded-full"
                            onClick={() => download(event?.brochure)}
                          >
                            Download Brochure
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Photos & Details */}
                <div className="lg:w-1/2 flex flex-col justify-between p-5">
                  {/* Share Button (Absolutely Positioned) */}
                  <button
                    className="absolute top-5 right-5 bg-blue-700 hover:text-yellow-500 hover:space-x-105 h-fit text-slate-300 py-2 px-2 font-avengerd font-semibold rounded border-2 border-blue-950 z-10"
                    onClick={handleShare}
                  >
                    Share
                  </button>

                  {/* Photos (Responsive Grid) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {event?.photos &&
                      event?.photos?.length > 0 &&
                      event?.photos?.map((photo) => (
                        <img
                          className="w-full h-auto rounded-xl"
                          key={photo?._id}
                          src={
                            photo?.file
                              ? `${photo?.file}`
                              : `${URL}/api/file/view/${photo}`
                          }
                          alt="Event"
                        />
                      ))}
                  </div>

                  {/* Event Details */}
                  <div className="mt-2 text-center lg:text-left">
                    {/* Location */}
                    {/* <div className="mb-3">
                      <p className="font-avenger tracking-widest text-yellow-500 text-xl sm:text-2xl ">
                        Location:
                      </p>
                      <p className=" text-lg sm:text-xl">
                        {event?.location?.landmark && event?.location?.landmark},{" "}
                        {event?.location?.city && event?.location?.city},{" "}
                        {event?.location?.state && event?.location?.state},{" "}
                        {event?.location?.country && event?.location?.country}
                      </p>
                    </div> */}

                    {/* Day & Shift */}
                    <div className="flex flex-col md:flex-row justify-around mb-3">
                      <div className="mr-3 flex flex-row">
                        <p className="font-avenger tracking-widest text-yellow-500 text-xl sm:text-2xl mr-2">
                          Day:
                        </p>
                        <p className="text-lg sm:text-xl">{event?.day}</p>
                      </div>
                      <div className="mr-3 flex flex-row">
                        <p className="font-avenger tracking-widest text-yellow-500 text-xl sm:text-2xl mr-2">
                          Shift:
                        </p>
                        <p className=" text-lg sm:text-xl">{event?.shift}</p>
                      </div>
                    </div>

                    {/* Registration Charge */}
                    <div className="mb-3 flex flex-row gap-2">
                      <p className="font-avenger tracking-widest text-yellow-500 text-xl sm:text-2xl ">
                        Registration Charge:
                      </p>
                      <p className=" text-lg sm:text-xl">
                        {event?.registrationCharge?.currency}{" "}
                        {event?.registrationCharge?.amount}
                      </p>
                    </div>

                    {/* Organizer */}
                    {/* <div className="mb-3 flex flex-row gap-2">
                      <p className="font-avenger tracking-widest text-yellow-500 text-xl sm:text-2xl ">
                        Organiser:
                      </p>
                      <p className=" text-lg sm:text-xl">
                        {event?.organiserName}
                      </p>
                    </div> */}

                    {/* Contact */}
                    <div className=" flex flex-col mb-5 ">
                      <h4 className="font-avenger tracking-widest text-yellow-500 text-xl sm:text-2xl ">
                        Contact:
                      </h4>
                      {event?.contacts &&
                        event?.contacts?.map((contact, index) => (
                          <div
                            key={index}
                            className="flex flex-col text-lg sm:text-xl gap-2"
                          >
                            <p>
                              {contact?.name} {contact?.phone}
                            </p>
                          </div>
                        ))}
                    </div>

                    {/* Apply Now Button */}
                    <div className="w-full flex justify-center mt-5">
                      <button
                        className="w-full sm:w-1/2 hero text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-300 font-extrabold tracking-widest hover:text-yellow-400 hover:bg-blue-700 bg-blue-600 py-2 px-4 font-avenger rounded-full border-2 border-blue-950"
                        onClick={handleApplyNow}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
                {/* End of Right Column */}
              </div>
            </div>
            {/* End of Main Container */}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default EventPage;
