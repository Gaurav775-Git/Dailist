import React from 'react'
import Monthgrid from './Monthgrid'

const CalenderSection = () => {
  return (
    <div>
      <h2 className="text-sm tracking-widest mb-6">SEASON I</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <Monthgrid name="Jan 2026" year={2026} monthIndex={0} />
        <Monthgrid name="Feb 2026" year={2026} monthIndex={1} />
        <Monthgrid name="Mar 2026" year={2026} monthIndex={2} />
        <Monthgrid name="Apr 2026" year={2026} monthIndex={3} />
      </div>

      <hr className="my-10 mx-auto border-0 h-px bg-gray-600" />


      <h2 className="text-sm tracking-widest mb-6">SEASON II</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <Monthgrid name="may 2026" year={2026} monthIndex={4} />
        <Monthgrid name="jun 2026" year={2026} monthIndex={5} />
        <Monthgrid name="jul 2026" year={2026} monthIndex={6} />
        <Monthgrid name="aug 2026" year={2026} monthIndex={7} />
      </div>

      <hr className="my-10 mx-auto border-0 h-px bg-gray-600" />


      <h2 className="text-sm tracking-widest mb-6">SEASON III</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <Monthgrid name="sep 2026" year={2026} monthIndex={8} />
        <Monthgrid name="oct 2026" year={2026} monthIndex={9} />
        <Monthgrid name="nov 2026" year={2026} monthIndex={10} />
        <Monthgrid name="dec 2026" year={2026} monthIndex={11} />
      </div>
    </div>
  )
}

export default CalenderSection
