import React, { useState } from 'react'
import { Pie } from 'react-chartjs-2'
// import {Chart as ChartJs} from 'chart.js/auto'
import { Data } from './Data'

// ChartJs.defaults.doughnut.plugins.legend.position = 'bottom';



const PieChart = () => {
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
  return (
    <>
      <div className='w-full md:w-[30rem]'>
          <Pie data={data} options={{responsive: true}}/>
          <button className="hidden" onClick={handleClick}></button>
      </div>
    </>
  )
}

export default PieChart
