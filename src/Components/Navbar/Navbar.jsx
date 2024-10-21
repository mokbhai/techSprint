import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "../../Assets/ts2.png";
// import logo from "../../Assets/dps.png";
import lpulogo from "../../Assets/logo-lpu.svg";
import naaclogo from "../../Assets/naac-logo.svg";
import iiclogo from "../../Assets/iiclogo.png";
import "./Navbar.css";

const DekstopNav = () => {
  return (
    <nav className="bg-transparent opacity-80">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4 bg-slate-400 font-sans">
        {/* Logos and Navigation Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full">
          {/* Logos Section (Left) */}
          <div className="flex items-center gap-x-3 sm:mb-0 px-2">
            <img className="w-44 h-auto" src={lpulogo} alt="LPU Logo" />
            <img className="w-32 h-auto" src={naaclogo} alt="NAAC Logo" />
            <img className="w-40 h-auto" src={iiclogo} alt="IIC Logo" />
            <img className="w-24 h-auto" src={logo} alt="DPS logo" />
          </div>

          {/* Navigation Section (Center) */}
          <ul className="flex flex-wrap justify-center gap-x-4 sm:space-x-2 text-black font-bold ">
            <li>
              <a
                href="/"
                className="hover:text-blue-600 transition duration-300"
              >
                HOME
              </a>
            </li>
            <li>
              <a
                href="/events"
                className="hover:text-blue-600 transition duration-300"
              >
                EVENTS
              </a>
            </li>
            <li>
              <a
                href="/gallery"
                className="hover:text-blue-600 transition duration-300"
              >
                GALLERY
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-blue-600 transition duration-300"
              >
                ABOUT
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-blue-600 transition duration-300"
              >
                CONTACT US
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const l1 = [
  { src: lpulogo, alt: "LPU Logo" },
  { src: naaclogo, alt: "NAAC Logo" },
];
const l2 = [
  { src: logo, alt: "DPS logo" },
  { src: iiclogo, alt: "IIC Logo" },
];

const MobileNav = () => {
  const [logos, setLogos] = useState(l2);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // Start fade out
      setTimeout(() => {
        setLogos((prevLogos) => (prevLogos === l1 ? l2 : l1));
        setFade(false); // Start fade in
      }, 500); // Duration of fade out
    }, 3000); // Switch logos every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <nav className="flex items-center justify-center bg-gray-900 py-2 w-full z-50 font-sans">
      <div className="w-full px-4 bg-slate-400 ">
        <div
          className="w-full flex flex-wrap items-center justify-center h-20" // or min-h-20 if you need a minimum height
          style={{
            opacity: fade ? 0 : 1,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          {logos.map((logo, index) => (
            <img
              key={index}
              className={logo.src !== naaclogo ? "h-16 logo" : "h-10 logo"}
              src={logo.src}
              alt={logo.alt}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

const Navbar = () => {
  const [isMobileNav, setIsMobileNav] = useState(
    window.matchMedia("(max-width: 1080px)").matches
  ); // Use matchMedia

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1080px)");

    const handleMediaChange = (e) => {
      setIsMobileNav(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange); // Use addEventListener

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange); // Clean up on unmount
    };
  }, []);

  return (
    <nav>
      {" "}
      {isMobileNav ? (
        <MobileNav /> 
      ) : (
        <DekstopNav />
      )}
    </nav>
  );
};

export default Navbar;
