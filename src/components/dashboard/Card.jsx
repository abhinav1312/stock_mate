import React from 'react'


const Card = ({img, content, data}) => {
  const capitalizedContent = content.toUpperCase()
  return (
    <>
      <div className="bg-blue rounded-md grid grid-cols-2 p-8">
        <div>
          <img src={img} alt="item in inventory" className='w-1/2 object-contain' />
        </div>
        <div className="info-div flex flex-col justify-center">
          <h3 className=''> { capitalizedContent } </h3>
          <h3 className=' font-semibold'> { data } </h3>
        </div>
      </div>
    </>
  )
}

export default Card
