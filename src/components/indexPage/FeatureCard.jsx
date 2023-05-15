import React from 'react'
const FeatureCard = ({heading, body, icon, borderColor, aos}) => {
  return (
    <div className="w-96 h-96 flex flex-col gap-4 justify-center items-center bg-white shadow-lg rounded-lg border border-b-8" style={{borderBottomColor: borderColor}} data-aos={aos}>
        <div>
        {icon}
        </div>
        <h3 className='font-semibold text-lg'>
          {heading}
        </h3>
				<div className='px-4 text-center text-txtSec'>
					<p>{body}</p>
				</div>
    </div>
  )
}

export default FeatureCard
