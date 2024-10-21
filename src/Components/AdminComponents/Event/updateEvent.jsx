import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./Event.css";
import URL from "../../../apiconfig";
import { FileUploadForm, initialEventState } from "./Event2";
import EventCard from "../../EventCard/EventCard";
import { EventsContext } from "../../EventsContext";
import { useAlert } from "../../../AlertContext";

const UpdateEvent = () => {
  let { events, loading } = useContext(EventsContext);
  const [eventId, setEventId] = useState("");
  const [event, setEvent] = useState(initialEventState);
  const [loading2, setLoading] = useState(true);
  const alert = useAlert();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`${URL}/api/event/${eventId}`, {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        });
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event data:", error);
        alert("Error fetching event data");
      } finally {
        setLoading(false);
      }
    };

    const getEventData = async () => {
      try {
        let foundEvent;

        for (const event of events) {
          if (eventId == event._id) {
            foundEvent = event;
          }
        }
        setEvent(foundEvent);
      } catch (error) {
        console.error("Error fetching event data:", error);
        alert("Error fetching event data");
      } finally {
        setLoading(false);
      }
    };
    if (eventId) {
      // Only fetch data if eventId exists
      // fetchEventData();
      getEventData();
    } else {
      setLoading(false); // Set loading to false even if no eventId
    }
  }, [eventId, events]);

  const handleChange = (e, field, index = null) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setEvent((prevEvent) => {
      if (index !== null) {
        // Handling array updates
        return {
          ...prevEvent,
          [field]: prevEvent[field].map((item, i) => {
            if (i === index) {
              if (typeof item === "object") {
                // Handle nested objects in arrays
                return { ...item, [e.target.name.split(".")[1]]: value };
              } else {
                return value;
              }
            }
            return item;
          }),
        };
      } else {
        // Handling object updates
        const [parentKey, childKey] = field.split(".");
        if (childKey) {
          // Nested object update
          return {
            ...prevEvent,
            [parentKey]: {
              ...prevEvent[parentKey],
              [childKey]: value,
            },
          };
        } else {
          // Top-level object update
          return {
            ...prevEvent,
            [field]: value,
          };
        }
      }
    });
  };

  const handleChangeContact = (e, field, index = null) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setEvent((prevEvent) => {
      if (index !== null) {
        // Handling array updates
        return {
          ...prevEvent,
          [field]: prevEvent[field].map((item, i) => {
            if (i === index) {
              // Correctly update nested object properties
              return { ...item, [e.target.name]: value };
            }

            return item;
          }),
        };
      } else {
        // Handling object updates
        const [parentKey, childKey] = field.split(".");
        if (childKey) {
          // Nested object update
          return {
            ...prevEvent,
            [parentKey]: {
              ...prevEvent[parentKey],
              [childKey]: value,
            },
          };
        } else {
          // Top-level object update
          return {
            ...prevEvent,
            [field]: value,
          };
        }
      }
    });
  };

  const handleAdd = (field) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      [field]: [
        ...prevEvent[field],
        field === "contacts" ? { name: "", phone: "" } : "",
      ],
    }));
  };

  const handleDelete = (field, index) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      [field]: prevEvent[field].filter((_, i) => i !== index),
    }));
  };

  const handleFileUpload = (type, fileId) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      [type === "RuleBook"
        ? "ruleBook"
        : type === "AvengerCharacter"
        ? "avengerCharacter"
        : "photos"]: type === "photos" ? [...prevEvent.photos, fileId] : fileId,
    }));
  };

  const handleDeleteFile = async (type) => {
    try {
      const fileIdToDelete =
        event[type === "Brochure" ? "brochure" : "ruleBook"];

      // Avoid unnecessary API call if fileIdToDelete is null
      // if (!fileIdToDelete) {
      //   alert(`${type} already deleted`);
      //   return;
      // }

      const endpoint =
        type === "Brochure" ? "/api/event/brochure" : "/api/file/delete";
      const response = await axios.delete(URL + endpoint, {
        headers: { Authorization: localStorage.getItem("token") },
        data: { fileId: fileIdToDelete },
      });

      alert(response.data.message, "sucees");
      setEvent((prevEvent) => ({
        ...prevEvent,
        [type === "Brochure" ? "brochure" : "ruleBook"]: null,
      }));
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      alert(`Error deleting ${type}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/api/event/${eventId}`, event, {
        headers: {
          authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      alert(response.data.message, "sucess");
      setEvent(initialEventState);
      setEventId(undefined);
      window.location.reload();
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Error creating event: " + error.message);
    }
  };

  const handleEventDelete = async (eventId) => {
    try {
      const response = await axios.delete(`${URL}/api/event/${eventId}`, {
        headers: {
          authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      alert("Event deleted successfully", "sucess");
      setEvent(initialEventState);
      setEventId(undefined);
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Error creating event");
    }
  };

  if (loading || loading2) {
    return <div>Loading...</div>;
  }

  if (!eventId) {
    const sortedEvents = [...events].sort((a, b) => {
      const categoryA = a.category?.toLowerCase();
      const categoryB = b.category?.toLowerCase();
      if (categoryA < categoryB) {
        return -1;
      }
      if (categoryA > categoryB) {
        return 1;
      }
      return 0;
    });

    return (
      <div className=" flex flex-wrap justify-center gap-10">
        {sortedEvents.map((event, index) => (
          <div>
            <EventCard key={index} event={event} onClick={setEventId} />
            <p>{event.category}</p>
            <button onClick={() => handleEventDelete(event._id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 bg-white w-1/3 text-black">
        <h2 className="mb-2">Upload Brochure:</h2>
        <FileUploadForm type="Brochure" onUpload={handleFileUpload} />{" "}
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mt-2"
          onClick={() => handleDeleteFile("Brochure")}
        >
          Delete Brochure
        </button>
      </div>

      <div className="event-creation text-black">
        <p>Event Photos:</p>
        <FileUploadForm type="EventPhotos" onUpload={handleFileUpload} />
        <p>Event RuleBook:</p>
        <FileUploadForm type="RuleBook" onUpload={handleFileUpload} />
        <p>Event Avenger Character:</p>
        <FileUploadForm type="AvengerCharacter" onUpload={handleFileUpload} />
        {/* <button
          className="bg-red-500 text-white px-4 py-2 rounded mt-2"
          onClick={() => handleDeleteFile("RuleBook")}
        >
          Delete RuleBook
        </button> */}
        <form onSubmit={handleSubmit}>
          {/* ... form fields - use handleChange, handleAdd, and handleDelete */}
          <label>Event Name:</label>
          <input
            type="text"
            value={event.eventName}
            onChange={(e) => handleChange(e, "eventName")}
            required
          />
          <label>Event Type:</label>
          <input
            type="text"
            value={event.eventType}
            onChange={(e) => handleChange(e, "eventType")}
            required
          />
          <div className="">
            <label>Event Category:</label>
            <select
              id="category"
              value={event.category}
              onChange={(e) => handleChange(e, "category")}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
              required
            >
              <option value="jr">Jr</option>
              <option value="sr">Sr</option>
            </select>
          </div>
          <label>Description:</label>
          <textarea
            value={event.description}
            onChange={(e) => handleChange(e, "description")}
            required
          />
          <label>Organiser Name:</label>
          <input
            type="text"
            value={event.organiserName}
            onChange={(e) => handleChange(e, "organiserName")}
            required
          />
          <label>Landmark:</label>
          <input
            type="text"
            value={event.location.landmark}
            onChange={(e) => handleChange(e, "location.landmark")}
            required
          />
          <label>City:</label>
          <input
            type="text"
            value={event.location.city}
            onChange={(e) => handleChange(e, "location.city")}
            required
          />
          <label>State:</label>
          <input
            type="text"
            value={event.location.state}
            onChange={(e) => handleChange(e, "location.state")}
            required
          />
          <label>Country:</label>
          <input
            type="text"
            value={event.location.country}
            onChange={(e) => handleChange(e, "location.country")}
            required
          />

          <label>Participants:</label>
          <label>Min:</label>
          <input
            type="Number"
            value={event.participants.min}
            onChange={(e) => handleChange(e, "participants.min")}
            required
          />
          <label>Max:</label>
          <input
            type="Number"
            value={event.participants.max}
            onChange={(e) => handleChange(e, "participants.max")}
            required
          />

          {/* ... other form inputs using handleChange */}
          <label>Event Date:</label>
          <input
            type="date"
            value={event.eventDate}
            onChange={(e) => handleChange(e, "eventDate")}
          />
          <div className="pb-2">
            <label className="block font-medium text-gray-700">
              Event Day:
            </label>
            <select
              id="day"
              value={event.day}
              onChange={(e) => handleChange(e, "day")}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
              required
            >
              <option value="1">Day 1</option>
              <option value="2">Day 2</option>
            </select>
          </div>
          <div className="">
            <label className="block font-medium text-gray-700">
              Event Shift:
            </label>
            <select
              id="shift"
              value={event.shift}
              onChange={(e) => handleChange(e, "shift")}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
              required
            >
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
            </select>
          </div>
          {/* ... other form inputs */}
          <label>Eligibilities:</label>
          {event.eligibilities.map((eligibility, index) => (
            <div key={index}>
              {/* Added a div to wrap each eligibility item */}
              <input
                type="text"
                value={eligibility} // Use eligibility, not event.eligibilities
                onChange={(e) => handleChange(e, "eligibilities", index)} // Use handleChange
                required
              />
              <button
                type="button"
                onClick={() => handleDelete("eligibilities", index)}
              >
                Remove
              </button>
              {/* Add a remove button for each eligibility */}
            </div>
          ))}
          <button type="button" onClick={() => handleAdd("eligibilities")}>
            Add Eligibility
          </button>

          {/* <label>Structure:</label>
          {event.structure.map((str, index) => (
            <div key={index}>
              <input
                type="text"
                value={str}
                onChange={(e) => handleChange(e, "structure", index)}
                required
              />
              <button
                type="button"
                onClick={() => handleDelete("structure", index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAdd("structure")}>
            Add Structure
          </button> */}

          <label>Rules:</label>
          {event.rules.map((rule, index) => (
            <div key={index}>
              <input
                type="text"
                value={rule}
                onChange={(e) => handleChange(e, "rules", index)}
                required
              />
              <button
                type="button"
                onClick={() => handleDelete("rules", index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAdd("rules")}>
            Add Rule
          </button>

          <label>Contacts:</label>
          {Array.isArray(event.contacts) &&
            event.contacts.map(
              (
                contact,
                index // Check if contacts is an array
              ) => (
                <div key={index}>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name" // Add the name attribute
                    value={contact.name}
                    onChange={(e) => handleChangeContact(e, "contacts", index)} // Correct field name
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    name="phone" // Add the name attribute
                    value={contact.phone}
                    onChange={(e) => handleChangeContact(e, "contacts", index)} // Correct field name
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleDelete("contacts", index)}
                  >
                    Remove
                  </button>
                </div>
              )
            )}

          <button type="button" onClick={() => handleAdd("contacts")}>
            Add Contact
          </button>
          <label>Registration Charges:</label>
          <div>
            <input
              type="text"
              placeholder="Currency"
              value={event.registrationCharge.currency}
              onChange={(e) => handleChange(e, "registrationCharge.currency")}
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={event.registrationCharge.amount}
              onChange={(e) => handleChange(e, "registrationCharge.amount")}
              required
            />
            <label>
              <input
                type="checkbox"
                checked={event.registrationCharge.isMandatory}
                onChange={(e) =>
                  handleChange(e, "registrationCharge.isMandatory")
                }
              />
              Mandatory
            </label>
          </div>
          <button type="submit">Update Event</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
