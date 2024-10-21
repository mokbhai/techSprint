import React from "react";

const Summary = ({
  selectedEvents,
  events,
  totalAccommodationFee,
  teamDetails,
}) => {
  const calculateTotalCharge = () => {
    const selectedEventCharges = Object.values(selectedEvents).reduce(
      (total, eventId) => {
        const event = events.find((event) => event._id === eventId);
        return event
          ? total + parseInt(event.registrationCharge.amount || 0, 10)
          : total;
      },
      0
    );
    return selectedEventCharges + totalAccommodationFee;
  };

  return (
    <div className=" p-2 px-8  border w-full h-full">
      <h2 className="text-2xl font-bold mb-4 text-center">Summary</h2>
      <div className="w-full">
        <div className="">
          {Object.entries(selectedEvents).map(([category, eventId]) => {
            const event = events.find((event) => event._id === eventId);
            return event ? (
              <div
                className=" flex mt-2 text-slate-400 text-bold text-lg   "
                key={category}
              >
                <div className="w-1/3">
                  {event.eventName.toTitleCase()}{" "}
                  {event.category.toTitleCase()}
                </div>

                <div className="w-1/3 text-center">
                  {category?.replace(/([A-Z])/g, " $1").toTitleCase()}
                </div>
                <div className="w-1/3 text-end">
                  ₹{event?.registrationCharge?.amount}
                </div>
              </div>
            ) : null;
          })}
          <div className="flex justify-between  mt-8">
            <div>Total Accommodation Fee:</div>
            <div>{}</div>
            <div>₹{totalAccommodationFee}</div>
          </div>

          <div className="flex justify-between  font-bold text-lg text-blue-600">
            <div>Total Fee:</div>
            <div>₹{calculateTotalCharge()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
