import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function Linechart({LineChartData}){
    const labelData = Array.from(LineChartData.keys())
    const labels = labelData.reverse();
    const LineData = Array.from(LineChartData.values())

    const data = {
        labels,
        datasets: [
          {
            label: "Dataset 1",
            data: LineData.reverse(),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      };
      
      
  return <Line data = {data}/>;
}


