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

    const visitorArray = Array.isArray(res.data.visitors)
      ? res.data.visitors
      : [];

    setVisitors(visitorArray);
  } catch (error) {
    console.error(error);
    alert("Failed to load visitors");
  }
};

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      alert(error.response?.data?.message || "Failed to add visitor");
    }
  };

  return (
    <div>
      <h1>Visitors</h1>

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
          value={form.host}
          onChange={handleChange}
        />

        <button>Add Visitor</button>
      </form>

      <h2>Visitor List</h2>

      {Array.isArray(visitors) &&
        visitors.map((v) => (
          <div className="visitors" key={v._id}>
            <p>
              <strong>VisitorId: </strong>
              {v._id}{" "}
            </p>
            <p>
              <strong>Name: </strong>
              {v.name}
            </p>
            <p>
              <strong>Phone: </strong>
              {v.phone}
            </p>
            <p>
              <strong>Purpose: </strong>
              {v.purpose}
            </p>
          </div>
        ))}
    </div>
  );
}

export default Visitors;
