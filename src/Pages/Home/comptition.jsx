import React from "react";
import RevolvingPhotos from "../../Components/RevolvingPhotos/RevolvingPhotos";

const CompetitionSchedule = () => {
  const sortEvents = (events) => {
    return [...events].sort((a, b) => {
      const aIsSenior = a[1] === "Senior";
      const bIsSenior = b[1] === "Senior";
      if (aIsSenior && !bIsSenior) return -1; // Senior first
      if (!aIsSenior && bIsSenior) return 1; // Junior second
      return 0; // Maintain original order if both are the same
    });
  };

  // const bgGrad =
  //   "bg-gradient-to-r border-2 from-yellow-400 to-red-800 text-center font-extrabold text-black bg-opacity-80";
  // const bgGrad = "bg-gray-800 border-2 text-center font-extrabold text-red-600";
  const bgGrad =
    "text-xl sm:text-2xl font-avenger text-center border-b rounded-3xl p-2 sm:p-3 text-yellow-600 opacity-90";

  const morningEvents = sortEvents([
    ["Innovation Marathon", "Senior", "Speed X BGMI", "Senior"],
    ["Idea Pitch Contest", "Junior", "Water Rocket Challenge", "Junior"],
    ["Codecraft AI", "Junior", "Digital Art Competition", "Junior"],
    ["Water Rocket Challenge", "Senior", "Structural Showdown", "Senior"],
    ["Tech Tustle", "Senior", "Math & Science Puzzle", "Junior"],
    ["Speed X Free Fire", "Junior", "", ""],
  ]);

  const afternoonEvents = sortEvents([
    ["Idea Pitch Contest", "Senior", "Design X", "Senior"],
    ["Innovation Marathon", "Junior", "", ""],
    ["RC-Xtreme", "Senior", "Codecraft AI", "Senior"],
  ]);

  return (
    <div className=" border rounded-xl shadow overflow-hidden bg-gradient-to-l from-slate-900 to-black p-2 sm:p-8 m-3 font-avenger uppercase text-slate-400">
      <h1 className="p-5 sm:text-5xl md:text-5xl lg:text-7xl font-avenger text-center ">
        Competitions SCHEDULE
      </h1>
      <div className="flex flex-col lg:flex-row justify-center items-center h-full">
        <div className="w-fit lg:w-1/2 h-full p-4 sm:p-2 flex flex-col items-center justify-evenly">
          <div className="border rounded-xl overflow-hidden tracking-widest">
            <table className=" uppercase p-0 text-md w-fit tracking-widest h-full">
              <thead>
                <tr className={bgGrad}>
                  <th className="p-3" colSpan="2">
                    Day 1
                  </th>
                  <th className="border-l-4 p-3 border-slate-400" colSpan="2">
                    Day 2
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr className={bgGrad}>
                  <th className="p-2 bg-gray-800" colSpan="2">
                    Session 1.1
                  </th>
                  <th
                    className="p-2 bg-gray-800 border-l-4 border-slate-400"
                    colSpan="2"
                  >
                    Session 2.1
                  </th>
                </tr>
                {morningEvents.map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-black" : "bg-gray-800"}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`uppercase p-3 font-semibold ${
                          cellIndex === 2 ? "border-l-4 border-slate-400" : ""
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tbody className="border-t">
                <tr className={bgGrad}>
                  <th className="p-2 bg-gray-800" colSpan="2">
                    Session 1.2
                  </th>
                  <th
                    className="p-2 bg-gray-800 border-l-4 border-slate-400"
                    colSpan="2"
                  >
                    Session 2.2
                  </th>
                </tr>
                {afternoonEvents.map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-black" : "bg-gray-800"}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`p-3 uppercase font-semibold ${
                          cellIndex === 2 ? "border-l-4 border-slate-400" : ""
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="sm:m-t-14 mb-16 lg:mb-0 flex md:flex lg:flex-wrap gap-3 w-full md:w-1/2 items-center justify-evenly p-4 md:p-8">
          <RevolvingPhotos />
        </div>
      </div>
      {/* <div className="flex flex-col p-5 text-center">
        <span className="text-2xl">
          Session 1.1 timing 12th NOVEMBER 9:00am - 12:00pm
        </span>
        <span className="text-2xl">
          Session 1.2 timing 12th NOVEMBER 12:20pm - 3:30pm
        </span>
        <span className="text-2xl">
          Session 2.1 timing 13th NOVEMBER 9:00am - 12:00pm
        </span>
        <span className="text-2xl">
          Session 2.2 timing 13th NOVEMBER 12:20pm - 3:30pm
        </span>
      </div> */}
    </div>
  );
};

export const MobileCompetitionSchedule = () => {
  const sortEvents = (events) => {
    return [...events].sort((a, b) => {
      const aIsSenior = a[1] === "Senior";
      const bIsSenior = b[1] === "Senior";
      if (aIsSenior && !bIsSenior) return -1; // Senior first
      if (!aIsSenior && bIsSenior) return 1; // Junior second
      return 0; // Maintain original order if both are the same
    });
  };

  const bgGrad =
    "text-xl sm:text-2xl font-avenger text-center border-b rounded-3xl p-2 sm:p-3 text-yellow-600 opacity-80";

  const morningEvents = sortEvents([
    ["Innovation Marathon", "Senior", "Speed X BGMI", "Senior"],
    ["Idea Pitch Contest", "Junior", "Water Rocket Challenge", "Junior"],
    ["Codecraft AI", "Junior", "Digital Art Competition", "Junior"],
    ["Water Rocket Challenge", "Senior", "Structural Showdown", "Senior"],
    ["Tech Hustle", "Senior", "Math & Science Puzzle", "Junior"],
    ["Speed X Free Fire", "Junior", "", ""],
  ]).map((event) => [event[0], event[2]]);

  const afternoonEvents = sortEvents([
    ["Idea Pitch Contest", "Senior", "Design X", "Senior"],
    ["Innovation Marathon", "Junior", "", ""],
    ["RC-Xtreme", "Senior", "Codecraft AI", "Senior"],
  ]).map((event) => [event[0], event[2]]);

  return (
    <div className="text-slate-500 font-avenger uppercase lg:h-screen m-3 border rounded-xl shadow overflow-hidden bg-gradient-to-r from-black to-slate-900">
      <div className="flex flex-col lg:flex-row justify-center items-center h-full">
        <div className="w-fit lg:w-1/2 h-full p-4 sm:p-2 flex flex-col items-center justify-evenly">
          <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-7xl font-avenger text-center mb-3 text-slate-300">
            Competitions SCHEDULE
          </h1>
          <div className="border rounded-xl overflow-hidden tracking-widest">
            <table className=" uppercase p-0 text-md w-fit tracking-widest h-full">
              <thead>
                <tr className={bgGrad}>
                  <th className="p-3" colSpan="1">
                    Day 1
                  </th>
                  <th className="border-l-4 p-3 border-slate-400" colSpan="1">
                    Day 2
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className={bgGrad}>
                  <th className="p-2 bg-gray-800" colSpan="1">
                    Session 1.1
                  </th>
                  <th
                    className="p-2 bg-gray-800 border-l-4 border-slate-400"
                    colSpan="1"
                  >
                    Session 1.2
                  </th>
                </tr>
                {morningEvents.map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-black" : "bg-gray-800"}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`uppercase p-3 font-semibold ${
                          cellIndex === 1 ? "border-l-4 border-slate-400" : ""
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tbody className="border-t">
                <tr className={bgGrad}>
                  <th className="p-2 bg-gray-800" colSpan="1">
                    Session 2.1
                  </th>
                  <th
                    className="p-2 bg-gray-800 border-l-4 border-slate-400"
                    colSpan="1"
                  >
                    Session .2
                  </th>
                </tr>
                {afternoonEvents.map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-black" : "bg-gray-800"}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`p-3 uppercase font-semibold ${
                          cellIndex === 1 ? "border-l-4 border-slate-400" : ""
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="hidden lg:block mb-16 lg:mb-0 md:flex lg:flex-wrap gap-3 w-full md:w-1/2 items-center justify-evenly p-4 md:p-8 ">
          <RevolvingPhotos />
        </div>
      </div>
    </div>
  );
};

export default CompetitionSchedule;
