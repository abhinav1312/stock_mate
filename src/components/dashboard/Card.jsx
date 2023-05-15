import React from 'react'


const Card = ({img, content, data}) => {
  const capitalizedContent = content.toUpperCase()
  return (
    <>
      <div className="bg-blue rounded-md flex gap-4 items-center p-2 bg-white shadow-md">
        <div>
        <img src={img} alt="card" className='aspect-square w-12' />
        </div>
        <div>
          <h3 className='text-md text-sm text-txtSec'> { capitalizedContent } </h3>
          <h3 className='font-semibold'> { data } </h3>
        </div>
      </div>
    </>
  )
}

export default Card
