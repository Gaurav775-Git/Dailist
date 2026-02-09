import React, { useState } from "react";
import api from '../src/api/axios';
import { useNavigate } from "react-router-dom";

const Addtask = ({ onClose }) => {
  const navigate=useNavigate()
  const [task, settask] = useState({
    task1: "",
    task2: "",
    task3: "",
    task4: "",
    task5: "",
  });

  const handlechange = (e) => {
    settask({ ...task, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("task sent")
      if(!task){
        alert ("enter a task")
      }
      const res= await api.post('/upload_task', { task });
      
      
      settask({
        task1: "",
        task2: "",
        task3: "",
        task4: "",
        task5: "",
      });

      console.log(task)

      navigate("/profile")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-black text-white rounded-xl shadow-lg p-6 relative">
      
      <button
        onClick={onClose}
        className="absolute top-3 left-3 text-gray-400 hover:text-red-500 text-xl"
      >
        ✕
      </button>

      <h2 className="text-center text-xl font-semibold mb-6">Today Task</h2>

  
      <form onSubmit={handlesubmit} className="space-y-4">
        <input name="task1" value={task.task1} onChange={handlechange} placeholder="Task 1" className="input"/>
        <input name="task2" value={task.task2} onChange={handlechange} placeholder="Task 2" className="input"/>
        <input name="task3" value={task.task3} onChange={handlechange} placeholder="Task 3" className="input"/>
        <input name="task4" value={task.task4} onChange={handlechange} placeholder="Task 4" className="input"/>
        <input name="task5" value={task.task5} onChange={handlechange} placeholder="Task 5" className="input"/>

        <div className="flex justify-center pt-4">
          <button type="submit" className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addtask;
