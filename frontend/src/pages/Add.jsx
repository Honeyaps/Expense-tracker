import React, { useState } from "react";
import "../Register/sign.css"
import axios from "axios";
import {useRecoilState} from "recoil"
import { pageState } from "../../state";

axios.defaults.baseURL = "http://localhost:4000";
const Add = () => {
  const [page,setPage] = useRecoilState(pageState)
  const [title, setTitle] = useState("");
  const [tempMoney,settempMoney] = useState(0)
  const [type,setType] = useState(false)
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(type)

    let errors = {};
    if (!title) {
      errors.title = "Title is required";
    }
    if (!tempMoney) {
      errors.tempMoney = "tempMoney is required";
    } else if (isNaN(tempMoney) || parseFloat(tempMoney) <= 0) {
      errors.tempMoney = "tempMoney must be a valid positive number";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      let money = tempMoney      
      if (type === "spend") {
        money = -tempMoney
      }
      try {
        const response = await axios.post("/exp/addexp", {title,money},{
          headers:{
            authorization: localStorage.getItem("token")
          }

        });
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
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div className="form-group">
          <select onChange={(e)=>setType(e.target.value)} >
          <option >Select</option>
            <option value="spend">Spend</option>
            <option value="earn">Earn</option>
          </select>
        </div>
        <div className="form-group">
          <label>tempMoney</label>
          <input
            type="number"
            name="tempMoney"
            placeholder="Expenses in ₹/-"
            value={tempMoney}
            onChange={(e)=>settempMoney(e.target.value)}
          />
          {errors.tempMoney && <span className="error">{errors.tempMoney}</span>}
        </div>

        <button type="submit" className="form_btn">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default Add;
