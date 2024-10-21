import React, { useState } from "react";
import axios from "axios";
import "./Event.css";
import URL from "../../../apiconfig";
import { useAlert } from "../../../AlertContext";

export const FileUploadForm = ({ type, onUpload }) => {
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState(null);
  const alert = useAlert();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload."); // Alert if no file is selected
      return;
    }

    try {
      const formData = new FormData();
      formData.append("upload", file);
      formData.append("type", type);

      const response = await fetch(URL + "/api/file/upload", {
        method: "POST",
        body: formData,
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        const errorData = await response.json(); // Get error details from the response
        throw new Error(
          `HTTP error ${response.status}: ${
            errorData.message || "Upload failed"
          }`
        );
      }

      const data = await response.json();
      setFileId(data._id);
      onUpload(type, data.fileId);
      setFile(null);
      alert(data.message, "success");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert(`Error uploading file: ${error.message}`); // Show a more informative error message
    }
  };

  return (
    <div>
      {file && <p>Selected file: {file.name}</p>}{" "}
      {fileId && <p>Uploaded file: {fileId}</p>}{" "}
      {!fileId && (
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
      )}
    </div>
  );
};

export const initialEventState = {
  eventName: "",
  eventType: "Competition",
  description: "",
  organiserName: "Lovely Professional University",
  location: {
    landmark: "Lovely Professional University (LPU)",
    city: "Jalandhar",
    state: "Punjab",
    country: "India",
  },
  category: "jr",
  day: 1,
  shift: "Morning",
  structure: [""],
  eligibilities: [""],
  rules: [""],
  contacts: [{ name: "Any", phone: "1234567890" }],
  eventDate: "",
  registrationCharge: {
    currency: "INR",
    amount: 300,
    isMandatory: true,
  },
  participants: {
    min: 2,
    max: 4,
  },
  photos: [],
  avengerCharacter: null,
  ruleBook: null,
  // brochure: null,
};

const Event = () => {
  const [event, setEvent] = useState(initialEventState);
  const [accommodation, setAccommodationFee] = useState("");

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

      alert(`${type} deleted successfully`);
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
      const response = await axios.post(`${URL}/api/event/create`, event, {
        headers: {
          authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      alert(response.data.message);
      setEvent(initialEventState);
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Error creating event");
    }
  };

  const handleAccommodationSubmit = async (e) => {
    e.preventDefault();

    const price = parseFloat(accommodation); // Convert to number

    if (isNaN(price)) {
      // Check if conversion was successful
      alert("Please enter a valid number for the accommodation fee.");
      return;
    }

    try {
      const response = await axios.post(
        `${URL}/api/event/accommodationPrice`,
        { price: price }, // Send the number
        {
          headers: {
            authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      alert(response.data.message);
      // Remove setEvent(initialEventState) to avoid resetting other event details
    } catch (error) {
      console.error("Error updating accommodation fee:", error); // More specific error message
      alert("Error updating accommodation fee"); // More specific error message
    }
  };

  return (
    <div>
      <div className="event-creation text-black mb-4 bg-white w-1/3">
        <h2 className="mb-2">Upload Brochure:</h2>
        <FileUploadForm type="Brochure" onUpload={handleFileUpload} />{" "}
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mt-2"
          onClick={() => handleDeleteFile("Brochure")}
        >
          Delete Brochure
        </button>
      </div>

      <div className="event-creation text-black mb-4 bg-white w-1/3">
        <h2 className="mb-2">Accommodation Fee:</h2>
        <input // Use input type number for numeric input
          type="number"
          value={accommodation}
          onChange={(e) => setAccommodationFee(e.target.value)}
          required
        />
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mt-2"
          onClick={handleAccommodationSubmit} // Directly call the function
        >
          Update Accommodation Fee
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

          <label>Event Date:</label>
          <input
            type="date"
            value={event.eventDate}
            onChange={(e) => handleChange(e, "eventDate")}
            required
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
          <button type="submit">Create Event</button>
        </form>
      </div>
    </div>
  );
};

export default Event;
