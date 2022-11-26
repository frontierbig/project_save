import React from 'react'
import {Link} from 'react-router-dom'
const MainHeader = () => {
  return (
    <header className='main__header'>
        <div className='bg-imagehome'>
        <div className='header-container'>
       <h4>#let us take care of you</h4>
        <h1>Join The Project </h1>
        <h1>Hospital Webside </h1>
         <p>
         Receive many privileges from the hospital's website,notify information and other services in receiving treatment.
       </p>
       <Link to = '/SingIn' className='btn lg'>Register</Link>
       </div>
      </div>
     
    </header>
    
 
  )
}

export default MainHeader