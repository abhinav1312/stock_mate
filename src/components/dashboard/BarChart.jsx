import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'
// import {Chart as ChartJs} from 'chart.js/auto'
import { Data } from './Data'

const BarChart = () => {
    const [data, setData] = useState({
        labels: Data.map((data)=>data.year),
        datasets: [{
            label: "Users Gained",
            data: Data.map((data)=>data.userGain)
        }]
    })
    const handleClick = () =>{
      setData()
    }
    // setData()
  return (
    <>
    <div className='w-full md:h-[12.5rem] md:w-[25rem]'>
      <Bar data={data} options={{responsive: true}}/>
    </div>
    </>
  )
}

export default BarChart
