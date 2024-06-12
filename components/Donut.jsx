"use client"
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
import { Doughnut } from 'react-chartjs-2';

export const data = {
  labels: ['Red',  'Green'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const Donut = () => {

  return (
    <div>
      <Doughnut  data={data}/>
    </div>
  )
}

export default Donut