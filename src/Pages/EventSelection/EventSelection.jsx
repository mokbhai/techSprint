import React from "react";

const EventSelection = ({
  events,
  selectedEvents,
  handleEventSelection,
  team,
  category, // sr or jr same is avalable in event event.category. if (category == sr) then keep sr events only else jr one. if category is empty then provide all events
}) => {
const getFilteredEvents = (day, shift) => {
    return events.filter((event) => {
      const isCorrectDay = event.day === day;
      const isCorrectShift = event.shift === shift;
      const isCorrectCategory = !category || event.category === category; // Category filter
      return isCorrectDay && isCorrectShift && isCorrectCategory;
    });
  };


  return (
    <div className=" flex flex-col border p-4">
      <h2 className="text-2xl  mb-4 text-center">Select Events</h2>

      <div className="grid  lg:grid-cols-2 gap-4 text-center">
        {["day1Morning", "day1Evening", "day2Morning", "day2Evening"].map(
          (session) => (
            <div
              key={session}
              className=" mb-4 border bg-yellow-700 text-black rounded opacity-80"
            >
              <h3 className="text-lg font-semibold capitalize">
                {session.replace(/([A-Z])/g, " $1")}
              </h3>
              <select
                value={selectedEvents[session] || ""}
                onChange={(e) => {
                  handleEventSelection(e.target.value, session);
                }}
                className="w-full h-12 border text-black rounded-lg py-2 px-3 bg-slate-400"
              >
                <option value="">None</option>
                {getFilteredEvents(
                  session.startsWith("day1") ? 1 : 2,
                  session.endsWith("Morning") ? "Morning" : "Evening"
                ).map((event) => (
                  <option className="" key={event._id} value={event._id}>
                    {event?.eventName} {event?.session?.toTitleCase()}
                  </option>
                ))}
              </select>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default EventSelection;
