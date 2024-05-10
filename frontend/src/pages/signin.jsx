import React, { useState } from "react";
import "./sign.css"; // Import CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:4000";

const SigninForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("/user/signin", formData);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } catch (error) {
        alert("user not found");
      }
    }
  };

  return (
    <div className="signin-form-container">
      <h2>Sign in</h2>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="enter your email address"
            value={formData.email}
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
        <Link to="/email" className="frgt_pass">
          Forgott Password
        </Link>
        <br></br>
        <br></br>
        <button type="submit" className="form_btn">
          Sign in
        </button>
        <p className="lower_txt">
          Create a new account?{" "}
          <Link to="/signup" className="signin_link">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SigninForm;
