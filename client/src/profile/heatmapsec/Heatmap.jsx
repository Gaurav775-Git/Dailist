import React from 'react'
import Monthgrid from './Monthgrid'

const Heatmap = () => {
  const month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const year=new Date().getFullYear()

  return (
    <div className=" overflow-x-auto  overflow-y-hidden p-4 bg-black rounded-xl shadow-md">
      <div className="space-y-3  mx-20 flex">
        {month.map((mon,index)=>(
          <div key={index} className="flex flex-col items-start gap-4 px-1">
            
          
            <p className="w-10 text-xs ml-6 text-gray-500">{mon}</p>

            
            <Monthgrid year={year} months={index} className=""/>
          </div>
        ))}
      </div>
    </div>
  )

}

export default Heatmap
