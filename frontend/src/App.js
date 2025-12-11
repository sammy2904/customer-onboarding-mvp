import React, { useState } from "react";
import axios from "axios";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", gstin: "", password: "" });

  // Handle typing in boxes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Register Function
  const submitRegister = async () => {
    try {
      await axios.post("http://localhost:5000/register", form);
      alert("✅ Registered Successfully! Now please Login.");
      setIsLogin(true); // Switch to login screen
    } catch (err) {
      alert("❌ Error: " + (err.response?.data?.message || "Registration Failed"));
    }
  };

  // Login Function
  const submitLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", form);
      alert("✅ " + res.data.message); 
    } catch (err) {
      alert("❌ Error: " + (err.response?.data || "Login Failed"));
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <div style={{ padding: "40px", border: "1px solid #ccc", borderRadius: "10px", width: "300px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center" }}>{isLogin ? "Login" : "Register"}</h2>

        {!isLogin && (
          <>
            <input name="name" placeholder="Full Name" onChange={handleChange} style={inputStyle} />
            <input name="gstin" placeholder="GSTIN (Optional)" onChange={handleChange} style={inputStyle} />
          </>
        )}

        <input name="email" placeholder="Email Address" onChange={handleChange} style={inputStyle} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} style={inputStyle} />

        {isLogin ? (
          <button onClick={submitLogin} style={buttonStyle}>Login</button>
        ) : (
          <button onClick={submitRegister} style={buttonStyle}>Register</button>
        )}

        <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer", color: "blue", textAlign: "center", marginTop: "15px" }}>
          {isLogin ? "No account? Register here" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

const inputStyle = { width: "93%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" };
const buttonStyle = { width: "100%", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" };

export default App;

