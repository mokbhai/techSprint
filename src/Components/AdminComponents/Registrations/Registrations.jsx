import React, { useState, useEffect } from "react";
import URL from "../../../apiconfig";
import axios from "axios";
import { useAlert } from "../../../AlertContext";

const Registrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRegistrations: 1,
  });
  const [filters, setFilters] = useState({
    teamName: "",
    isDeleted: "false",
    paymentStatus: "",
    teamId: "",
  });
  const alert = useAlert();

  useEffect(() => {
    const fetchRegistrations = async () => {
      setLoading(true);
      try {
        const response = await fetch(URL + "/api/registration/filter", {
          method: "POST",
          headers: {
            authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ page, ...filters }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPages({
          currentPage: data.currentPage,
          totalPages: data.totalPages,
          totalRegistrations: data.totalRegistrations,
        });
        setRegistrations(data.registrations);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [page, filters]);

  const handleDownloadAll = async () => {
    try {
      const response = await fetch(URL + "/api/registration/download", {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(filters),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "registrations.csv"; // Adjust the filename and extension as needed
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDeleteRegistration = async (registrationId) => {
    try {
      const response = await axios.delete(
        `${URL}/api/registration/${registrationId}`,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        // Check for successful deletion
        alert("Registration deleted successfully!");
        // Update the registrations state to reflect the deletion
        setRegistrations(
          registrations.filter((reg) => reg._id !== registrationId)
        );
      } else {
        alert("Error deleting registration. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting registration:", error);
      alert("Error deleting registration. Please try again.");
    }
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (error) return <div style={styles.error}>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>
        Total Registrations - {pages.totalRegistrations}{" "}
        <button style={styles.button} onClick={handleDownloadAll}>
          Download All
        </button>
      </h1>
      <form style={styles.form}>
        <input
          type="text"
          name="teamId"
          placeholder="Team ID"
          value={filters.teamId}
          onChange={handleFilterChange}
          style={styles.input}
        />
        <input
          type="text"
          name="teamName"
          placeholder="Team Name"
          value={filters.teamName}
          onChange={handleFilterChange}
          style={styles.input}
        />
        <select
          name="isDeleted"
          defaultValue="true"
          value={filters.isDeleted}
          onChange={handleFilterChange}
          style={styles.select}
        >
          <option value="">All</option>
          <option value="true">Deleted</option>
          <option value="false">Not Deleted</option>
        </select>
        <select
          name="paymentStatus"
          value={filters.paymentStatus}
          onChange={handleFilterChange}
          style={styles.select}
        >
          <option value="">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
        <button type="button" onClick={() => setPage(1)} style={styles.button}>
          Apply Filters
        </button>
      </form>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Team Id</th>
            <th style={styles.th}>Team Name</th>
            <th style={styles.th}>Registered Events</th>
            <th style={styles.th}>Payment Status</th>
            <th style={styles.th}>Amount</th>
            <th style={styles.th}>School</th>
            <th style={styles.th}>Team Members</th>
          </tr>
        </thead>
        <tbody>
          {registrations &&
            registrations.map((registration) => (
              <tr key={registration._id || registration.id}>
                <td style={styles.td}>{registration.teamId || "--"}</td>
                <td style={styles.td}>{registration.teamName}</td>
                <td style={styles.td}>
                  {registration.eventIds &&
                    registration.eventIds
                      .map((event) => event.eventName)
                      .join(", ")}
                </td>
                <td style={styles.td}>
                  {registration.payment.paymentStatus &&
                    registration.payment.paymentStatus}
                </td>
                <td style={styles.td}>{registration.amount}</td>
                <td style={styles.td}>{registration.school}</td>
                <td style={styles.td}>
                  <p>mentor: {registration.mentor}</p>
                  <ul style={styles.list}>
                    {registration.team &&
                      registration.team.map((member) => (
                        <li key={member._id} style={styles.listItem}>
                          {member.fullname || member.fullName} ({member.email})
                          - {member.phoneNumber} - {member.class} -{" "}
                          {member.optAccomodation
                            ? "Accommodation Opted"
                            : "No Accommodation"}{" "}
                          - {member.gender}
                        </li>
                      ))}
                  </ul>
                </td>
                <td style={styles.td}>
                  {/* Add delete button cell */}
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDeleteRegistration(registration._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div style={styles.pagination}>
        <p>
          Page {pages.currentPage}/{pages.totalPages}
        </p>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          hidden={page === 1}
          style={styles.button}
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === pages.totalPages}
          hidden={page === pages.totalPages}
          style={styles.button}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "20px", fontFamily: "Arial, sans-serif" },
  header: { textAlign: "center", marginBottom: "20px" },
  form: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  input: {
    padding: "8px",
    marginRight: "10px",
    flex: "1",
    color: "black",
    backgroundColor: "LightGray",
  },
  select: {
    padding: "8px",
    marginRight: "10px",
    flex: "1",
    color: "black",
    backgroundColor: "LightGray",
  },
  button: {
    padding: "10px 10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
    color: "black",
  },
  th: { border: "1px solid #ddd", padding: "10px", backgroundColor: "grey" },
  td: { border: "1px solid #ddd", padding: "10px", textAlign: "center" },
  list: { listStyleType: "none", padding: "0" },
  listItem: { marginBottom: "5px" },
  pagination: { textAlign: "center" },
  loading: { textAlign: "center", fontSize: "18px", color: "#007BFF" },
  error: { textAlign: "center", fontSize: "18px", color: "red" },
};

export default Registrations;
