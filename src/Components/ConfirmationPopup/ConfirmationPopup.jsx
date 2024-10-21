import React, { useState } from "react";

const ConfirmationPopup = ({ details, onClose, onSubmit }) => {
  // console.log(details);

  return (
    <div className="fixed inset-0  bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-900 border-black border-4 font-bold tracking-wider  text-l p-6 rounded-lg shadow-lg w-1/2 text-slate-300 h-4/5 overflow-y-auto my-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">
          Confirm Your Details
        </h2>

        {/* Display the team name */}
        <div className="mb-4 flex gap-12">
          <div>
            <h3 className="font-bold text-lg text-red-600 ">Team Name:</h3>
          </div>
          <p className=" text-2xl text-slate-300 ">{details.teamName}</p>
        </div>

        {/* Display the team leader's details */}
        <div className="mb-4 flex gap-9">
          <div className="">
            <h3 className="font-bold text-lg text-red-600">Team Leader:</h3>
          </div>
          <div className="space-y-2  ">
            <div className="flex gap-5">
              <p className="font-semibold text-blue-500">Name:</p>
              <p>{details.teamLeader.fullname}</p>
            </div>
            <div className="flex gap-6">
              <p className="font-semibold text-blue-500">Class:</p>
              <p>{details.teamLeader.class}</p>
            </div>
            <div className="flex gap-4">
              <p className="font-semibold text-blue-500">Phone:</p>
              <p>{details.teamLeader.phoneNumber}</p>
            </div>
            <div className="flex gap-6">
              <p className="font-semibold text-blue-500">Email:</p>
              <p>{details.teamLeader.email}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-semibold text-blue-500">Gender:</p>
              <p>{details.teamLeader.gender}</p>
            </div>
            <div className="flex gap-5">
              <p className="font-semibold text-blue-500">Accommodation:</p>
              <p>{details.teamLeader.optAccomodation ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>

        <div className="mb-4 flex gap-5">
          <div className="">
            <h3 className="font-bold text-lg text-red-600">Team Member:</h3>
          </div>
          <div className=" flex gap-5 ">
            {details.teamMembers.map((member, index) => (
              <div key={index} className="border rounded p-3">
                <p className="font-semibold text-blue-500 underline">
                  Member {index + 1}
                </p>
                <div className="flex gap-5  ">
                  <p className="font-semibold text-blue-500">Name:</p>
                  <p>{member.fullname}</p>
                </div>
                <div className="flex gap-6">
                  <p className="font-semibold text-blue-500">Class:</p>
                  <p>{member.class}</p>
                </div>
                <div className="flex gap-4">
                  <p className="font-semibold text-blue-500">Phone:</p>
                  <p>{member.phoneNumber}</p>
                </div>
                <div className="flex gap-6">
                  <p className="font-semibold text-blue-500">Email:</p>
                  <p>{member.email}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-semibold text-blue-500">Gender:</p>
                  <p>{member.gender}</p>
                </div>
                <div className="flex gap-5">
                  <p className="font-semibold text-blue-500">Accommodation:</p>
                  <p>{member.optAccomodation ? "Yes" : "No"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Display selected events */}
        <div className="mb-4 flex gap-2">
          <div className="">
            <h3 className="font-bold text-lg text-red-600">Selected Events:</h3>
          </div>
          <div className="space-y-1">
            {details.selectedEvents.map((event, index) => (
              <p key={index}>
                <span className="font-semibold mr-5 text-blue-500">
                  {event.category}:
                </span>{" "}
                {event.name}
              </p>
            ))}
          </div>
        </div>

        {/* Buttons for actions */}
        <div className="flex gap-5 mt-6 justify-evenly">
          <button
            className="bg-red-500 text-slate-300 py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
            onClick={onClose}
          >
            Recheck
          </button>
          <button
            className="bg-blue-500 text-slate-300 py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={onSubmit}
          >
            Ready to Go
          </button>
        </div>
      </div>
    </div>
  );
};

export const LoadingPopup = () => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-900 border-black border-4 font-bold tracking-wider text-l p-6 rounded-lg shadow-lg w-1/2 text-slate-300 h-4/5 overflow-y-auto my-8 flex justify-center items-center">
        {" "}
        {/* Center content */}
        <svg
          className="animate-spin h-16 w-16 text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Replace with your preferred loading animation SVG */}
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 0a6 6 0 100 12 6 6 0 000-12z"
          />
        </svg>
      </div>
    </div>
  );
};

export const OtpPopup = ({ email, onClose, onSubmit }) => {
  const [otp, setOtp] = useState("");

  const handleOtpChange = (e) => {
    // Ensure only numbers and limit to 4 digits
    const inputValue = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
    setOtp(inputValue);
  };

  const handleSubmit = () => {
    // Pass the OTP to the onSubmit function
    onSubmit(otp);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-900 border-black border-4 font-bold tracking-wider text-l p-6 rounded-lg shadow-lg w-1/2 text-slate-300 h-4/5 overflow-y-auto my-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">
          OTP sent to {email}
        </h2>

        <div className="mb-4">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-slate-300 focus:outline-none focus:border-blue-500"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
            maxLength="4" // Enforce 4-digit limit in the input itself
          />
        </div>

        <div className="flex gap-5 mt-6 justify-evenly">
          <button
            className="bg-red-500 text-slate-300 py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
            onClick={onClose}
          >
            Recheck
          </button>
          <button
            className="bg-blue-500 text-slate-300 py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={handleSubmit} // Call the handleSubmit function
          >
            Ready to Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
