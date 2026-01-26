import React from 'react'
import CalenderGrid from './CalenderGrid'

const Monthgrid = ({ name, year, monthIndex, completedDays, setCompletedDays }) => {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()

  return (
    <div>
      <h3 className="text-xs tracking-widest text-gray-400 mb-3">
        {name.toUpperCase()}
      </h3>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = `${year}-${(monthIndex + 1).toString().padStart(2, '0')}-${(i + 1).toString().padStart(2, '0')}`
          return (
            <CalenderGrid
              key={date}
              day={i + 1}
              date={date}
              completedDays={completedDays}
              setCompletedDays={setCompletedDays}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Monthgrid
