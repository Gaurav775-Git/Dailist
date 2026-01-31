import React from 'react'

const Monthgrid = ({year , months,y}) => {
  const  totaldays=new Date(year,months+1,0).getDate()
  return (
    <div className='grid grid-cols-4'>
      {
        [...Array(totaldays)].map((_,i)=>(
          
          <span key={i} className='w-3 h-3 bg-[#1f1f1f]  mx-1 my-1 inline-block rounded-full'> 

          </span>
        ))
      }
      </div>
  )
}

export default Monthgrid