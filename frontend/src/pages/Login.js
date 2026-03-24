import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://golf-backend-u9kw.onrender.com/login",
        {
          email,
          password,
        }
      );

      if (res.data.message === "Login successful") {
        localStorage.setItem("email", email);
        navigate("/dashboard");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "https://golf-backend-u9kw.onrender.com/signup",
        {
          email,
          password,
        }
      );

      alert(res.data.message);
    } catch (error) {
      alert("Signup failed");
    }
  };

  return (
    <div className="container">
      <h2>Golf Charity Platform</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Login;