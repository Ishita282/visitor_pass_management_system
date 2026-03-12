import { useEffect, useState } from "react";
import { API_AUTH } from "../service/api";
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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchVisitors();
    fetchAppointments();
  }, []);

  const fetchVisitors = async () => {
    try {
      const res = await API_AUTH.get("/visitors");
      setVisitors(res.data || []);
    } catch (error) {
      console.error(error);
      alert("Failed to load visitors");
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await API_AUTH.get("/appointments");
      setAppointments(res.data || []);
    } catch (error) {
      console.error(error);
      alert("Failed to load appointments");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.visitorId) newErrors.visitorId = "Visitor is required";
    if (!form.hostId) newErrors.hostId = "Host ID is required";
    if (!form.date) newErrors.date = "Date and time are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      await API_AUTH.post("/appointments", form);
      fetchAppointments();
      setForm({ visitorId: "", hostId: "", date: "" });
    } catch (error) {
      alert(error.response?.data?.msg || "Failed to create appointment");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API_AUTH.patch(`/appointments/${id}/status`, { status });
      fetchAppointments();
    } catch (error) {
      alert("Failed to update appointment status");
    }
  };

  return (
    <div className="appointments-page">
      <h1>Appointments</h1>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Visitor</label>
          <select
            name="visitorId"
            value={form.visitorId}
            onChange={handleChange}
          >
            <option value="">Select Visitor</option>
            {visitors.map((v) => (
              <option key={v._id} value={v._id}>
                {v.name}
              </option>
            ))}
          </select>
          {errors.visitorId && <span className="error">{errors.visitorId}</span>}
        </div>

        <div className="form-group">
          <label>Host Employee ID</label>
          <input
            type="text"
            name="hostId"
            value={form.hostId}
            onChange={handleChange}
          />
          {errors.hostId && <span className="error">{errors.hostId}</span>}
        </div>

        <div className="form-group">
          <label>Date & Time</label>
          <input
            type="datetime-local"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>

        <button disabled={loading}>
          {loading ? "Creating..." : "Create Appointment"}
        </button>
      </form>

      <h2>Appointment List</h2>
      {appointments.length === 0 && <p>No appointments found</p>}

      <div className="appointments-list">
        {appointments.map((a) => (
          <div className="card" key={a._id}>
            <p>
              <b>Visitor:</b> {a.visitor?.name}
            </p>
            <p>
              <b>Host:</b> {a.host?.name}
            </p>
            <p>
              <b>Status:</b> {a.status}
            </p>

            {a.status === "pending" && (
              <div className="action-buttons">
                <button onClick={() => updateStatus(a._id, "approved")}>
                  Approve
                </button>
                <button onClick={() => updateStatus(a._id, "rejected")}>
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Appointments;