import React, { useState } from "react";
import "./sign.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:4000";

const Add = () => {
  const [formData, setFormData] = useState({
    title: "",
    money: "",
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
    if (!formData.title) {
      errors.title = "Title is required";
    }
    if (!formData.money) {
      errors.money = "Money is required";
    } else if (isNaN(formData.money) || parseFloat(formData.money) <= 0) {
      errors.money = "Money must be a valid positive number";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        // const response = await axios.post("/expenses/add", formData);
        navigate("/");
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to add expense. Please try again.");
      }
    }
  };

  return (
    <div className="expense-form-container">
      <h2>Add Expense</h2>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div className="form-group">
          <label>Money</label>
          <input
            type="text"
            name="money"
            value={formData.money}
            onChange={handleChange}
          />
          {errors.money && <span className="error">{errors.money}</span>}
        </div>

        <button type="submit" className="form_btn">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default Add;
