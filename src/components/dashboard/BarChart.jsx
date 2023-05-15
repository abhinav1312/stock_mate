import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Data } from './Data'

const BarChart = () => {
    const [data, setData] = useState({
        labels: Data.map((data)=>data.category),
        datasets: [{
            label: "Quantity sold",
            backgroundColor: "#6674CC",
            barThickness: 52,
            data: Data.map((data)=>data.quantity)
        }]
    })

    const options = {
      plugins: {
        responsive: true,
        legend: {
          labels: {
            font: {
              size: 0,
              style: "'Rubik', sans-serif",
              weight:"500",
            }
          }
        }
      },
  }

  return (
    <>
    <div className='w-full'>
      <Bar data={data} options={options} />
    </div>
    </>
  )
}

export default BarChart
