import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CalenderGrid = ({ day, date, completedDays = [], setCompletedDays }) => {
  const [pop, setPop] = useState(false)
  const [selectedColor, setSelectedColor] = useState('bg-green-500')
  const [formData, setFormData] = useState({
    day: '',
    learned: '',
    technical: '',
    tomorrow: ''
  })

  const isCompleted = completedDays.includes(date)
  const today = new Date()
  const cellDate = new Date(date)
  today.setHours(0, 0, 0, 0)
  cellDate.setHours(0, 0, 0, 0)
  const isPast = cellDate > today

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://dailist-1.onrender.com/api/daily-log/${date}`, {
          withCredentials: true
        })

        if (res.data && (res.data.day || res.data.learned || res.data.technical || res.data.tomorrow)) {
          setFormData({
            day: res.data.day || '',
            learned: res.data.learned || '',
            technical: res.data.technical || '',
            tomorrow: res.data.tomorrow || ''
          })
          setSelectedColor(res.data.color || 'bg-green-500')
        }
      } catch (err) {
        // 404 means no log saved for this date yet, that's fine
      }
    }

    fetchData()
  }, [date])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const popUp = () => {
    if (isPast && !isCompleted) return
    setPop(true)
  }

  const closePop = () => setPop(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(
        'https://dailist-1.onrender.com/api/daily-log',
        {
          date,
          day: formData.day,
          learned: formData.learned,
          technical: formData.technical,
          tomorrow: formData.tomorrow,
          color: selectedColor
        },
        {
          withCredentials: true
        }
      )

      if (!completedDays.includes(date)) {
        setCompletedDays(prev => [...prev, date])
      }

      closePop()
    } catch (err) {
      console.log('Save error:', err)
      alert(err.response?.data?.message || 'Error saving data')
    }
  }

  let buttonClasses = 'bg-gray-800 text-gray-300'
  if (isCompleted) buttonClasses = selectedColor + ' text-white'
  else if (isPast) buttonClasses = 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-60'



  return (
    <div className="relative">
      <button
        className={`
          w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9
          rounded-lg flex items-center justify-center
          text-[10px] sm:text-xs
          hover:scale-105 transition
          ${buttonClasses}
        `}
        onClick={popUp}
        disabled={isPast && !isCompleted}
      >
        {day}
      </button>

      {pop && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl p-6 bg-gray-600">
            <div className="mb-5 text-center">
              <h2 className="text-xl font-semibold text-white">Daily Check-in</h2>
              <p className="text-sm text-gray-300">Focus on what really matters today.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs text-gray-300 block mb-2">
                  Choose calendar color
                </label>
                <div className="flex gap-3">
                  {['bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-yellow-500', 'bg-red-500'].map(color => (
                    <button
                      type="button"
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-6 h-6 rounded-full ${color} ring-2 ${
                        selectedColor === color ? 'ring-white' : 'ring-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">How was your day?</label>
                <textarea
                  className="w-full p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
                  name="day"
                  rows="2"
                  placeholder="Quick summary of your day..."
                  value={formData.day}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">What did you learn today?</label>
                <textarea
                  className="w-full p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
                  name="learned"
                  rows="2"
                  placeholder="New concepts, insights..."
                  value={formData.learned}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Technical progress</label>
                <textarea
                  className="w-full p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-emerald-500"
                  name="technical"
                  rows="2"
                  placeholder="DSA, React, projects, tools..."
                  value={formData.technical}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Main focus for tomorrow</label>
                <textarea
                  className="w-full p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-500"
                  name="tomorrow"
                  rows="2"
                  placeholder="Top 1–3 priorities"
                  value={formData.tomorrow}
                  onChange={handleChange}
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