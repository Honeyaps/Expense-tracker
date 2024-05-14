import { useEffect, useState } from "react";
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:4000/";

export default function Home() {
  const [user, setUser] = useState([])
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function serverCall() {
      const response = await axios.get("exp/get_userexp", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },

      });

      setUser(response.data.expense);
    }

    serverCall();
  }, []);

  useEffect(() => {
    let temptotal = 0
    user.forEach((item) => {
      temptotal += item.money;
    })
    setTotal(temptotal)
  }, [user])



  return (
    <>
      <div className="table_contnr">

        <table>
          <thead>

            <tr>
              <th>Title</th>
              <th>Expense</th>
              <th>Date</th>
            </tr>

          </thead>
          <tbody>
            {user.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.money}</td>
                <td>{item.date.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1>Total: {total}</h1>
      </div>
    </>
  );
}
