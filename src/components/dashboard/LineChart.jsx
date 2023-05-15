import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import { Data } from './Data'

const LineChart = () => {

  const options = {
    plugins: {
      responsive: true,
      legend: {
        // position: 'right',
        // rtl : true,
        labels: {
          // usePointStyle: true,
          // pointStyle: 'circle',
          // padding: 20,
          font: {
            size: 0,
            style: "'Rubik', sans-serif",
            weight:"500"
          }
        }
      }
    },
}

    const [data, setData] =  useState({
        labels: Data.map(data=> data.month),
        datasets:[
            {
                label: "Revenue",
                data: Data.map(data=>data.salesRevenue),
                borderColor: "#51CBFF",
                
            }
        ]
    })

  return (
    
    <div className='w-full'>
     <Line data={data} options={options}/>
    </div>
  )
}
export default LineChart
