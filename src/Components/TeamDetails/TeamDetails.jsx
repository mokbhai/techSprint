// import React, { useState, useEffect } from "react";

// const inputFeildCss =
//   "w-full border px-3 py-2 bg-slate-400 text-black rounded-lg";
// const labelFeildCss = "block text-md font-medium mb-1";

// const TeamDetails = ({ teamDetails, setTeamDetails }) => {
//   // Handle team name change
//   const handleTeamNameChange = (e) => {
//     setTeamDetails({ ...teamDetails, teamName: e.target.value });
//   };

//   // Handle changes in team members' details
//   const handleMemberChange = (index, event) => {
//     const { name, value, type, checked } = event.target;
//     const members = [...teamDetails.teamMembers];

//     if (name === "isTeamLeader" && checked) {
//       // Ensure only one team leader is selected
//       members.forEach((member, i) => {
//         if (i !== index) {
//           member.isTeamLeader = false;
//         }
//       });
//     }
//     members[index][name] = type === "checkbox" ? checked : value;
//     setTeamDetails({ ...teamDetails, teamMembers: members });
//   };

//   // Use useEffect to enforce required fields for the team leader
//   useEffect(() => {
//     const leader = teamDetails.teamMembers.find(
//       (member) => member.isTeamLeader
//     );
//     if (leader) {
//       const allFieldsFilled =
//         leader.name &&
//         leader.class &&
//         leader.phone &&
//         leader.email &&
//         leader.gender;

//       if (!allFieldsFilled) {
//         // Option 1: Display an error message (Recommended)
//         alert("Note: All fields are required for the team leader.");

//         // Option 2 (Less User-Friendly): Uncheck the isTeamLeader box if fields are missing.
//         // const members = [...teamDetails.teamMembers];
//         // const leaderIndex = teamDetails.teamMembers.findIndex(member => member.isTeamLeader);
//         // members[leaderIndex].isTeamLeader = false;
//         // setTeamDetails({ ...teamDetails, teamMembers: members });
//       }
//     }
//   }, [teamDetails.teamMembers]);

//   // Add a new team member
//   const addTeamMember = () => {
//     if (teamDetails.teamMembers.length < 5) {
//       // Limit to 5 members

//       setTeamDetails({
//         ...teamDetails,
//         teamMembers: [
//           ...teamDetails.teamMembers,
//           {
//             name: "",
//             class: "",
//             phone: "",
//             email: "",
//             gender: "",
//             accommodationOpted: false,
//             isTeamLeader: false,
//           },
//         ],
//       });
//     }
//   };

//   // Remove a team member
//   const removeTeamMember = (index) => {
//     const members = [...teamDetails.teamMembers];
//     members.splice(index, 1);
//     setTeamDetails({ ...teamDetails, teamMembers: members });
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log("Team Details Submitted:", teamDetails);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="border text-slate-400 p-4 flex flex-col"
//     >
//       {/* Team Name */}
//       <div className="mb-4">
//         <label className={labelFeildCss}>Team Name:</label>
//         <input
//           type="text"
//           name="teamName"
//           value={teamDetails.teamName}
//           onChange={handleTeamNameChange}
//           className={inputFeildCss}
//           placeholder="Enter team name"
//           required
//         />
//       </div>

//       {/* Team Members */}
//       {teamDetails.teamMembers.map((member, index) => (
//         <div key={index} className="mb-6 p-4 border rounded">
//           <h3 className="text-lg font-semibold mb-2">
//             Team Member {index + 1}
//           </h3>

//           {/* Name */}
//           <div className="mb-3">
//             <label className={labelFeildCss}>Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={member.name}
//               onChange={(e) => handleMemberChange(index, e)}
//               className={inputFeildCss}
//               placeholder="Enter member name"
//               required
//             />
//           </div>

//           {/* Class */}
//           <div className="mb-3">
//             <label className={labelFeildCss}>Class:</label>
//             <input
//               type="text"
//               name="class"
//               value={member.class}
//               onChange={(e) => handleMemberChange(index, e)}
//               className={inputFeildCss}
//               placeholder="Enter class"
//               required
//             />
//           </div>

//           {/* Phone */}
//           <div className="mb-3">
//             <label className={labelFeildCss}>Phone:</label>
//             <input
//               type="tel"
//               name="phone"
//               value={member.phone}
//               onChange={(e) => handleMemberChange(index, e)}
//               className={inputFeildCss}
//               placeholder="Enter phone number"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div className="mb-3">
//             <label className={labelFeildCss}>Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={member.email}
//               onChange={(e) => handleMemberChange(index, e)}
//               className={inputFeildCss}
//               placeholder="Enter email"
//               required
//             />
//           </div>

//           {/* Gender */}
//           <div className="mb-3">
//             <label className={labelFeildCss}>Gender:</label>
//             <select
//               name="gender"
//               value={member.gender}
//               onChange={(e) => handleMemberChange(index, e)}
//               className={inputFeildCss}
//               required
//             >
//               <option value="">Select gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               {/* Add more options if necessary */}
//             </select>
//           </div>

//           {/* Accommodation Opted */}
//           <div className="mb-3 flex items-center">
//             <input
//               type="checkbox"
//               name="accommodationOpted"
//               checked={member.accommodationOpted}
//               onChange={(e) => handleMemberChange(index, e)}
//               className="mr-2"
//             />
//             <label className="text-sm font-medium">Accommodation Opted</label>
//           </div>

//           {/* Is Team Leader */}
//           <div className="mb-3 flex items-center">
//             <input
//               type="checkbox"
//               name="isTeamLeader"
//               checked={member.isTeamLeader}
//               onChange={(e) => handleMemberChange(index, e)}
//               className="mr-2"
//             />
//             <label className="text-sm font-medium">Is Team Leader</label>
//           </div>

