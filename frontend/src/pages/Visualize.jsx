import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import { datastate } from '../../state';
import Doughnutchart from '../component/piechart';
// import './home.css';  

const Visualize = () => {
  const [select, setSelect] = useState('month');
  const [data] = useRecoilState(datastate);
  const [expenses, setExpenses] = useState([]);

  const date = new Date();
  const month = date.getMonth();
  const today = date.getDate();
  const week = today - 7;

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  // Filter expenditures by month, week, and today
  const filterExpenditure = (period) => {
    switch (period) {
      case 'today':
        return data.filter(
          (item) =>
            parseInt(item.date.slice(5, 7)) === month + 1 &&
            parseInt(item.date.slice(8, 10)) === today
        );
      case 'week':
        return data.filter(
          (item) =>
            parseInt(item.date.slice(5, 7)) === month + 1 &&
            parseInt(item.date.slice(8, 10)) >= week &&
            parseInt(item.date.slice(8, 10)) <= today
        );
      case 'month':
      default:
        return data.filter(
          (item) => parseInt(item.date.slice(5, 7)) === month + 1
        );
    }
  };

  useEffect(() => {
    setExpenses(filterExpenditure(select));
  }, [select, data]);

  const calculateSpendEarn = (filteredData) => {
    let spend = 0;
    let earn = 0;

    filteredData.forEach((item) => {
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

    return { spend, earn };
  };

  const { spend, earn } = calculateSpendEarn(expenses);
  const total = Math.abs(spend) + earn || 1; // Avoid division by zero
  const spendp = (Math.abs(spend) / total) * 100;
  const earnp = (earn / total) * 100;

  const values = { Spend: spend, Earn: earn };

  return (
    <>
      <div className='choose_box'>
        <ul className='select_list'>
          <li
            className={`day ${select === 'today' ? 'active' : ''}`}
            onClick={() => setSelect('today')}
          >
            Day
          </li>
          <li
            className={`day ${select === 'week' ? 'active' : ''}`}
            onClick={() => setSelect('week')}
          >
            Week
          </li>
          <li
            className={`day ${select === 'month' ? 'active' : ''}`}
            onClick={() => setSelect('month')}
          >
            Month
          </li>
        </ul>
      </div>

      <h1 className='month'>{months[month]}</h1>

      <Doughnutchart values={values} title={`Current ${select} expenditure`} />

      <div className='select_table'>
        {expenses && expenses.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Date</th>
                <th>Title</th>
                <th>Expense</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{expense.date}</td>
                  <td className='title'>{expense.title}</td>
                  <td className={`${expense.money < 0 ? 'negative' : 'positive'}`}>
                    ₹{expense.money}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h4 className='nodata'>No data found</h4>
        )}
      </div>
    </>
  );
};

export default Visualize;
