import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import URL from "../apiconfig";

const EventsContext = createContext();

const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const EXPIRY_TIME = 60 * 60 * 1000; // 1 hour in milliseconds
  // const EXPIRY_TIME = 60; // 60 milliseconds

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${URL}/api/event/filter?v=${new Date().getTime()}`);
        // console.log(response.data.events);
        const eventsData = response.data.events;
        const expiryTimestamp = Date.now() + EXPIRY_TIME;

        // Store events with expiry timestamp
        localStorage.setItem(
          "events",
          JSON.stringify({ events: eventsData, expiry: expiryTimestamp })
        );
        setEvents(eventsData);
        if (!eventsData) setEvents([])
        setLoading(false);
        // console.log(eventsData)
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    const storedData = localStorage.getItem("events");
    // const storedData = 0;
    if (storedData) {
      const { events, expiry } = JSON.parse(storedData);
      if (Date.now() < expiry) {
        // If the data is still valid, use it
        setEvents(events);
        setLoading(false);
      } else {
        // If the data has expired, fetch new events
        fetchEvents();
      }
    } else {
      fetchEvents();
    }
  }, []);

  return (
    <EventsContext.Provider value={{ events, loading }}>
      {children}
    </EventsContext.Provider>
  );
};

export { EventsContext, EventsProvider };
