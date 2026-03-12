import { useEffect, useState } from "react";
import { API_AUTH } from "../service/api";

function Visitors() {
  const [visitors, setVisitors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "",
    host: "",
  });

  useEffect(() => {
    fetchVisitors();
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.host) {
      alert("Please fill all required fields");
      return;
    }
    try {
      await API_AUTH.post("/visitors", form);
      fetchVisitors();
      setForm({
        name: "",
        email: "",
        phone: "",
        purpose: "",
        host: "",
      });
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to add visitor");
    }
  };

  return (
    <div className="visitors-container">
      <h1>Visitors</h1>

      <form onSubmit={handleSubmit} className="visitor-form">
        <input
          name="name"
          placeholder="Visitor Name"
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
          placeholder="Phone (10 digits)"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          name="purpose"
          placeholder="Purpose of Visit"
          value={form.purpose}
          onChange={handleChange}
        />
        <input
          name="host"
          placeholder="Host Employee ID"
          value={form.host}
          onChange={handleChange}
        />

        <button type="submit">Add Visitor</button>
      </form>

      <h2>Visitor List</h2>

      {visitors.length === 0 && <p>No visitors found</p>}

      {visitors.map((v) => (
        <div className="visitor-card" key={v._id}>
          <p><strong>Visitor ID:</strong> {v._id}</p>
          <p><strong>Name:</strong> {v.name}</p>
          <p><strong>Email:</strong> {v.email}</p>
          <p><strong>Phone:</strong> {v.phone}</p>
          <p><strong>Purpose:</strong> {v.purpose}</p>
          <p><strong>Host ID:</strong> {v.host}</p>
        </div>
      ))}
    </div>
  );
}

export default Visitors;