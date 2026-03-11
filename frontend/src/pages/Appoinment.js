import { useEffect, useState } from "react";
import { API_AUTH  } from "../service/api";
import "./style.css";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [form, setForm] = useState({
    visitorId: "",
    hostId: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVisitors();
    fetchAppointments();
  }, []);

  const fetchVisitors = async () => {
    try {
      const res = await API_AUTH.get("/visitors");
      console.log("Visitors:", res.data);
      setVisitors(Array.isArray(res.data) ? res.data : res.data.visitors || []);
    } catch (err) {
      console.error("Error fetching visitors:", err);
      alert("Failed to load visitors.");
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await API_AUTH.get("/appointments");
      console.log("Appointments:", res.data);
      setAppointments(Array.isArray(res.data) ? res.data : res.data.appointments || []);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      alert("Failed to load appointments.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.visitorId || !form.hostId || !form.date) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await API_AUTH.post("/appointments", form);
      console.log("Appointment created:", res.data);

      fetchAppointments();

      setForm({ visitorId: "", hostId: "", date: "" });
    } catch (err) {
      console.error("Error creating appointment:", err);
      alert(err.response?.data?.message || "Failed to create appointment");
    }
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    try {
      await API_AUTH.patch(`/appointments/${id}/status`, { status });
      fetchAppointments();
    } catch (err) {
      console.error(`Failed to ${status} appointment:`, err);
      alert(`Failed to ${status} appointment`);
    }
  };

  return (
    <div>
      <h1>Appointments</h1>

      <form onSubmit={handleSubmit} className="form">
        <select name="visitorId" value={form.visitorId} onChange={handleChange}>
          <option value="">Select Visitor</option>
          {Array.isArray(visitors) && visitors.map((v) => (
            <option key={v._id} value={v._id}>{v.name}</option>
          ))}
        </select>

        <input
          type="text"
          name="hostId"
          placeholder="Host Employee ID"
          value={form.hostId}
          onChange={handleChange}
        />

        <input
          type="datetime-local"
          name="date"
          value={form.date}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Appointment"}
        </button>
      </form>

     
      <h2>Appointment List</h2>
      {Array.isArray(appointments) && appointments.length > 0 ? (
        appointments.map((a) => (
          <div className="card" key={a._id}>
            <p><strong>Visitor:</strong> {a.visitor?.name || "Unknown"}</p>
            <p><strong>Host:</strong> {a.host?.name || a.hostId}</p>
            <p><strong>Status:</strong> {a.status}</p>

            {a.status === "pending" && (
              <>
                <button onClick={() => updateStatus(a._id, "approved")}>Approve</button>
                <button onClick={() => updateStatus(a._id, "rejected")}>Reject</button>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
}

export default Appointments;