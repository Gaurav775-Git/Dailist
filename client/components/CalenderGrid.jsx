import React, { useState } from 'react'

const CalenderGrid = ({ day, value = 'empty' }) => {

  const [color , setColor] = useState(false);
  function heatColor(){
    setColor(true);
  }

  return (
    <div>
      <button className={`
  w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9
  rounded-lg flex items-center justify-center
  text-[10px] sm:text-xs
  hover:scale-105 transition cursor-pointer

  ${color? "bg-green-500 text-white" : "bg-gray-800 text-gray-300"}`}

  onClick={heatColor}

      >
        {day}
      </button>
    </div>
  )
}

export default CalenderGrid
