import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import { Data } from './Data'

const LineChart = () => {
    const [data, setData] =  useState({
        labels: Data.map(data=> data.year),
        datasets:[
            {
                label: "Revenue",
                data: Data.map(data=>data.userLost)
            }
        ]
    })
    const handleClick = () =>{
      setData()
    }
    // setData()
  return (
    <>
    <div className='w-full md:h-[25rem] md:w-[50rem]' >
     <Line data={data}/>
    </div>
    <button onClick={handleClick}>Do not click</button>
    </>
  )
}
export default LineChart
