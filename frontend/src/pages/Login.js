import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();   // ✅ FIX

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (res.data.message === "Login successful") {
        localStorage.setItem("email", email);
        navigate("/dashboard");   // now works
      } else {
        alert("Login failed");
      }
    } catch (error) {
      alert("Invalid credentials");
    }
  };
  console.log(email, password);
const handleSignup = async () => {
  try {
    const res = await axios.post("http://localhost:5000/signup", {
      email,
      password,
    });

    alert(res.data.message);
  } catch (error)
   {console.log(email, password);


    alert("Signup failed");
  }
};

  return (
  <div className="container">
    <h2>Login</h2>

    <input
      type="email"
      placeholder="Enter Email"
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Enter Password"
      onChange={(e) => setPassword(e.target.value)}
    />

    <button onClick={handleLogin}>Login</button>
    <button onClick={handleSignup}>Signup</button>
  </div>
);
}

export default Login;