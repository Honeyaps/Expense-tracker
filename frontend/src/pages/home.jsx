import { useEffect, useState } from "react";
import './page.css'
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
        <br />

        <h1 >Your Balance: <span className={`total${total < 0 ? 'negative' : 'positive'}`}>₹{total}</span></h1>
        <br />

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
}
