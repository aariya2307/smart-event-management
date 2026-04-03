import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function EventChart() {

  const data = {
    labels: ["Tech Fest", "Workshop", "Hackathon", "Seminar", "Sports Day"],
    datasets: [
      {
        label: "Participants",
        data: [120, 80, 150, 60, 200],
        backgroundColor: "rgba(75,192,192,0.6)"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Event Participation Chart"
      }
    }
  };

  return (
    <div style={{ width: "80%", margin: "40px auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default EventChart;