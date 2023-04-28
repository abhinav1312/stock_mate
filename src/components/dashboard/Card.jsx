import React from 'react'


const Card = ({img, content, data}) => {
  const capitalizedContent = content.toUpperCase()
  return (
    <>
      <div className="bg-blue rounded-md flex gap-4 items-center p-2 bg-green-500 shadow-md">
        <div className='w-full'>
        <img src={img} alt="item in inventory" className='aspect-square w-12' />
        </div>
        <div className='w-full'>
          <h3 className='text-md text-sm font-medium'> { capitalizedContent } </h3>
          <h3 className='font-semibold'> { data } </h3>
        </div>
      </div>
    </>
  )
}

export default Card
