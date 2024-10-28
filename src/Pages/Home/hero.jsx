import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import trophy from "../../Assets/trophy.avif";
import heroBG from "../../Assets/logo5.jpg";
import Logo from "../../Components/Logo";

const HeroComp = () => {
  const eventSection = () => {
    const eventSection = document.getElementById("eventSection");
    if (eventSection) {
      eventSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col lg:h-screen rounded-xl m-3 mt-0 shadow bg-gradient-to-r overflow-hidden from-slate-900 to-black">
      <Navbar />

      <div className="opacity-80 h-full flex flex-col lg:flex-row">
        {/* Text Content */}
        <div className="justify-center lg:w-1/2 rounded-xl px-4 py-4 sm:pt-4 sm:pb-0 lg:py-0 bg-transparent text-slate-300 text-center lg:text-left flex flex-col items-center lg:items-start">
          <div className="h-auto flex flex-col items-center w-full lg:mb-16">
            <div className="items-center justify-around lg:items-start font-avenger flex flex-col flex-wrap">
              <span className="flex flex-row pt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-tl lg:bg-gradient-to-r from-yellow-400 to-blue-400 text-transparent bg-clip-text">
                TECHSPRINT 2024
              </span>
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-avenger ">
                SEASON 2
              </span>
              <span className="uppercase font-avengerd font-bold text-sm md:text-lg lg:text-xl w-max mt-4 p-2 bg-slate-300 text-black lg:tracking-widest rounded-xl">
                LPU's all india interschool tech comptition
              </span>
              <span className="uppercase text-lg sm:text-xl md:text-2xl lg:text-2xl font-avenger my-4">
                IN ASSOCIATION WITH Delhi Public School, Jalandhar
              </span>
              <div className="space-y-4">
                <div className="uppercase font-bold text-base sm:text-lg md:text-xl my-2">
                  Event Date: 19th and 20th NOVEMBER
                </div>
                <p className="text-sm sm:text-base md:text-lg font-bold my-2">
                  NOW ACCEPTING ONLINE REGISTRATION
                </p>
                <p className="font-avenger text-xs sm:text-sm md:text-base lg:text-lg text-sky-500 uppercase">
                  Ready to Innovate? Your Tech Journey Starts Here!
                </p>
                <div className="flex flex-col sm:flex-row sm:space-x-5 bg-gradient-to-tl lg:bg-gradient-to-r from-yellow-400 to-blue-400 text-transparent bg-clip-text">
                  <button
                    className="shadow-lg shadow-slate-400 text-lg sm:text-xl md:text-2xl font-semibold text-center p-1 sm:p-2 rounded-xl 
                    hover:scale-x-105 hover:text-yellow-600 hover:shadow-blue-600 mt-2 sm:mt-4 border px-3 sm:px-5 
                    tracking-widest font-avenger"
                    onClick={eventSection}
                  >
                    Explore Events
                  </button>
                  <button
                    className="shadow-lg shadow-slate-400 text-lg sm:text-xl md:text-2xl font-semibold text-center p-1 sm:p-2 rounded-xl 
                    hover:scale-x-105 hover:text-yellow-600 hover:shadow-blue-600 mt-2 sm:mt-4 border px-3 sm:px-5 
                    tracking-widest font-avenger"
                    onClick={() => {
                      window.location.href = "/Registration";
                    }}
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center h-full p-4 sm:p-8">
          <img
            className="rounded-xl w-full sm:w-3/4 shadow-lg shadow-blue-400 hover:shadow-yellow-600"
            src={heroBG}
            alt="Hero Background"
          />
        </div>
      </div>

      {/* Information Section */}
      <div className="opacity-80 flex flex-col sm:flex-row text-sm sm:text-base bg-gray-400 text-black rounded-b-xl text-center justify-evenly gap-3 p-3 sm:p-5 w-full">
        <div className="mb-2 sm:mb-0">
          <p className="text-blue-800 font-bold text-lg sm:text-xl">
            LAST DATE TO REGISTER
          </p>
          <p className="rounded-xl font-bold">15th NOVEMBER 2024</p>
        </div>
        <div className="hidden sm:block">
          <p className="text-blue-800 font-bold text-lg sm:text-xl">
            EVENT COMPRISES OF
          </p>
          <p className="rounded-xl font-bold">
            TECHNICAL AND NON-TECHNICAL COMPETITION
          </p>
        </div>
        <div>
          <p className="text-blue-800 font-bold text-lg sm:text-xl">VENUE</p>
          <p className="uppercase rounded-xl font-bold">
            LOVELY PROFESSIONAL UNIVERSITY, Punjab
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroComp;
