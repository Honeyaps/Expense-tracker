import { useEffect, useState } from "react";
import './page.css';
import axios from 'axios';
import { useRecoilState } from "recoil";
import { datastate } from "../../state";

axios.defaults.baseURL = "http://localhost:4000/";

export default function Home() {
  const [data, setData] = useRecoilState(datastate);
  const [user, setUser] = useState([]);
  const [total, setTotal] = useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function serverCall() {
      const response = await axios.get("exp/get_userexp", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const sortedData = response.data.expense.sort((a, b) => {
        const date_a = new Date(a.date);
        const date_b = new Date(b.date);
        return date_b.getTime() - date_a.getTime();
      });
      setUser(sortedData);
      setData(sortedData);
      filterData(sortedData);
    }
    serverCall();
  }, []);

  const date = new Date();
  const month = date.getMonth();
  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  const filterData = (dataToFilter) => {
    let filtered = dataToFilter;

    if (fromDate) {
      filtered = filtered.filter(item => new Date(item.date) >= new Date(fromDate));
    }
    if (toDate) {
      filtered = filtered.filter(item => new Date(item.date) <= new Date(toDate));
    }

    setFilteredData(filtered);

    let temptotal = 0;
    filtered.forEach((item) => {
      temptotal += item.money;
    });
    setTotal(temptotal);
  };

  useEffect(() => {
    if (fromDate || toDate) {
      filterData(user);
    } else {
      const monthlyData = user.filter((item) => parseInt(item.date.slice(5, 7)) === month + 1);
      setFilteredData(monthlyData);

      let temptotal = 0;
      monthlyData.forEach((item) => {
        temptotal += item.money;
      });
      setTotal(temptotal);
    }
  }, [fromDate, toDate, user]);

  return (
    <>
      <div className="table_contnr">
        <br />
        <div className="header">
          <h1 className="home_month">{months[month]}: <span className={`total${total < 0 ? 'negative' : 'positive'}`}>₹{total}</span></h1>
          <div className="date-range">
            <label>From:</label>
            <input type="date" className="from" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            <label>To:</label>
            <input type="date" className="to" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>
        </div>
        <br />
        {filteredData && filteredData.length > 0 ? (
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
              {filteredData.map((item, index) => (
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
          </table>
        ) : (
          <h4 className="nodata">No data found</h4>
        )}
      </div>
    </>
  );
}
