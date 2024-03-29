import './navbar.css'
import logo from '../images/Logo2.png'
import React from 'react'
import{Link,NavLink} from 'react-router-dom'
import {linkDoctor} from '../data'
import {GoThreeBars} from 'react-icons/go'
import{MdOutlineClose} from 'react-icons/md'
import{useState} from 'react'
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

const NavbarDoctor = () => {
      const[isNavShowing,setIsNavShowing] = useState(false)
  return (
    <nav>
        <div className="container nav__container">
            <Link  to="/" className='logo' onClick={()=> setIsNavShowing(false)}>
              <img src={logo} alt="Nav logo"/>
            </Link>
            <ul className={`nav__links ${isNavShowing?'show__nav':'hide__Nav'}`}>
              {
              linkDoctor.map(({name,path},index) =>{
                return(
                  <li key={index} >
                    <NavLink to={path} className={({isActive})=> isActive?'active-nav':''}
                    onClick={()=> setIsNavShowing(prev => !prev)}>{name}
                    </NavLink>
                    
                  </li>
                  
                )
              })
            }
            </ul>
            <botton className="nav__toggle-btn" onClick={()=> setIsNavShowing(prev => !prev)}>
              {
                isNavShowing ? <MdOutlineClose/>: <GoThreeBars/>
              }
              
                
            </botton>
            
            
        </div>
    </nav>
  )
}

export default NavbarDoctor