//           {/* Remove Member Button */}
//           {teamDetails.teamMembers.length > 1 && (
//             <button
//               type="button"
//               onClick={() => removeTeamMember(index)}
//               className="mt-2 text-yellow-700 hover:underline"
//             >
//               Remove Member
//             </button>
//           )}
//         </div>
//       ))}

//       {/* Add Team Member Button */}
//       {teamDetails.teamMembers.length < 5 && (
//         <button
//           type="button"
//           onClick={addTeamMember}
//           className="mb-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Add Team Member
//         </button>
//       )}
//       {/* Submit Button */}
//       <button
//         type="submit"
//         className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default TeamDetails;
import React, { useEffect } from "react";

const TeamDetails = ({ teamDetails, setTeamDetails }) => {
  // Initialize 4 team members if not already initialized
  useEffect(() => {
    if (teamDetails.teamMembers.length < 4) {
      const initialMembers = [
        { name: "", class: "", phone: "", email: "", gender: "", accommodationOpted: false },
        { name: "", class: "", phone: "", email: "", gender: "", accommodationOpted: false },
        { name: "", class: "", phone: "", email: "", gender: "", accommodationOpted: false },
        { name: "", class: "", phone: "", email: "", gender: "", accommodationOpted: false },
      ];
      setTeamDetails({
        ...teamDetails,
        teamMembers: initialMembers,
      });
    }
  }, [teamDetails, setTeamDetails]);

  const handleInputChange = (index, field, value) => {
    const updatedMembers = [...teamDetails.teamMembers];
    updatedMembers[index][field] = value;
    setTeamDetails({ ...teamDetails, teamMembers: updatedMembers });
  };

  const handleCheckboxChange = (index, field, checked) => {
    const updatedMembers = [...teamDetails.teamMembers];
    updatedMembers[index][field] = checked;
    setTeamDetails({ ...teamDetails, teamMembers: updatedMembers });
  };

  const addTeamMember = () => {
    if (teamDetails.teamMembers.length < 5) {
      setTeamDetails({
        ...teamDetails,
        teamMembers: [
          ...teamDetails.teamMembers,
          { name: "", class: "", phone: "", email: "", gender: "", accommodationOpted: false },
        ],
      });
    }
  };

  const removeTeamMember = (index) => {
    const updatedMembers = teamDetails.teamMembers.filter((_, i) => i !== index);
    setTeamDetails({ ...teamDetails, teamMembers: updatedMembers });
  };

  return (
    <div className="gap-5 border p-4 opacity-80">
      <h2 className="text-2xl  mb-4 text-center">Team Details</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {teamDetails.teamMembers.map((member, index) => (
          <div key={index} className="mb-4">
            {/* Show "Team Leader" for the first member */}
            {index === 0 && (
              <div className="text-lg  mb-2 text-yellow-700 underline ">
                Team Leader*
              </div>
            )}
            {index == 1 && (
              <div className="text-lg  mb-2 text-yellow-700 ">
                Team Member 1
              </div>
            )}
            {index > 1 && (
              <div className="text-lg  mb-2 text-yellow-700 ">
                Team Member {index}
              </div>
            )}

            <input
              type="text"
              placeholder="Name"
              value={member.name}
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
              className="w-full border px-3 py-2 bg-slate-400 text-black placeholder:text-black placeholder:opacity-80 rounded mb-2"
            />
            <select
              value={member.class}
              onChange={(e) =>
                handleInputChange(index, "class", e.target.value)
              }
              className="w-full border px-3 py-2 bg-slate-400 text-black placeholder:text-black placeholder:opacity-80 rounded mb-2"
            >
              <option value="">Select Class</option>
              <option value="5th">5th</option>
              <option value="6th">6th</option>
              <option value="7th">7th</option>
              <option value="8th">8th</option>
              <option value="9th">9th</option>
              <option value="10th">10th</option>
              <option value="11th">11th</option>
              <option value="12th">12th</option>
            </select>
            <input
              type="tel"
              placeholder="Phone"
              value={member.phone}
              onChange={(e) =>
                handleInputChange(index, "phone", e.target.value)
              }
              className="w-full border px-3 py-2 bg-slate-400 text-black placeholder:text-black placeholder:opacity-80 rounded mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={member.email}
              onChange={(e) =>
                handleInputChange(index, "email", e.target.value)
              }
              className="w-full border px-3 py-2 bg-slate-400 text-black placeholder:text-black placeholder:opacity-80 rounded mb-2"
            />
            <select
              value={member.gender}
              onChange={(e) =>
                handleInputChange(index, "gender", e.target.value)
              }
              className="w-full border px-3 py-2 bg-slate-400 text-black placeholder:text-black placeholder:opacity-80 rounded mb-2"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Rather not say">Do not wish to disclose</option>
            </select>
            <label className="flex items-center mb-2 text-blue-500 text-lg font-semibold">
              <input
                type="checkbox"
                checked={member.accommodationOpted}
                onChange={(e) =>
                  handleCheckboxChange(
                    index,
                    "accommodationOpted",
                    e.target.checked
                  )
                }
                className="mr-2"
              />
              Accommodation Opted
            </label>

            {/* Remove member button only if not the team leader */}
            {/* {index > 0 && (
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => removeTeamMember(index)}
              >
                Remove Member
              </button>
            )} */}
          </div>
        ))}
      </div>

      {/* Disable "Add Team Member" button if there are already 5 members */}
      {teamDetails.teamMembers.length < 5 && (
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addTeamMember}
        >
          Add Team Member
        </button>
      )}
    </div>
  );
};

export default TeamDetails;
