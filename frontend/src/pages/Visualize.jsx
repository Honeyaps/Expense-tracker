import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { datastate } from "../../state";
import Doughnutchart from "../component/piechart";
// import "home.css";

const Visualize = () => {
  const [select, setSelect] = useState("month");
  const [data] = useRecoilState(datastate);
  const [expenses, setExpenses] = useState([]);

  const date = new Date();
  const month = date.getMonth();
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = date.getDate();
  const week = today - 7;

  //filter month
  const monthlyExpenditure = data.filter(
    (item) => parseInt(item.date.slice(5, 7)) === month + 1
  );

  const todayExpenditure = data.filter(
    (item) =>
      parseInt(item.date.slice(5, 7)) === month + 1 &&
      parseInt(item.date.slice(8, 10)) === today
  );

  const weekExpenditure = data.filter(
    (item) =>
      parseInt(item.date.slice(5, 7)) === month + 1 &&
      parseInt(item.date.slice(8, 10)) >= week &&
      parseInt(item.date.slice(8, 10)) <= today
  );

  console.log(todayExpenditure);
  console.log(weekExpenditure);

  let spend = 0;
  let earn = 0;

  if (select === "month") {
    monthlyExpenditure.forEach((item) => {
      if (item.money > 0) {
        earn += item.money;
      } else {
        spend += item.money;
      }
    });

    if (spend < earn) {
      earn += spend;
    } else {
      earn = 0;
    }
  } else if (select === "today") {
    todayExpenditure.forEach((item) => {
      if (item.money > 0) {
        earn += item.money;
      } else {
        spend += item.money;
      }
    });

    if (spend < earn) {
      earn += spend;
    } else {
      earn = 0;
    }
  } else {
    weekExpenditure.forEach((item) => {
      if (item.money > 0) {
        earn += item.money;
      } else {
        spend += item.money;
      }
    });

    if (spend < earn) {
      earn += spend;
    } else {
      earn = 0;
    }
  }

  useEffect(() => {
    if (select === "month") {
      setExpenses(monthlyExpenditure);
    } else if (select === "today") {
      setExpenses(todayExpenditure);
    } else {
      setExpenses(weekExpenditure);
    }
  }, [select]);

  //percentage
  const total = Math.abs(spend) + earn;
  const spendp = (Math.abs(spend) / total) * 100;
  const earnp = (earn / total) * 100;

  const values = {
    Spend: spend,
    Earn: earn,
  };

  return (
    <>
      <div className="choose_box">
        <ul className="select_list">
          <li
            className={`day ${select === "today" ? "active" : null}`}
            onClick={() => {
              setSelect("today");
            }}
          >
            Day
          </li>
          <li
            className={`day ${select === "week" ? "active" : null}`}
            onClick={() => {
              setSelect("week");
            }}
          >
            Week
          </li>
          <li
            className={`day ${select === "month" ? "active" : null}`}
            onClick={() => {
              setSelect("month");
            }}
          >
            Month
          </li>
        </ul> 
      </div>

      <h1 className="month">{months[month]}</h1>

      <Doughnutchart values={values} title="current month expenditure" />

      <div className="perc">
        <h2>
          Spend: <span className="spend_label">{spendp.toFixed(0)}%</span>
        </h2>
        <br></br>
        <h2>
          Earn: <span className="earn_label">{earnp.toFixed(0)}%</span>
        </h2>
      </div>

      <div className="select_table">
        {expenses && expenses.length > 0 ? (
          <table>
            <thead>
              <tr>
              <th>Sr.no</th>
                <th>Date</th>
                <th>Title</th>
                <th>Expense</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={index}>
                  <td>{index + 1}.</td>
                  <td>{expense.date}</td>
                  <td className="title">{expense.title}</td>
                  
                  <td
                    className={`${
                      expense.money < 0 ? "negative" : "positive"
                    }`}
                  >
                    ₹{expense.money}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h4 className="nodata">No data found</h4>
        )}
      </div>
    </>
  );
};

export default Visualize;
