import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:4050";

const Email = () => {
  const [formData, setFormData] = useState({
    email: "",
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
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const otp = Math.floor(1000 + Math.random() * 9000);

        const response = await axios.post("/user/otp", {
          email: formData.email,
          OTP: otp,
        });
        localStorage.setItem("Email", response.data);
        navigate("/otp", { state: { otp: { otp } } });
      } catch (error) {
        alert("user not found");
      }
    }
  };

  return (
    <div className="email-form-container">
      <h2>Password Assistance</h2>
      <br></br>
      <p>Enter the email address assossiated with your Moneyfy account.</p>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="enter your email address"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <button type="submit" className="form_btn">
          Continue
        </button>
      </form>
    </div>
  );
};

export default Email;
