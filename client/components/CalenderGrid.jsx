import React from 'react'

const CalenderGrid = ({ day, value = 'empty' }) => {
  const colorMap = {
    core: '#22D3EE',
    good: '#22C55E',
    neutral: '#FACC15',
    bad: '#FB923C',
    nightmare: '#EF4444',
    empty: '#15181D'
  }

  return (
    <div
      className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9
      rounded-lg flex items-center justify-center
      text-[10px] sm:text-xs text-gray-300
      hover:scale-105 transition cursor-pointer"
      style={{ backgroundColor: colorMap[value] }}
    >
      {day}
    </div>
  )
}

export default CalenderGrid
