import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Login() {

  //used to store the input values like mail,password and role

  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
    role:''
  });

  //used to handle the input changes made to input fields

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLogin((prev) => ({ ...prev, [name]: value }));
  };

  /*prevents the page from refreshing , we handle login using axios.post(), without reloading.*/

  const handleLogin = async (e) => {
    e.preventDefault();

    //Using axios.post to send email, password, and role to database 

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: userLogin.email,
        password: userLogin.password,
        role: userLogin.role
      });

      alert(`Logged in as ${userLogin.role}`);
      console.log(res.data);

      // Redirect based on role
      if (res.data.role === 'employer') {
        window.location.href = '/employer-dashboard';
      } else {
        window.location.href = '/employee-dashboard';
      }

    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="register">
      <div className="admin">
        <form onSubmit={handleLogin}>
          <label className="label">Email:</label>
          <input type="email" name="email" required onChange={handleChange} />
          <label className="label">Password:</label>
          <input type="password" name="password" required onChange={handleChange} />
          <select name="role" className="label" onChange={handleChange} required>
        <option value="">Select Role</option>
        <option value="employee">Employee</option>
        <option value="employer">Employer</option>
      </select>
      <br/>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
