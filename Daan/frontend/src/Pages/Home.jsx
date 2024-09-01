import React from 'react'
import Appbar from '../Components/Appbar'
import FrontCards from '../material/FrontCards'
function Home() {
  return (
    <div>
        <div>
            <Appbar/>
        </div>
        <div className='pt-20'>
           <FrontCards/>

        </div>
      
    </div>
  )
}

export default Home
