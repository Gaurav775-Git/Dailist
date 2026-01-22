import React from 'react'
import CalenderSection from '../../components/CalenderSection'
import Navigator from '../../components/Navigator'

const TaskLog = () => {
  return (
    <div className='min-h-screen bg-black text-white px-10 py-8'>
       
        <div className='mt-12 flex justify-center'>
            <CalenderSection/>
            <Navigator/>
        </div>
      
    </div>
  )
}

export default TaskLog