import React from 'react'

const Monthgrids = ({year , months,data}) => {
  const  totaldays=new Date(year,months+1,0).getDate()

   const getColor = (dateStr) => {
    const dayData = data.find(d => d.date.startsWith(dateStr))
    if (!dayData) return "bg-zinc-800"
    
    const pts = dayData.points
    if (pts === 0) return "bg-zinc-800"
    if (pts < 20) return "bg-green-900"
    if (pts < 50) return "bg-green-600"
    if (pts < 100) return "bg-green-400"
    return "bg-green-200"
  }

 
  return (
    <div className="grid grid-cols-4 gap-1">
      {[...Array(totaldays)].map((_,i)=>{
        const day = i+1
        const dateStr = `${year}-${String(months+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
       
        return (
          <div
            key={day}
            className={`w-3 h-3 rounded-full ${getColor(dateStr)}`}
          />
        )
      })}
    </div>
  )
}

export default Monthgrids