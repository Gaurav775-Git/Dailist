import React from 'react'
import Taskdisplay from './Taskdisplay'
import {useState,useEffect} from "react"
import axios from "axios"
const Tasksec = () => {

  const [dailytask,setdailytask] =useState([]);
  const [time,settime]=useState([]);
  
     useEffect(()=>{
        axios
        .get("http://localhost:3000/get_task",{
          withCredentials:true
        })
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