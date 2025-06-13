"use client";

import { DoughnutChartProps } from "@/types";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  // Extract account names and balances from the accounts array
  const accountNames = accounts.map((account) => account.name);
  const balances = accounts.map((account) => account.current_balance);

  // Define the chart data
  const data = {
    datasets: [
      {
        label: "Banks",
        data: balances,
        backgroundColor: ["#0747b6", "#2265d8", "#2f91fa", "#4bb3fd", "#74c7ff"],
        hoverBackgroundColor: ["#063a94", "#1a54b0", "#2678d8", "#3f9cfb", "#5bb3ff"],
      },
    ],
    labels: accountNames,
  };

  // Define chart options
  const options = {
    cutout: "60%",
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;