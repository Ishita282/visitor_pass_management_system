import { useEffect, useState } from "react";
import { API_AUTH } from "../service/api";
import "./style.css";

function Appointments() {

  const [appointments, setAppointments] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [form, setForm] = useState({
    visitorId: "",
    hostId: "",
    date: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVisitors();
    fetchAppointments();
  }, []);

  const fetchVisitors = async () => {
    try {
      const res = await API_AUTH.get("/visitors");
      setVisitors(res.data.visitors || []);
    } catch (error) {
      console.log(error);
      alert("Failed to load visitors");
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await API_AUTH.get("/appointments");
      setAppointments(res.data.appointments || []);
    } catch (error) {
      console.log(error);
      alert("Failed to load appointments");
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
      await API_AUTH.post("/appointments", form);
      fetchAppointments();

      setForm({
        visitorId: "",
        hostId: "",
        date: ""
      });

    } catch (error) {
      alert(error.response?.data?.message || "Failed to create appointment");
    }

    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    try {
      await API_AUTH.patch(`/appointments/${id}/status`, { status });
      fetchAppointments();
    } catch {
      alert("Failed to update appointment status");
    }
  };

  return (
    <div>
      <h1>Appointments</h1>

      <form onSubmit={handleSubmit} className="form">

        <select
          name="visitorId"
          value={form.visitorId}
          onChange={handleChange}
        >
          <option value="">Select Visitor</option>

          {visitors.map(v => (
            <option key={v._id} value={v._id}>
              {v.name}
            </option>
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

        <button disabled={loading}>
          {loading ? "Creating..." : "Create Appointment"}
        </button>

      </form>

      <h2>Appointment List</h2>

      {appointments.length === 0 && <p>No appointments found</p>}

      {appointments.map(a => (

        <div className="card" key={a._id}>

          <p><b>Visitor:</b> {a.visitor?.name}</p>
          <p><b>Host:</b> {a.host?.name}</p>
          <p><b>Status:</b> {a.status}</p>

          {a.status === "pending" && (
            <>
              <button onClick={() => updateStatus(a._id, "approved")}>
                Approve
              </button>

              <button onClick={() => updateStatus(a._id, "rejected")}>
                Reject
              </button>
            </>
          )}

        </div>
      ))}

    </div>
  );
}

export default Appointments;