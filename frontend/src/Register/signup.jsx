import React, { useState } from "react";
import axios from "axios";
import "./sign.css";
import { useNavigate, Link } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:4000/";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};
    if (!formData.username) {
      errors.username = "Username is required";
    }
    if (!formData.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("/user/signup", formData);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name",response.data.name)
        setFormData({
          username: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/");
      } catch (error) {
        console.error("Error:", error);
        alert("Email id already exists");
      }
    }
  };

  return (
    <div className="signup-form-container">
      <h2>Sign Up</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder="John"
            onChange={handleChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div className="form-group">
          <label>Phone No:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            placeholder="+91 7814998055"
            onChange={handleChange}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="johnandrew@gmail.com"
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="enter password"
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="confirm password"
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>
        <button type="submit" className="form_btn">
          Sign Up
        </button>
        <p className="lower_txt">
          Already have an account?{" "}
          <Link to="/" className="signin_link">
            Signin
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
