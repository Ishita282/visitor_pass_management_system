import { useState } from "react";
import { API_PUBLIC } from "../service/api";
import "./style.css";

function Register() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("visitor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill email and password");
      return;
    }
    try {
      const res = await API_PUBLIC.post("/register/login", { email, password });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      console.log(err);
      alert("Login failed. Check email/password.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API_PUBLIC.post("/register/signup", {
        name,
        email,
        password,
        role,
      });
      alert("Signup successful! Please login.");
      setIsSignup(false);
    } catch (err) {
      console.log(err);
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignup ? "Signup" : "Login"}</h2>

      <form onSubmit={isSignup ? handleSignup : handleLogin}>
        {isSignup && (
          <>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="visitor">Visitor</option>
              <option value="employee">Employee</option>
              <option value="security">Security</option>
              <option value="admin">Admin</option>
            </select>
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isSignup ? "Signup" : "Login"}</button>
      </form>

      <p>
        {isSignup ? "Already have an account?" : "Don't have an account?"}
        <br />
        <br />
        <button onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Login" : "Signup"}
        </button>
      </p>
    </div>
  );
}

export default Register;
