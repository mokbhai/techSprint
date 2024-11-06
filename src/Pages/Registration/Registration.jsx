import React, { useState, useContext, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { EventsContext } from "../../Components/EventsContext";
import EventSelection from "../EventSelection/EventSelection";
import TeamDetails from "../../Components/TeamDetails/TeamDetails";
import Summary from "../../Components/Summary/Summary";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ConfirmationPopup, {
  LoadingPopup,
} from "../../Components/ConfirmationPopup/ConfirmationPopup";
import URL from "../../apiconfig";
import { useAlert } from "../../AlertContext";
import { Helmet } from "react-helmet";

const Registration = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [finalData, setfinalData] = useState();
  const location = useLocation();
  const { events } = useContext(EventsContext);
  const passedEvent = location.state?.event; // Passed event from location
  const [totalAccommodationFee, setTotalAccommodationFee] = useState(0);
  const [selectedEvents, setSelectedEvents] = useState({
    day1Morning: null,
    day1Evening: null,
    day2Morning: null,
    day2Evening: null,
  });

  const [teamDetails, setTeamDetails] = useState(() => {
    const storedTeamDetails = localStorage.getItem("teamDetails");
    try {
      return (
        JSON.parse(storedTeamDetails) || {
          // Provide a default value
          teamName: "",
          school: "",
          teamMembers: [
            {
              name: "",
              class: "",
              phone: "",
              email: "",
              gender: "",
              accommodationOpted: false,
            },
          ],
        }
      );
    } catch (error) {
      console.error("Error parsing teamDetails:", error);
      return {
        // Default value on error
        teamName: "",
        school: "",
        teamMembers: [
          {
            name: "",
            class: "",
            phone: "",
            email: "",
            gender: "",
            accommodationOpted: false,
          },
        ],
      };
    }
  });

  const alert = useAlert();

  // Only set the passedEvent once when the component loads
  useEffect(() => {
    if (passedEvent) {
      const dayShiftCategory = `day${passedEvent.day}${
        passedEvent.shift === "Morning" ? "Morning" : "Evening"
      }`;
      setSelectedEvents((prev) => ({
        ...prev,
        [dayShiftCategory]: passedEvent._id,
      }));
    }
  }, [passedEvent]);

  useEffect(() => {
    if (teamDetails) {
      localStorage.setItem("teamDetails", JSON.stringify(teamDetails));
    }
  }, [teamDetails]);

  // Fetch accommodation fee when the component mounts
  const fetchAccommodationFee = async () => {
    try {
      const response = await axios.get(URL + "/api/event/accommodationPrice");
      const accommodationFee = response.data.price || "NA"; // Adjust this according to your API response structure
      setTotalAccommodationFee(parseInt(accommodationFee || 0, 10)); // Set the accommodation fee in state
    } catch (error) {
      console.error("Error fetching accommodation fee:", error);
      alert("Failed to fetch accommodation fee. Please try again later.");
    }
  };

  useEffect(() => {
    fetchAccommodationFee();
  }, []);

  const handleEventSelection = (eventId, category) => {
    setSelectedEvents((prev) => ({ ...prev, [category]: Number(eventId) }));
    // console.log(eventId, category);
    // console.log(selectedEvents[category]);
  };

  // Function to get event names based on selected events
  const getSelectedEventNames = () => {
    return Object.entries(selectedEvents)
      .map(([category, eventId]) => {
        const event = events.find((e) => e._id === eventId || e.id === eventId); // Find the event by ID
        if (event) {
          return { category, name: event.eventName }; // Return the category and event name if found
        } else {
          console.warn(`Event with ID ${eventId} not found in events list`); // Log a warning if not found
          return null; // Return null if the event is not found
        }
      })
      .filter(Boolean); // Filter out any null values
  };

  // Handle team name input change
  const handleTeamNameChange = (e) => {
    setTeamDetails((prev) => ({
      ...prev,
      teamName: e.target.value,
    }));
  };
  const handleSchoolChange = (e) => {
    setTeamDetails((prev) => ({
      ...prev,
      school: e.target.value,
    }));
  };

  // Calculate total event amount based on selected events and accommodation fees
  const calculateTotalAmount = () => {
    const teamMemberCount = teamDetails.teamMembers.filter(
      (member) =>
        member.name.trim() !== "" &&
        member.class.trim() !== "" &&
        member.phone.trim() !== "" &&
        member.email.trim() !== "" &&
        member.gender.trim() !== ""
    ).length;

    if (teamMemberCount === 0) {
      return 0; // No members, no charges
    }

    // Calculate the total registration charge for the selected events
    const selectedEventIds = Object.values(selectedEvents).filter(Boolean);
    let totalEventAmount = 0;

    for (const eventId of selectedEventIds) {
      const event = events.find((e) => e._id === eventId);
      if (event) {
        totalEventAmount += parseFloat(event.registrationCharge.amount || 0);
      }
    }

    // Calculate the total accommodation fee ONLY if members exist
    let totalAccommodationAmount = 0;
    if (teamMemberCount > 0) {
      const membersOptingAccommodation = teamDetails.teamMembers.filter(
        (member) => {
          const isMemberFilled =
            member.name.trim() ||
            member.class.trim() ||
            member.phone.trim() ||
            member.email.trim() ||
            member.gender.trim();
          return isMemberFilled && member.accommodationOpted;
        }
      ).length;
      const accommodationFee = parseFloat(totalAccommodationFee);
      totalAccommodationAmount =
        membersOptingAccommodation *
        (isNaN(accommodationFee) ? 0 : accommodationFee);
    }

    // Total amount includes event charges and accommodation fees
    return totalEventAmount + totalAccommodationAmount;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that the team name is filled
    if (!teamDetails.teamName.trim()) {
      alert("Please enter a team name.");
      return;
    }

    if (!teamDetails.school.trim()) {
      alert("Please enter a School name.");
      return;
    }

    // Validate team leader's details (assuming team leader is the first member)
    const teamLeader = teamDetails.teamMembers[0];
    if (
      !teamLeader.name.trim() ||
      !teamLeader.class.trim() ||
      !teamLeader.phone.trim() ||
      !teamLeader.email.trim() ||
      !teamLeader.gender.trim()
    ) {
      alert("Please fill out all the team leader's details.");
      return;
    }

    // Validate phone and email formats for the team leader
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!phoneRegex.test(teamLeader.phone)) {
      alert("Please enter a valid 10-digit phone number for the team leader.");
      return;
    }

    if (!emailRegex.test(teamLeader.email)) {
      alert("Please enter a valid email for the team leader.");
      return;
    }

    // Check for incomplete members (partial details filled)
    // let hasValidMember = false; // To track if at least one valid member is present
    const team = [];

    // Validate and add team members
    for (let i = 0; i < teamDetails.teamMembers.length; i++) {
      const member = teamDetails.teamMembers[i];
      const isMemberFilled =
        member.name.trim() ||
        member.class.trim() ||
        member.phone.trim() ||
        member.email.trim() ||
        member.gender.trim();

      // Validate the member's info only if any field is filled
      if (isMemberFilled) {
        if (
          !member.name.trim() ||
          !member.class.trim() ||
          !member.phone.trim() ||
          !member.email.trim() ||
          !member.gender.trim()
        ) {
          alert(
            `Please fill out all details for team member ${
              i + 1
            } or leave all fields blank.`
          );
          return;
        }

        // Validate the member's phone and email formats
        if (!phoneRegex.test(member.phone)) {
          alert(
            `Please enter a valid 10-digit phone number for team member ${
              i + 1
            }.`
          );
          return;
        }

        if (!emailRegex.test(member.email)) {
          alert(`Please enter a valid email for team member ${i + 1}.`);
          return;
        }

        const selectedEventIds = Object.values(selectedEvents).filter(Boolean);

        for (const eventId of selectedEventIds) {
          const event = events.find((e) => e._id === eventId);
          if (event) {
            const memberClass = parseInt(member.class, 10);

            if (
              event.category === "jr" &&
              (isNaN(memberClass) || memberClass < 5 || memberClass > 7)
            ) {
              alert(
                `For ${event.eventName} (jr category) Team member ${
                  i + 1
                } cannot participate as he is Senior.`
              );
              return;
            } else if (
              event.category === "sr" &&
              (isNaN(memberClass) || memberClass < 8 || memberClass > 12)
            ) {
              alert(
                `For ${event.eventName} (sr category) Team member ${
                  i + 1
                } cannot participate as he is Junior.`
              );
              return;
            }
          }
        }

        // Add valid member to the team array
        team.push({
          fullname: member.name,
          gender: member.gender,
          phoneNumber: member.phone,
          class: member.class,
          email: member.email,
          optAccomodation: member.accommodationOpted,
          isteamLeader: i === 0 ? true : false, // Not the team leader
        });
      }
    }

    // Validate that at least one event is selected
    const { day1Morning, day1Evening, day2Morning, day2Evening } =
      selectedEvents;
    const isAnyEventSelected =
      day1Morning || day1Evening || day2Morning || day2Evening;

    if (!isAnyEventSelected) {
      alert("Please select at least one event.");
      return;
    }

    // Extract selected event IDs
    const selectedEventIds = Object.values(selectedEvents).filter(Boolean);

    // Calculate the total amount for selected events and accommodation
    const totalAmount = calculateTotalAmount();
    // Prepare the registration payload
    const registrationData = {
      teamName: teamDetails.teamName,
      school: teamDetails.school,
      team,
      eventIds: selectedEventIds,
      amount: totalAmount,
    };

    // console.log(registrationData);
    setPopupVisible(true);
    setfinalData(registrationData);
  };

  const cancelRegistration = () => {
    setPopupVisible(false);
  };

  const handlePopupSubmission = async () => {
    setPopupVisible(false);
    setLoading(true);
    try {
      const response = await axios.post(
        URL + "/api/registration/new",
        // registrationData
        finalData
      );

      const data = response.data;

      setLoading(false);

      alert(data.message, "success");

      if (data.redirectUrl) window.location.href = data.redirectUrl;
    } catch (error) {
      setLoading(false);
      console.error("Error submitting registration:", error);
      alert("Failed to register. Please try again later.");
    }
  };

  const clearTeamDetails = () => {
    localStorage.removeItem("teamDetails");
    setTeamDetails({
      // Reset the state to the default values
      teamName: "",
      teamMembers: [
        {
          name: "",
          class: "",
          phone: "",
          email: "",
          gender: "",
          accommodationOpted: false,
        },
      ],
    });
    setSelectedEvents({
      day1Morning: null,
      day1Evening: null,
      day2Morning: null,
      day2Evening: null,
    });
  };

  return (
    <div
      id="registration"
      className="font-avengerd flex flex-col text-slate-400 min-h-screen bg-gray-900"
    >
      <Helmet>
        <title>Registration Page</title>
        <meta name="description" content="Registraiton" />
        <meta name="keywords" content="techsprint, lpu, techsprint2024" />
      </Helmet>

      <Navbar />
      <form
        className="w-full bg-opacity-80 p-8 rounded-lg shadow-md "
        onSubmit={handleSubmit}
      >
        {/* Team Name Input */}
        <div className="flex flex-col md:flex-row gap-2 opacity-80">
          <div className="mb-5 border p-4  md:w-1/2">
            <h2 className="text-2xl mb-2">Team Name*:</h2>
            <input
              type="text"
              value={teamDetails.teamName}
              onChange={handleTeamNameChange}
              placeholder="Team Name"
              className="w-full border px-3 py-2 bg-slate-400 font-sans placeholder:font-normal text-black font-semibold text-lg rounded placeholder:text-black placeholder:opacity-80  mb-4"
              required
            />{" "}
            <div className="flex flex-wrap md:flex-row gap-2 opacity-80 items-center">
              <h2 className="text-2xl mb-2">School Name, City, State*: </h2>
              <p className="">
                Example: Delhi Public School, Jalandhar, Punjab.
              </p>
            </div>
            <input
              type="text"
              value={teamDetails.school}
              onChange={handleSchoolChange}
              placeholder="School Name, City, State"
              className="w-full border px-3 py-2 bg-slate-400 font-sans placeholder:font-normal text-black font-semibold text-lg rounded placeholder:text-black placeholder:opacity-80"
              required
            />
          </div>
          <div className="mb-5 border p-4 md:w-1/2">
            <h2 className="text-2xl  mb-4 ">Registration Info:</h2>
            <p>* means Required</p>
            <p>
              Students of 5th to 7th class are eligibible for Junior (Jr) events
              only
            </p>
            <p>
              Students of 8th to 12th class are eligibible for Senior (Sr)
              events only
            </p>
            <p>Accommodation Fee: ₹{totalAccommodationFee} per opted member</p>
          </div>
        </div>

        {/* Team Details */}
        <TeamDetails
          teamDetails={teamDetails}
          setTeamDetails={setTeamDetails}
        />
        <div className="flex flex-col md:flex-row gap-2 mt-5">
          <div className="md:w-1/2 h-full ">
            <EventSelection
              events={events}
              selectedEvents={selectedEvents}
              handleEventSelection={handleEventSelection}
              category={
                parseInt(teamDetails?.teamMembers[0]?.class, 10) >= 8
                  ? "sr"
                  : "jr"
              }
            />
          </div>

          <div className="md:w-1/2 ">
            <Summary
              selectedEvents={selectedEvents}
              events={events}
              totalAccommodationFee={
                teamDetails.teamMembers.filter((member) => {
                  const isMemberFilled =
                    member.name.trim() ||
                    member.class.trim() ||
                    member.phone.trim() ||
                    member.email.trim() ||
                    member.gender.trim();
                  return isMemberFilled && member.accommodationOpted;
                }).length * totalAccommodationFee
              }
              teamDetails={teamDetails}
            />
          </div>
        </div>

        <div className="w-full  items-center mt-6 flex justify-center opacity-80 gap-2">
          <button
            onClick={clearTeamDetails}
            type="clear"
            className="bg-transparent border text-white w-1/3 text-lg self-center  py-2 rounded-3xl hover:bg-red-600 hover:font-extrabold "
          >
            Clear Details
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white w-1/3 text-lg self-center  py-2 px-4 rounded-3xl hover:bg-blue-700 hover:font-extrabold "
          >
            REGISTER
          </button>
        </div>
      </form>
      {isPopupVisible && (
        <ConfirmationPopup
          //  details={registrationData}
          details={{
            teamName: finalData.teamName,
            teamLeader: finalData.team[0],
            teamMembers: finalData.team.slice(1),
            selectedEvents: getSelectedEventNames(), // Pass the event names instead of IDs
          }}
          //  const registrationData = {
          //   teamName: teamDetails.teamName,
          //   team,
          //   eventIds: selectedEventIds,
          //   amount: totalAmount,
          // };
          onClose={cancelRegistration}
          onSubmit={handlePopupSubmission}
        />
      )}
      {isLoading && <LoadingPopup />}
    </div>
  );
};

export default Registration;
