import React, { useState, useEffect } from 'react'
import Monthgrid from './Monthgrid'
import api from '../src/api/axios'
import {OrbitProgress} from 'react-loading-indicators'

const CalenderSection = () => {
  const [loader, setLoader] = useState(false) 
  const [completedDays, setCompletedDays] = useState([])
  useEffect(() => {
    setLoader(true);
    const fetchCompleted = async () => {
      try {
        const res = await api.get('/api/daily-log')
        setCompletedDays(res.data)
      } catch (err) {
        console.log('Error fetching completed days:', err)
      }finally {
        setLoader(false);}
    }
    fetchCompleted()
  }, [])

  if(loader) {
    return (
        <div className="flex items-center justify-center w-full h-full">
          <OrbitProgress color="#ffffff" size="medium" text="" textColor="" />
        </div>
    )
  }

  return (
    <div>
      <h1 className='flex text-6xl'>MISSION-2026</h1>
      <p className='mb-10 text-gray-400'>
        Over time, focused effort turns ordinary days into extraordinary progress.
      </p>

      <h2 className="text-sm tracking-widest mb-6">SEASON I</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <Monthgrid name="Jan 2026" year={2026} monthIndex={0} completedDays={completedDays} setCompletedDays={setCompletedDays} />
        <Monthgrid name="Feb 2026" year={2026} monthIndex={1} completedDays={completedDays} setCompletedDays={setCompletedDays} />
        <Monthgrid name="Mar 2026" year={2026} monthIndex={2} completedDays={completedDays} setCompletedDays={setCompletedDays} />
        <Monthgrid name="Apr 2026" year={2026} monthIndex={3} completedDays={completedDays} setCompletedDays={setCompletedDays} />
      </div>

      <hr className="my-10 mx-auto border-0 h-px bg-gray-600" />

      <h2 className="text-sm tracking-widest mb-6">SEASON II</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <Monthgrid name="May 2026" year={2026} monthIndex={4} completedDays={completedDays} setCompletedDays={setCompletedDays} />
        <Monthgrid name="Jun 2026" year={2026} monthIndex={5} completedDays={completedDays} setCompletedDays={setCompletedDays} />
        <Monthgrid name="Jul 2026" year={2026} monthIndex={6} completedDays={completedDays} setCompletedDays={setCompletedDays} />
        <Monthgrid name="Aug 2026" year={2026} monthIndex={7} completedDays={completedDays} setCompletedDays={setCompletedDays} />
      </div>

      <hr className="my-10 mx-auto border-0 h-px bg-gray-600" />

      <h2 className="text-sm tracking-widest mb-6">SEASON III</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <Monthgrid name="Sep 2026" year={2026} monthIndex={8} completedDays={completedDays} setCompletedDays={setCompletedDays} />
        <Monthgrid name="Oct 2026" year={2026} monthIndex={9} completedDays={completedDays} setCompletedDays={setCompletedDays} />
        <Monthgrid name="Nov 2026" year={2026} monthIndex={10} completedDays={completedDays} setCompletedDays={setCompletedDays} />
        <Monthgrid name="Dec 2026" year={2026} monthIndex={11} completedDays={completedDays} setCompletedDays={setCompletedDays} />
      </div>
    </div>
  )
}

export default CalenderSection
