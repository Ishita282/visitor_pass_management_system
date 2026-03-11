import { useState } from "react";
import { API_PUBLIC } from "../service/api";
import "./style.css";

function Login() {
  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState("visitor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API_PUBLIC.post("/register/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  // SIGNUP
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await API_PUBLIC.post("/register/signup", {
        name,
        email,
        password,
        role,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
      alert("Signup failed");
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
              onChange={(e) => setName(e.target.value)}
            />

            <select onChange={(e) => setRole(e.target.value)}>
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
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          {isSignup ? "Signup" : "Login"}
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        {isSignup ? "Already have an account?" : "Don't have an account?"}

        <button
          type="button"
          onClick={() => setIsSignup(!isSignup)}
          style={{ marginLeft: "10px" }}
        >
          {isSignup ? "Login" : "Signup"}
        </button>
      </p>
    </div>
  );
}

export default Login;