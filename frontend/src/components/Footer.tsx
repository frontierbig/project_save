import React from 'react'
import {FaFacebook} from 'react-icons/fa'
import {AiOutlineTwitter} from 'react-icons/ai'
import {AiFillInstagram} from 'react-icons/ai'
import{Link} from 'react-router-dom'
import logo from '../images/Logo2.png'
function Footer() {
  return (
    <footer>
      <div className='container footer__container'>
        <article>
          <Link to ='/ ' className='logo'>
            <img src={logo} alt="Footer Logo"/>
          </Link>
          <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis consectetur dolores dolorem?
            </p>
            <div className='footer__socials'>
              < a href='https://facebook.com' target="_blank" rel="noreferrer noopener" ><FaFacebook/></a>
              < a href='https://twitter.com' target="_blank" rel="noreferrer noopener" ><AiOutlineTwitter/></a>
              < a href='https://instagram.com' target="_blank" rel="noreferrer noopener" ><AiFillInstagram/></a>
            </div>
        </article>
        <article>
          <h4>Permalinks</h4>
          <Link to='/doctor'>Doctor</Link>
          <Link to='/department'>Department</Link>
          <Link to='/about'>About</Link>
          <Link to='/contact'>Contact</Link>
        </article>

        <article>
          <h4>Insights</h4>
          <Link to='/s'>Blog</Link>
          <Link to='/s'>Events</Link>
          <Link to='/s'>Communities</Link>
          <Link to='/s'>FAQS</Link>
        </article>

        <article>
          <h4>Insights</h4>
          <Link to='/contact'>Contact Us</Link>
          <Link to='/s'>Support</Link>
        </article>





      </div>
      <div className='footer__copyright'>
        <small>2022 PROJECT CPE &copy; All Rights Reserved</small>
      </div>
    </footer>
  )
}

export default Footer