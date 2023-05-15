import React, { useState } from 'react'
import { Pie } from 'react-chartjs-2'
// import {Chart as ChartJs} from 'chart.js/auto'
import { Data } from './Data'

// ChartJs.defaults.doughnut.plugins.legend.position = 'bottom';



const PieChart = () => {
  const options = {
    plugins: {
      responsive: true,
      legend: {
        position: 'right',
        rtl : true,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 24,
            style: "'Rubik', sans-serif"
          }
        }
      }
    },
}

    const [data, setData] = useState({
        labels: Data.map((data)=>data.category),
        datasets: [{
            label: "Sales Revenue",
            data: Data.map((data)=>data.salesRevenue)
        }]
    })
    const handleClick = () =>{
      setData()
    }
  return (
    <>
      <div className='w-3/5'>
          <Pie data={data} options={options}/>
          <button className="hidden" onClick={handleClick}></button>
      </div>
    </>
  )
}

export default PieChart
