import React, { useState } from "react";

const Taskdisplay = ({ data, date }) => {
  const [open, setOpen] = useState(false);
  const [complete,setcomplete]=useState(false)
  const difficultyColor = {
    easy: "bg-green-500/20 text-green-400",
    medium: "bg-yellow-500/20 text-yellow-400",
    hard: "bg-red-500/20 text-red-400",
  };
   

  return (
    <div className="w-full max-w-sm mx-auto my-4 rounded-2xl bg-zinc-900/60 backdrop-blur-lg p-4 shadow-lg">
      
      
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h2 className="text-md font-semibold tracking-wide text-gray-200">
           {new Date(date).toDateString()}
        </h2>
        <span className="text-gray-400 text-sm">
          {open ? "Hide Tasks ▲" : "Show Tasks ▼"}
        </span>
      </div>

      
      {open && (
        <div className="mt-4 space-y-3">
          {data.length > 0 ? (
            data.map((task) => (
              <div
                key={task._id}
                className="flex justify-between items-center bg-zinc-800/70 px-4 py-3 rounded-xl hover:bg-zinc-700/70 transition"
              >
                <div className="flex flex-col">
                  <p className="font-medium text-gray-100">{task.task}</p>
                  <span className="text-xs text-gray-400">
                    {task.category}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${difficultyColor[task.difficulty]}`}
                  >
                    {task.difficulty}
                  </span>

                  <span className="text-yellow-400 text-sm font-semibold">
                    ⭐ {task.points}
                  </span>

                  <div className="text-sm hover:bg-white" onClick={()=>setcomplete(!complete)}>
                    {task.completed ? "✅" : "⏳"}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No tasks that day</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Taskdisplay;
