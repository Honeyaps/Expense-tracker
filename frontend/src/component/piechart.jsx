import { Chart, ArcElement, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import './nav.css'

Chart.register(ArcElement, Legend)

const Doughnutchart = ({ values, title }) => {
    const data = {
        labels: [
            'Spend',
            'Earn'
        ],
        datasets: [{
            label: 'VISUALIZATION',
            data: Object.values(values),
            backgroundColor: [
                '#bf0603',
                '#00b4d8'
            ],
            borderColor: [
                '#edf2f4',
                '#edf2f4'
            ],

            hoverOffset: 6

        }]
    };


    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Monthly Expenditure",
            },
            legend: {
                display: true,
                position: 'bottom',
            },
        },
    };

    return (
        <div className='donut'>
            {
                values.Earn === 0 && values.Spend === 0 ?
                <div>NO SPEND OR EARNING TODAY</div> :
                <Doughnut data={data} options={options} />
            }
        </div>

    );
}

export default Doughnutchart;