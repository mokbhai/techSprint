import React, { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Events from "./Pages/Events/Events";
import Login from "./Components/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { EventsProvider } from "./Components/EventsContext";
import Eventpage from "./Pages/Eventpage/Eventpage";
import "./App.css";
import InternetConnectionChecker from "./InternetConnectionChecker.jsx";
import { AlertProvider } from "./AlertContext.js";
import LoadingCircle from "./Components/lodingCircle";
import Helmet from "react-helmet";

const Home = React.lazy(() => import("./Pages/Home/Home"));
const Registration = React.lazy(() =>
  import("./Pages/Registration/Registration")
);
const Gallery = React.lazy(() => import("./Pages/Gallery/Gallery"));
const Contact = React.lazy(() => import("./Pages/Contact/Contact"));
const About = React.lazy(() => import("./Pages/About/About"));

String.prototype.toTitleCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.toUpperCase();
  });
};

function App() {
  return (
    <AlertProvider>
      <EventsProvider>
        <BrowserRouter>
          <InternetConnectionChecker />
          <Suspense fallback={<LoadingCircle />}>
            <Helmet>
              <title>TechSprint - LPU</title>
              <meta
                name="description"
                content="Registraion Open 5th to 12th Class Students"
              />
            </Helmet>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/event/:id" element={<Eventpage />} />

              <Route path="/adminlogin" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </EventsProvider>
    </AlertProvider>
  );
}

export default App;
