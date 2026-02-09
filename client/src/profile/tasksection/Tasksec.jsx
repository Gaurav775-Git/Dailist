import React from 'react'
import Taskdisplay from './Taskdisplay'
import {useState,useEffect} from "react"
import api from "../../api/axios"
const Tasksec = () => {

  const [dailytask,setdailytask] =useState([]);
  const [time,settime]=useState([]);
  
      useEffect(()=>{
        api
        .get('/get_task')
        .then((res)=>{
          setdailytask(res.data.tasks);
          settime(res.data.date)
        })
        .catch(err =>console.log(err))
    
      },[])

  return (
   <div className="text-white  rounded-2xl">
     {
      dailytask.length >0 ? (
        <Taskdisplay data={dailytask} date={time}/>
      ):(
        <div> no task yet</div>
      )
     }       
   </div>
  )
}

export default Tasksec