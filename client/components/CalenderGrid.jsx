import React, { useState } from 'react'
import PopUpWin from './PopUpWin'

const CalenderGrid = ({ day, value = 'empty' }) => {

  const [color, setColor] = useState(false)
  const [pop, setPop] = useState(false)

  function heatColor() {
    setColor(true)
  }

  function popUp() {
    setPop(true)   
  }

  function closePop() {
    setPop(false)
  }

  return (
    <div className="relative">
      
      <button
        className={`
          w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9
          rounded-lg flex items-center justify-center
          text-[10px] sm:text-xs
          hover:scale-105 transition cursor-pointer
          ${color ? "bg-green-500 text-white" : "bg-gray-800 text-gray-300"}
        `}
        onClick={popUp}
      >
        {day}
      </button>

      {pop && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70 backdrop-blur-sm">
  <div className="w-full max-w-lg rounded-2xl p-6 bg-gray-600">
    
    
    <div className="mb-5 text-center">
      <h2 className="text-xl font-semibold text-white">Daily Check-in</h2>
      <p className="text-sm text-gray-300">
        Focus on what really matters today.
      </p>
    </div>

    <form action="post" className="space-y-5"> 

      {/* Overall day */}
      <div>
        <label className="text-xs text-gray-300 block mb-1">
          How was your day?
        </label>
        <textarea
          className="w-full p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
          name="day"
          rows="2"
          placeholder="Quick summary of your day..."
        />
      </div>

      
      <div>
        <label className="text-xs text-gray-300 block mb-1">
          What did you learn today?
        </label>
        <textarea
          className="w-full p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          name="learned"
          rows="2"
          placeholder="New concepts, insights..."
        />
      </div>

      
      <div>
        <label className="text-xs text-gray-300 block mb-1">
          Technical progress
        </label>
        <textarea
          className="w-full p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-emerald-500"
          name="technical"
          rows="2"
          placeholder="DSA, React, projects, tools..."
        />
      </div>

      
      <div>
        <label className="text-xs text-gray-300 block mb-1">
          Main focus for tomorrow
        </label>
        <textarea
          className="w-full p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-500"
          name="tomorrow"
          rows="2"
          placeholder="Top 1–3 priorities"
        />
      </div>

      
      <button 
        type="submit"
        className="w-full p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 transition text-white font-medium shadow-lg"
      >
        Save Check-in
      </button>

    </form>

    <button 
      onClick={closePop} 
      className="text-red-400 mt-4 w-full text-center hover:text-red-300 transition"
    >
      Close
    </button>

  </div>
</div>
      )}

    </div>
  )
}

export default CalenderGrid
