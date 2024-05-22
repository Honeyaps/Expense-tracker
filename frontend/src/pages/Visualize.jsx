import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { datastate } from "../../state";
import Doughnutchart from "../component/piechart";
import "./page.css";

const Visualize = () => {
  const [user, setUser] = useState([]);
  const [select, setSelect] = useState("month");
  const [data] = useRecoilState(datastate);

  // Filter monthly data
  const date = new Date();
  const month = date.getMonth();
  const months = [
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

  //filter monthly data
  const monthlyData = data.filter(
    (item) => parseInt(item.date.slice(5, 7)) === month + 1
  );

  //filter today data
  const today = date.getDate();
  const todayData = data.filter(
    (item) =>
      parseInt(item.date.slice(5, 7)) === month + 1 &&
      parseInt(item.date.slice(8, 10)) === today
  );

  //filter weekly data
  const week = today - 7;
  const weekData = data.filter(
    (item) => (
      parseInt(item.date.slice(5, 7)) === month + 1) &&
      (parseInt(item.date.slice(8, 10)) >= week) &&
      (parseInt(item.date.slice(8, 10)) <= today)
  );

  // Total spend and earn calculation >> percentage
  let spend = 0;
  let earn = 0;
  let spendPerc = 0;
  let earnPerc = 0;

  if (select === "month") {
    monthlyData.forEach((item) => {
      if (item.money > 0) {
        earn += item.money;
      } else {
        spend += item.money;
      }
    });
    const total = Math.abs(spend) + earn;
    spendPerc = (Math.abs(spend) / total) * 100;
    earnPerc = (earn / total) * 100;
    if (Math.abs(spend) < earn) {
      earn += spend;
    } else {
      earn = 0;
    }

  }
  else if (select === "today") {
    todayData.forEach((item) => {
      if (item.money > 0) {
        earn += item.money;
      } else {
        spend += item.money;
      }
    });
    const total = Math.abs(spend) + earn;
    spendPerc = (Math.abs(spend) / total) * 100;
    earnPerc = (earn / total) * 100;
    if (Math.abs(spend) < earn) {
      earn += spend;
    } else {
      earn = 0;
    }
  }
  else {
    weekData.forEach((item) => {
      if (item.money > 0) {
        earn += item.money;
      } else {
        spend += item.money;
      }
    });
    const total = Math.abs(spend) + earn;
    spendPerc = (Math.abs(spend) / total) * 100;
    earnPerc = (earn / total) * 100;
    if (Math.abs(spend) < earn) {
      earn += spend;
    } else {
      earn = 0;
    }
  }

  useEffect(() => {

    if (select === "month") {
      setUser(monthlyData)
    }
    else if (select === "today") {
      setUser(todayData)
    }
    else {
      setUser(weekData)
    }
  }, [select])

  // For donut chart values
  const values = {
    Spend: spendPerc,
    Earn: earnPerc,
  };

  return (
    <>
      <div className="choose_box">
        <ul className="select_list">
          <li
            className={`day ${select === "today"?"active":null}`}
            onClick={() => {
              setSelect("today");
            }}
          >
            Day
          </li>
          <li
            className={`day ${select === "week"?"active":null}`}
            onClick={() => {
              setSelect("week");
            }}
          >
            Week
          </li>
          <li
            className={`day ${select === "month"?"active":null}`}
            onClick={() => {
              setSelect("month");
            }}
          >
            Month
          </li>
        </ul>
      </div>

      <h1 className="month">{months[month]}</h1>

      <Doughnutchart values={values} title="Current Month Expenditure" />

      <div className="perc">
        <h2 >
          Spend : <span className="spend_label">{spendPerc.toFixed(0)}%</span>
        </h2>
        <br />
        <h2 >
          Earn : <span className="earn_label">{earnPerc.toFixed(0)}%</span>{" "}
        </h2>
      </div>



      <div className="select_table">
        {user && user.length > 0 ? (
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
              {user.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}.</td>
                  <td>{item.date}</td>
                  <td className="titles">{item.title}</td>

                  <td className={`${item.money < 0 ? 'negative' : 'positive'}`}>
                    ₹{item.money}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>)
          :
          (<h4 className="nodata">No data found</h4>)
        }
      </div>
    </>
  );
};

export default Visualize;
