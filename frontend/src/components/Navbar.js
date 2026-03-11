import { Link } from "react-router-dom";
import "./styleNav.css"

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/register">Register</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/visitors">Visitors</Link>
      <Link to="/appointments">Appointments</Link>
      <Link to="/pass">Pass</Link>
      <Link to="/scanner">Scanner</Link>
    </div>
  );
}

export default Navbar;