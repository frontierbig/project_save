import React from 'react'
import './contact.css'
import HeaderImage from '../../images/contact.png'
import{MdEmail} from "react-icons/md"
import{BsMessenger} from "react-icons/bs"
import{IoLogoWhatsapp} from "react-icons/io"
import Footer from '../../components/Footer'
import { BsFillTelephoneFill} from "react-icons/bs";
import Navbar from '../../components/Navbar'

const Contact = () => {
  return (
    <>
    <Navbar/>
    <div className='bg-imagecontact'>
      <div className='Text_contact'>
        <h1>Address</h1>
        <p>111 Maha Witthayalai Rd Suranari Mueang Nakhon Ratchasima District Nakhon Ratchasima 30000  </p>
        <p><BsFillTelephoneFill/>  +66-xxxx-xxxxx</p>
        
      </div>
    </div>
    <div className='contact__container'>
      <div className='contact__wrapper'>
        <a href="https://web.facebook.com" target="_blank" rel="noreferrer noopener"> <MdEmail/></a>
        <a href="https://web.facebook.com" target="_blank" rel="noreferrer noopener"> <BsMessenger/></a>
        <a href="https://web.facebook.com" target="_blank" rel="noreferrer noopener"> <IoLogoWhatsapp/></a>
      </div>

    </div>
    <Footer/>
    </>
  )
}

export default Contact