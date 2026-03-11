import { useEffect, useState } from "react";
import { API_AUTH, API_PUBLIC } from "../service/api";
import "./style.css";

function Visitors() {
  const [visitors, setVisitors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "",
  });

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const res = await API_AUTH.get("/visitors");
      setVisitors(Array.isArray(res.data) ? res.data : res.data.visitors);
    } catch (err) {
      console.error("Error fetching visitors:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API_PUBLIC.post("/visitors", form);
      console.log(res.data); 
      fetchVisitors(); 
      setForm({ name: "", email: "", phone: "", purpose: "", host: "" });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add visitor");
    }
  };

  return (
    <div>
      <h1>Visitors</h1>

      {/* Visitor Form */}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          name="purpose"
          placeholder="Purpose"
          value={form.purpose}
          onChange={handleChange}
        />
        <input
          name="host"
          placeholder="Host Employee ID"
          value={form.host || ""}
          onChange={handleChange}
        />
        <button type="submit">Add Visitor</button>
      </form>

      {/* Visitor List */}
      <h2>Visitor List</h2>
      {Array.isArray(visitors) &&
        visitors.map((v) => (
          <div className="card" key={v._id}>
            <strong>{v.name}</strong>
            <p>Phone: {v.phone}</p>
            <p>Purpose: {v.purpose}</p>
          </div>
        ))}
    </div>
  );
}

export default Visitors;
