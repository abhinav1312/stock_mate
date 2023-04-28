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
    <div className='w-full md:h-[12.5rem] md:w-[25rem]' >
     <Line data={data}/>
    </div>
    </>
  )
}
export default LineChart
