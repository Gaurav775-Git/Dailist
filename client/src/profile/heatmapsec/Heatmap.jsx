import React from 'react'
import Monthgrids from './Monthgrids'
import { useEffect,useState } from 'react'
import api from "../../api/axios"


const Heatmap = () => {
  const [heatmapdate,setheatmapdate]=useState([])

  useEffect(()=>{
   api.get('/heatmap')
    .then((res)=>{
      setheatmapdate(res.data)

    })
    .catch(
      ()=>{
         alert("not fetch the data")
      }
    )

  },[])

console.log(heatmapdate)

  const month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const year=new Date().getFullYear()

  console.log(year)

  return (
    <div className=" overflow-x-auto  overflow-y-hidden p-4 bg-black rounded-xl shadow-md">
      <div className="space-y-3  mx-20 flex">
        {month.map((mon,index)=>(
          <div key={index} className="flex flex-col items-start gap-4 px-1">
            
          
            <p className="w-10 text-xs ml-6 text-gray-500">{mon}</p>

            
            <Monthgrids year={year} months={index} data={heatmapdate}/>
          </div>
        ))}
      </div>
    </div>
  )

}

export default Heatmap
