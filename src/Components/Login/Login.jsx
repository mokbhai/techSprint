import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import bgImage from "../../Assets/marssurface.jpg";
import RevolvingPhotos from "../RevolvingPhotos/RevolvingPhotos";
import URL from "../../apiconfig";
import { OtpPopup } from "../ConfirmationPopup/ConfirmationPopup";
import { useAlert } from "../../AlertContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState("");
  const alert = useAlert();

  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(`${URL}/api/user/login`, {
  //       email,
  //       password,
  //     });
  //     localStorage.setItem("token", `Bearer ${response.data.token}`);

  //     console.log(response.data);
  //     navigate("/dashboard");
  //   } catch (error) {
  //     setErrorMessage("Invalid credentials");
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URL}/api/user/login`, {
        email,
        password,
      });
      // console.log(response);

      if (response.data.status == true) {
        setShowOtpPopup(true);
        localStorage.setItem("otptoken", `Bearer ${response.data.token}`);
      } else {
        setErrorMessage(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  const handleOtpSubmit = async (enteredOtp) => {
    try {
      // Verify the OTP (you'll need a backend endpoint for this)
      const token = localStorage.getItem("otptoken");
      const otpVerificationResponse = await axios.post(
        `${URL}/api/user/login-otp`,
        {
          otp: enteredOtp,
        },
        {
          headers: {
            Authorization: token, // Add the token to the Authorization header
          },
        }
      );

      if (otpVerificationResponse.data.status) {
        // Check the response structure from your backend
        localStorage.setItem(
          "token",
          `Bearer ${otpVerificationResponse.data.token}`
        );
        setShowOtpPopup(false);

        navigate("/dashboard");
      } else {
        setErrorMessage("Invalid OTP");
        alert("Invalid OTP");
      }
    } catch (error) {
      setErrorMessage("Error verifying OTP");
      alert("Error verifying OTP");
      setShowOtpPopup(false);
    }
  };

  const handleOtpClose = () => {
    setShowOtpPopup(false);
  };

  const handleForgotPassword = () => {
    alert("Please contact the system administrator to reset your password.");
  };

  return (
    <div
      className="flex flex-row text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <RevolvingPhotos />
      <div className="w-1/2 h-screen flex flex-col justify-center items-center">
        <button
          className="rounded-full bg-blue-400 text-gray-800 font-bold p-6 mb-4"
          onClick={handleHome}
        >
          Home
        </button>
        <form
          className="w-3/4 flex flex-col items-center gap-5 m-20 border-2 border-white rounded-xl py-12"
          onSubmit={handleLogin}
        >
          <h1 className="text-4xl">Welcome Back Admin!</h1>
          <div className="flex flex-col w-3/4 p-2">
            <label className="text-2xl">User ID:</label>
            <input
              className="rounded-sm h-12 text-black p-2 text-center"
              type="email"
              value={email}
              placeholder="Enter User ID"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col w-3/4 p-2">
            <label className="text-2xl">Password:</label>
            <input
              className="rounded-sm h-12 text-black p-2 text-center"
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button onClick={handleForgotPassword} className="text-xl">
            Forgot Password?
          </button>
          {errorMessage && (
            <p className="error-message text-red-500">{errorMessage}</p>
          )}
          <button
            className="bg-lime-500 p-2 w-64 rounded-xl text-xl"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
      {showOtpPopup && (
        <OtpPopup
          email={email}
          onClose={handleOtpClose}
          onSubmit={handleOtpSubmit}
        />
      )}
    </div>
  );
};

export default Login;
