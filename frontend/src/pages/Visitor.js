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
    photo: null,
  });

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const res = await API_AUTH.get("/visitors");
      setVisitors(res.data.visitors || []);
    } catch (err) {
      alert("Failed to load visitors");
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setForm({ ...form, photo: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.host) {
      alert("Please fill all required fields");
      return;
    }
    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("email", form.email);
      data.append("phone", form.phone);
      data.append("purpose", form.purpose);
      data.append("host", form.host);
      if (form.photo) data.append("photo", form.photo);
      await API_AUTH.post("/visitors", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchVisitors();
      setForm({ name: "", email: "", phone: "", purpose: "", host: "", photo: null });
    } catch (err) {
      alert("Failed to add visitor");
    }
  };

  return (
    <div>
      <h1>Visitors</h1>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Visitor Name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="purpose" placeholder="Purpose" value={form.purpose} onChange={handleChange} />
        <input name="host" placeholder="Host ID" value={form.host} onChange={handleChange} />
        <input type="file" name="photo" accept="image/*" onChange={handleChange} />
        <button type="submit">Add Visitor</button>
      </form>

      <h2>Visitor List</h2>
      {visitors.length === 0 && <p>No visitors found</p>}
      {visitors.map((v) => (
        <div key={v._id}>
          <p>Name: {v.name}</p>
          <p>Email: {v.email}</p>
          <p>Phone: {v.phone}</p>
          <p>Purpose: {v.purpose}</p>
          <p>Host ID: {v.host}</p>
          {v.photo && <img src={`/${v.photo}`} alt={v.name} width="100" />}
        </div>
      ))}
    </div>
  );
}

export default Visitors;