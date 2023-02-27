import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReactDOM } from "react";
import "./index.css"
import SignIn from "./components/SignIn";
import { UserInterface, UserloginInterface, RoleloginInterface } from "./model/UserUI";



import Home from './pages/home/Home'
import HomePatient from './pages/home/HomePatient'
import Doctor from './pages/doctor/Doctor'
import DoctorPatient from './pages/doctor/DoctorPatient'
import Department from './pages/department/Department'
import DepartmentPatinet from "./pages/department/DepartmentPatient";
import About from './pages/about/About'
// import AboutPatient from './pages/about/AboutPatient'
import Contact from './pages/contact/Contact'
// import ContactPatient from './pages/contact/ContactPatient'
import Notfound from './pages/notFound/Notfound'
import Navbar from './components/Navbar'
import NavbarDoctor from './components/NavbarDoctor'
import NavbarPatient from './components/NavbarPatient'

import MedhisPatient from "./pages/medicalhistory/MedhisPatient";
import MedrecDoctor from "./pages/medicalrecord/MedracDoctor"
import MedracTabel from "./pages/medicalrecord/MedracTabel"
import TreatmentDoctor from "./pages/treatment/TreatmentDoctor";
import TreatmentDoctorTable from "./pages/treatment/TreatmentTabel";
import TreatmentDoctorTablePatient from "./pages/treatment/TreatmentTabelPatient";
import TreatmentShow from "./pages/treatment/treatmentshow";
import SubTreatmentDoctor from "./pages/treatment/Subtreatment"
import MedracTabelPatient from "./pages/medicalrecord/MedracTabelPatient";
import MedrecShow from "./pages/medicalrecord/Medracshow";





export default function App() {
  const [token, setToken] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [user, setuser] = useState<UserInterface>();

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setToken(getToken);
      setuser(JSON.parse(localStorage.getItem("User")|| ""))
      setRole(localStorage.getItem("Role") || "");
    } 
  }, []);
  console.log(user?.Role.Name);

  if (!token) {
    return (
    
      <>
      <BrowserRouter>    
      {/* <Route path='/' element ={<SignIn/>}/> 
      <Route index  element ={<SignIn/>}/> */}
      <Routes>
      <Route index  element ={<SignIn/>}/>
          <Route index  element ={<Home/>}/>
          {/* <Route path='about' element ={<About/>}/>
          <Route path='contact' element ={<Contact/>}/>
          <Route path='doctor' element ={<Doctor/>}/>
          <Route path='department' element ={<Department/>}/>
          <Route path='*' element ={<Notfound/>}/>
          <Route path='SingIn' element ={<SignIn/>}/> */}
        </Routes>
      </BrowserRouter>
      </>
      
      
    )
  }
  return (
    
    <Router>
      {
        token && (
          <Fragment>
              {role === "patient" && user?.Role.Name === role && ( <>
                <NavbarPatient/>
            <Routes>
            <Route index  element ={<Home/>}/>
            <Route path='about' element ={<About/>}/>
            <Route path='contact' element ={<Contact/>}/>
            {/* <Route path='doctorpatient' element ={<DoctorPatient/>}/> */}
            {/* <Route path='departmentpatient' element ={<DepartmentPatinet/>}/> */}
            <Route path='patientrecordshow' element ={<MedracTabelPatient/>}/>
            <Route path='treatmentpatienttable'element ={<TreatmentDoctorTablePatient/>}/>
            <Route path="treatmentshow/:id" element={<TreatmentShow/>} />
            {/* <Route path="medrachistory" element={<HistoryMedicalracord />} /> */}
            {/* <Route path='treatmentpatient'element ={<TreatmentPatient/>}/> */}
            <Route path="medrecshow/:id" element={<MedrecShow/>} />
            </Routes>
      </>
              )}

              {role === "doctor" && user?.Role.Name === role && ( <>
                <NavbarDoctor/>
            <Routes>
            <Route index  element ={<Home/>}/>
            <Route path='about' element ={<About/>}/>
            <Route path='contact' element ={<Contact/>}/>
            <Route path='doctorrecordtable' element ={<MedracTabel/>}/>
            <Route path='doctorrecordcreate' element ={<MedrecDoctor/>}/>
            <Route path='treatmentdoctor'element ={<TreatmentDoctor/>}/>
            <Route path='treatmentdoctortable'element ={<TreatmentDoctorTable/>}/>
            <Route path='subtreatment'element ={<SubTreatmentDoctor/>}/>
            <Route path="medrecshow/:id" element={<MedrecShow/>} />
            <Route path="treatmentshow/:id" element={<TreatmentShow/>} />
              </Routes>
              </>
              )}


              {role === "admin" && user?.Role.Name === role && ( <>
                <Navbar/>
            <Routes>
            <Route path='about' element ={<About/>}/>
            </Routes>
              </>
              )}        
          </Fragment>
        )
      }
      
    </Router>
    
  );
  
}

