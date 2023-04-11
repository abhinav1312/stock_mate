import React from 'react'


const Card = ({img, content, data}) => {
  const capitalizedContent = content.toUpperCase()
  return (
    <>
      <div className="h-full w-full bg-blue rounded-md flex p-8">
        <div className="img-div w-full">
          <img src={img} alt="item in inventory" className='w-2/3 object-contain' />
        </div>
        <div className="info-div w-full flex flex-col justify-center">
          <h3 className=''> { capitalizedContent } </h3>
          <h3 className=' font-semibold'> { data } </h3>
        </div>
      </div>
    </>
  )
}

export default Card
