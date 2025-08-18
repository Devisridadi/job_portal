import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Register() {
  

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    role:""
  });

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.cPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role
      });

      alert(`Registration successful as ${userData.role}`);
      console.log(res.data);
    } catch (err) {
      alert("Something went wrong: " + err.message);
      console.error("Full error:", err);

    }
  };

  return (
    <div className="register">
      <div className="admin">
        <form onSubmit={handleSubmit}>
          <label className="label">UserName:</label>
          <input type="text" name="name" required onChange={handleUserChange} />
          <label className="label">Email:</label>
          <input type="email" name="email" required onChange={handleUserChange} />
          <label className="label">Password:</label>
          <input type="password" name="password" required onChange={handleUserChange} />
          <label className="label">Confirm Password:</label>
          <input type="password" name="cPassword" required onChange={handleUserChange} />
          <select name="role" className="label" onChange={handleUserChange} required>
            <option value="">Select Role</option>
            <option value="employee">Employee</option>
            <option value="employer">Employer</option>
          </select>
          <br></br>
          <button type="submit">Register</button>
          <p style={{ fontWeight: 'lighter' }}>Already have an account?</p>
          <a href="/login">Login</a>
        </form>
      </div>
    </div>
  );
}

export default Register;
