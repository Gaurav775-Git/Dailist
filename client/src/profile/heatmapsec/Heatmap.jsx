import React from 'react'
import Monthgrid from './Monthgrid'
import { useEffect,useState } from 'react'
import axios from "axios"


const Heatmap = () => {
  const [heatmapdate,setheatmapdate]=useState([])

  useEffect(()=>{
   axios.get("http://localhost:3000/heatmap",{
      withCredentials:true
    })
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

            
            <Monthgrid year={year} months={index} data={heatmapdate}/>
          </div>
        ))}
      </div>
    </div>
  )

}

export default Heatmap
