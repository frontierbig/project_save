const SignOut = () => {
    localStorage.clear();
    window.location.href = "/";
  }
export const links = [
    {
        name: "Home",
        path: '/'
    },
    {
        name: "Doctor",
        path: '/doctor'
    },
    {
        name: "Department",
        path: '/department'
    },
    {
        name: "About",
        path: '/about'
    },
    {
        name: "Contact",
        path: '/contact'
    }
]

export const linksPatient = [
    {
        name: "Home",
        path: '/'
    },
   
    {   
        name:"Medicalrecord",
        path: '/patientrecordshow'
    }
    ,
   
    {   
        name:"Treatment",
        path: '/treatmentpatienttable'
    }
    ,
    {
        name: "About",
        path: '/about'
    },
    {
        name: "Contact",
        path: '/contact'
    },
    {
        name: "Logout",
        path: 'Logout',
        onClick: SignOut
    },
]
export const linkDoctor = [
    {
        name: "Home",
        path: '/'
    },
   
    {   
        name:"Medicalrecord",
        path: '/doctorrecordtable'
    }
    ,
   
    {   
        name:"Treatment",
        path: '/treatmentdoctortable'
    }
    ,
    {
        name: "About",
        path: '/about'
    },
    {
        name: "Contact",
        path: '/contact'
    },
    {
        name: "Logout",
        path: 'Logout',
        onClick: SignOut
    },
  
]
export const linkAdmin = [
    {
        name: "Home",
        path: '/'
    },
    {
        name: "Doctor",
        path: '/doctor'
    },
    {
        name: "Department",
        path: '/department'
    },
    {
        name: "About",
        path: '/about'
    },
    {
        name: "Contact",
        path: '/contact'
    }
]
