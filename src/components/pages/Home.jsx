import React from 'react'
import UserResults from '../users/UserResults'


function Home() {

  return (
    <div className='grid gird-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
      <UserResults />
    </div>
  )
}



export default Home