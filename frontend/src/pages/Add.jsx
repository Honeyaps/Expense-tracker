import React, { useEffect, useState } from "react";
import "../Register/sign.css";
import axios from "axios";
import { useRecoilState } from "recoil";
import { pageState } from "../../state";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:4000";

const Add = () => {
  const [page, setPage] = useRecoilState(pageState);
  const [title, setTitle] = useState("");
  const [tempMoney, setTempMoney] = useState(0);
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};

    if (!title) {
      errors.title = "Title is required";
    }

    if (!type) {
      errors.type = "Type is required";
    }

    if (!tempMoney) {
      errors.tempMoney = "Expenses are required";
    } else if (isNaN(tempMoney) || parseFloat(tempMoney) <= 0) {
      errors.tempMoney = "Expenses must be a valid positive number";
    }

    if (!date) {
      errors.date = "Date is required";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      let money = type === "spend" ? -tempMoney : parseInt(tempMoney);
      try {
        const response = await axios.post(
          "/exp/addexp",
          { title, money, date },
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        );
        setPage("home");
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to add expense. Please try again.");
      }
    }
  };

  return (
    <div className="expense-form-container">
      <h2>Add Expense</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div className="form-group">
          <select
            onChange={(e) => setType(e.target.value)}
            className="selectbox"
          >
            <option value="">Select</option>
            <option value="spend">Spend</option>
            <option value="earn">Earn</option>
          </select>
          {errors.type && <span className="error">{errors.type}</span>}
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="date_box"
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>
        <div className="form-group">
          <label>Expenses</label>
          <input
            className="exp_box"
            type="number"
            name="tempMoney"
            placeholder="Expenses in ₹/-"
            onChange={(e) => setTempMoney(e.target.value)}
          />
          {errors.tempMoney && (
            <span className="error">{errors.tempMoney}</span>
          )}
        </div>

        <button type="submit" className="form_btn">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default Add;
