import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Contact.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import URL from "../../apiconfig";
import lpulogo from "../../Assets/shield.png";
import bg from "../../Assets/bluebg.jpg";
import { useAlert } from "../../AlertContext";
import LoadingCircle from "../../Components/lodingCircle";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
  });
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);
  const alert = useAlert();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${URL}/api/contactUs/?asdsad`);
        setContacts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        alert("Failed to fetch contact details");
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${URL}/api/contactUs/message/create`, formData);
      setFormSuccess("Message sent successfully!");
      alert("message sent. thank you");
      setFormError(null);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
      setFormSuccess(null);
    }
  };

  return (
    <>
      <div
        className="text-slate-400 font-avengerd w-full bg-center bg-cover bg-black bg-opacity-80 min-h-screen"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <Navbar />
        {loading ? (
          <LoadingCircle />
        ) : (
          <div className="container mx-auto py-10">
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="bg-black bg-opacity-90 p-4 border border-opacity-80 border-slate-400 shadow-lg rounded-lg lg:w-1/2">
                <h3 className="font-bold text-3xl text-center mb-4 text-yellow-500">
                  Contact Info
                </h3>
                <p className="text-xl leading-relaxed text-justify px-6">
                  Need help with TechSprint 2024 season 2? We're here to assist!
                  For any questions, technical issues, or general inquiries,
                  please use the contact form below. We'll do our best to
                  respond as quickly as possible. We appreciate your feedback
                  and look forward to hearing from you!
                </p>
                <div className="flex flex-row justify-around">
                  <div>
                    <h3 className="text-yellow-500 font-bold text-xl mt-4 mb-2">
                      Program Head
                    </h3>
                    <p className="font-bold">Prof.(Dr.) Sorabh Lakhanpal</p>
                    <p>
                      Executive Dean, Student Welfare Wing, <br />
                      Lovely Professional University
                    </p>
                    <h3 className="text-yellow-500 font-bold text-xl my-2">
                      Organizing Committee
                    </h3>
                    <p>
                      <span className="font-bold"> Ms. Ritu Kaul,</span>
                      <br /> Principal, Delhi Public School
                    </p>
                    <p>
                      <span className="font-bold"> Mr. Mandeep Singh,</span>
                      <br /> Assistant Professor & Asst. Dean, LPU
                    </p>
                    <p>
                      <span className="font-bold"> Ms. Mamta Bhatia,</span>
                      <br /> Delhi Public School
                    </p>
                    <p>
                      <span className="font-bold"> Mr. Ruhul Choudhary,</span>
                      <br /> Innovation Officer, LPU
                    </p>
                  </div>
                  <div>
                    <>
                      <h3 className="text-yellow-500 font-bold text-xl mt-4 mb-2">
                        Contact Details
                      </h3>
                      {contacts.map((contact, index) => (
                        <div key={index} className="my-5">
                          <h2 className="font-bold">{contact.fullname}</h2>
                          <p>{contact.designation}</p>
                          {contact.phone && <p>&#9742; {contact.phone}</p>}
                          {contact.email && <p>&#9993; {contact.email}</p>}
                          {contact.photo && (
                            <img
                              src={`${URL}/api/file/view/${contact.photo}`}
                              alt={contact.fullname}
                              className="mt-2 rounded"
                            />
                          )}
                        </div>
                      ))}
                    </>
                  </div>
                </div>
              </div>
              <div className="bg-black bg-opacity-90 p-4 border border-opacity-80 border-slate-400 shadow-lg rounded-lg lg:w-1/2">
                <h2 className="text-3xl font-bold text-center  mb-4 text-yellow-500">
                  Leave us a message
                </h2>
                {formError && <p className="text-red-500 mb-4">{formError}</p>}
                {formSuccess && (
                  <p className="text-green-500 mb-4">{formSuccess}</p>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="email" className=" font-bold">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border border-slate-500 bg-transparent  p-2 rounded focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="phone" className=" font-bold">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border border-slate-500 bg-transparent  p-2 rounded focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="message" className=" font-bold">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="border border-slate-500 bg-transparent  p-2 rounded focus:outline-none focus:border-blue-500 min-h-32"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-800  py-2 px-4 rounded hover:bg-blue-700 transition hover:text-slate-300 text-xl"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        <Footer glowingBorder={false} />
      </div>
    </>
  );
};

export default Contact;
