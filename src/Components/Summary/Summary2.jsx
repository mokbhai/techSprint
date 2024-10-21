// Summary.jsx (modified for single event)
import React from "react";

const Summary = ({ selectedEvent, totalAccommodationFee, teamDetails }) => {
  const calculateTotalCharge = () => {
    const eventCharge = selectedEvent
      ? parseInt(selectedEvent.registrationCharge.amount || 0, 10)
      : 0;

    return eventCharge + totalAccommodationFee;
  };

  return (
    <div className="p-2 px-8 border w-full h-full">
      <h2 className="text-2xl font-bold mb-4 text-center">Summary</h2>
      <div className="w-full">
        {selectedEvent && ( // Conditionally render event details
          <div className="flex mt-2 text-red-500 text-bold text-lg">
            <div className="w-1/3">
              {selectedEvent.eventName.toTitleCase()}{" "}
              {selectedEvent.category.toTitleCase()}
            </div>
            <div className="w-1/3 text-center">
              {/* Display event day and shift here (adapt as needed) */}
              Day {selectedEvent.day} - {selectedEvent.shift}
            </div>
            <div className="w-1/3 text-end">
              ₹{selectedEvent.registrationCharge.amount}
            </div>
          </div>
        )}
        <div className="flex justify-between mt-8">
          <div>Total Accommodation Fee:</div>
          <div>₹{totalAccommodationFee}</div>
        </div>
        <div className="flex justify-between font-bold text-lg text-blue-600">
          <div>Total Fee:</div>
          <div>₹{calculateTotalCharge()}</div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
