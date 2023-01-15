import './medrec.css'
import NavbarPatient from '../../components/NavbarPatient'

import React, { ChangeEvent,
  useEffect,
  useState, 
  Fragment, 
  SyntheticEvent } from 'react';
import { Link as RouterLink, useParams} from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Box, Paper } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { FormControl } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDateTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { MedicalRecordInterface } from '../../model/Medicalrec';
import { DecrytionInterface } from '../../model/Decryption';



function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const ParentData=[{name:"Both_parent"},{name:"Guardain"},{name:"Mother Only"},{name:"Father Only"}];

const ChronicData=[
  {name:"Asthma"},
  {name:"Heart disease / defect "},
  {name:"Bleeding Disorders"},
  {name:"Urinary Infection"},
  {name:"Convulsions / Seizures "},
  {name:"Vision – Contacts / Glasses"},
  {name:"Diabetes "},
  {name:"Teeth – dentures / bridge"},
  {name:"Ear Infection"},
  {name:"Menstrual problems"},
  {name:"Emotional / behavior disturbance"},
  {name:"Fainting"},
  {name:"Hypertension"},

];
const AllergiesData=[
  {name:"Animals"},
  {name:"Plants"},
  {name:"Food(s)"},
  {name:"Pollen"},
  {name:"Hay Fever "},
  {name:"Insect Stings"},
  {name:"Medicine/drugs"},

]




const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    container: {marginTop: theme.spacing(2)},
    paper: {padding: theme.spacing(3),},
    table: {minWidth: 800},
    tableSpace: {marginTop: 20},
    row: {'& > !': {borderBottom: 'unset'},},
  })
);



export default function HistoryMedicalrecord() {

    const classes = useStyles();
    const [decryption, setDecryption] = useState<Partial<DecrytionInterface>>( {} );
    // const [decryption, setDecryption] = useState("")
    const [medicalrecord, setMedicalrecord] = useState<MedicalRecordInterface[]>([]);
    const [output,SetOutput] = useState("")

    // const [decryption, setMedicalrecord] = useState<MedicalRecordInterface[]>([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [chronics,setChronic]=useState<any[]>([])
    const [allergies,setAllergies]=useState<any[]>([])
    const[parents,setParents]=useState<any[]>([])
    
    
  
    const getMedicalrecord = async() => {
      const apiUrl = "http://localhost:8080/api/ListMedicalRecord";
      const requestOptions = {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",},
      };
  
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setMedicalrecord(res.data);
          } else {
            console.log("else");
          }
        });
    };


    let { id } = useParams();


    const getMedicalracordByID =  async() => {
      const apiUrl = `http://localhost:8080/api/ListMedicalRecord/${id}`; //ดึง
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setMedicalrecord(res.data);
            
          } else {
            console.log("else");
          }
        });
    };
  
  
    useEffect(() => {
      getMedicalracordByID();
      setParents(ParentData);
     setChronic(ChronicData);
      setAllergies(AllergiesData);

      
    }, []);
     

  // const  handleChange = (event:any)  =>
  // {
  //   setDecryption(event.target.value);
  // };

  const handleChange = (event: ChangeEvent<{name?: string; value: any}>) => {
    const name = event.target.name as keyof typeof decryption;
    setDecryption({...decryption, [name]: event.target.value,});
  }; 


 

      const DecryptionMedicalrecord =  async () => {
      
        const apiUrl = `http://localhost:8080/api/DecryptionMedicalRecord/${id}`;
        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body:JSON.stringify(decryption),
          
        };
       
        fetch(apiUrl, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            console.log(res.data);
            if (res.data) {
              setDecryption(res.data);
              SetOutput(res.data);

              return res.data
              
            } else {
              setError(true);
              console.log(res);
            }
          });
      };

      const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
          return;
        }
        setSuccess(false);
        setError(false);
      };
      
    return (
    <>
    <NavbarPatient/>

   
    <Container className={classes.container} maxWidth="lg">
    <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
        Decriptionsuccess
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Decription fail  , invalid Key
        </Alert>
      </Snackbar>
    <Paper className={classes.paper}>
        <Box display="flex">
            <Box flexGrow={1}>

      <br/><br/> 
      

                <Typography
                    component="h2"

                    variant="h6"

                    color="primary"

                    gutterBottom
                >
                    ข้อมูลป่วย
                </Typography>

            </Box>
            
        </Box>


        
        <Divider />                    
                    {medicalrecord.map((item: MedicalRecordInterface) => (
                    <MenuItem value={item.ID} key={item.ID}  >
                      <Grid container spacing={5}>
                      {/* <Grid item xs={5}>
                                <p>ID</p>
                               <TextField 
                               disabled
                               id="Hospital_Number" 
                               type="string"
                               inputProps={{name:"Hospital_Number"}}
                               variant="outlined" 
                               value={item.ID}                   
                               fullWidth
                               />
                            </Grid> */}



                            <Grid item xs={5}>
                                <p>Hospital number</p>
                               <TextField 
                               disabled
                               id="Hospital_Number" 
                               type="string"
                               inputProps={{name:"Hospital_Number"}}
                               variant="outlined" 
                               value={item.Hospital_Number}                   
                               fullWidth
                               />
                            </Grid>

                            <Grid item xs={5}>
                        <p>Personal ID</p>
                        <TextField 
                        disabled
                        id="Personal_ID" 
                        type="string"
                        inputProps={{name:"Personal_ID"}}
                        variant="outlined" 
                        value={item.Personal_ID}                 
                        fullWidth/>
                        </Grid>


                        <Grid item xs={5}>
                                <p>Name</p>
                               <TextField 
                               disabled
                               id="Hospital_Number" 
                               type="string"
                               variant="outlined" 
                               value={item.Patient_ID}                   
                               fullWidth
                               />
                            </Grid>

                            <Grid item xs={5}>
                                <p>Age</p>
                               <TextField 
                               disabled
                               type="string"
                               variant="outlined" 
                               value={item.Patient_Age}                   
                               fullWidth
                               />
                            </Grid>

                            <Grid item xs={5}>
                                <p>Gender</p>
                               <TextField 
                               disabled
                               type="string"
                               variant="outlined" 
                               value={item.Patient_gender}                   
                               fullWidth
                               />
                            </Grid>

                            <Grid item xs={5}>
                                <p>Date of birth</p>
                               <TextField 
                               disabled
                               type="string"
                               variant="outlined" 
                               value={item.Patient_dob}                   
                               fullWidth
                               />
                            </Grid>


                            <Grid item xs={5}>
                                <p>Address</p>
                               <TextField 
                               disabled
                               type="string"
                               variant="outlined" 
                               value={item.Patient_address}                   
                               fullWidth
                               />
                            </Grid>


                            <Grid item xs={5}>
                                <p>Phon</p>
                               <TextField 
                               disabled
                               type="string"
                               variant="outlined" 
                               value={item.Parent_phone}                   
                               fullWidth
                               />
                            </Grid>


                            <Grid item xs={12}>
                            <h3>Parent infromation</h3>
                            </Grid>

                            <Grid item xs={5}>
                                <p>Parent name</p>
                               <TextField 
                               disabled
                               type="string"
                               variant="outlined" 
                               value={item.Parent_Name}                   
                               fullWidth
                               />
                            </Grid>

                            <Grid item xs={5}>
                                <p>Parent Address</p>
                               <TextField 
                               disabled
                               type="string"
                               variant="outlined" 
                               value={item.Parent_address}                   
                               fullWidth
                               />
                            </Grid>

                            <Grid item xs={5}>
                                <p>Parent Phone</p>
                               <TextField 
                               disabled
                               type="string"
                               variant="outlined" 
                               value={item.Parent_phone}                   
                               fullWidth
                               />
                            </Grid>


                            <Grid item xs={12}>
                            <h3>Medical history</h3>
                            </Grid>



                            <Grid item xs={5}>
                              <p>Medical history</p>
                               <TextField 
                               disabled
                               type="string"
                               variant="outlined" 
                               value={item.Parent_phone}                   
                               fullWidth
                               />
                               
                            </Grid>
                            

                            <Grid item xs={5}>
                              <p>Current Medications</p>
                               <TextField 
                               disabled
                               type="string"
                               variant="outlined" 
                               value={item.Parent_phone}                   
                               fullWidth
                               />
                            </Grid>




                            
                    <Grid item xs={5}>
                    
                    <div className="container my-4" style={{ width: "500px" }}>
                      <form className="form w-100">
                       <h3>Chronic or Recurring conditions</h3>
                           <div className="form-check">
         
                          </div>
                           {chronics.map((chronic, index) => (
                            <div className="form-check" key={index}>
                            <input
                             type="checkbox"
                             className="form-check-input"
                             name={chronic.name}
                              checked={chronic?.isChecked || false}
                               />
                           <label className="form-check-label ms-2">{chronic.name}</label>
                            </div>
                               ))}
                           </form>
                          </div>
                     </Grid>




                            <Grid item xs={5}>
                    
                    <div className="container my-4" style={{ width: "500px" }}>
                      <form className="form w-100">
                       <h3>Allergies</h3>
                           <div className="form-check">
         
                             </div>
                             {allergies.map((aller, index) => (
                             <div className="form-check" key={index}>
                               <input
                              type="checkbox"
                              className="form-check-input"
                             name={aller.name}
                             checked={aller?.isChecked || false}
                                  />
                              <label className="form-check-label ms-2">{aller.name}</label>
                            </div>
                           ))}
                              </form>
                            </div>
                          </Grid>
                          

                            <Grid item xs={12}>
                            <h3>Secret Data</h3>
                            </Grid>


                            <Grid item xs={5}>
                                <p>Secret Data</p>
                               <TextField 
                               disabled
                               id="Secret_Data" 
                               type="string"
                               inputProps={{name:"Secret_Data"}}
                               variant="outlined" 
                               value={item.Secret_Data}                   
                               fullWidth
                               />
                            </Grid>

                            <Grid item xs={5}>
                                <p>Decryption</p>
                               <TextField 
                               id="Decryption" 
                               type="string"
                               inputProps={{name:"Decryption"}}
                               variant="outlined" 
                               value={decryption.Decryption||""}
                               onChange={handleChange}                  
                               fullWidth
                               />
                            </Grid>

                            <Grid item xs={5}>
                                <p>Output</p>
                               <TextField 
                               id="Output" 
                               type="string"
                               disabled
                               inputProps={{name:"Output"}}
                               variant="outlined" 
                               value={output||""}                
                               fullWidth
                               />
                            </Grid>
                            
                            

                            <Grid item xs={6}>
                      <Button
                        style={{ float: "right"}}
                        variant="contained"
                        onClick={DecryptionMedicalrecord}
                        color="primary"
                          
                      >
                        Decryption
                      </Button>
                    </Grid>

                      </Grid>
                    </MenuItem>
                ))}
                    
                    
                    <Grid item xs={6}>
                        <Button 
                                variant="contained" 
                                color="primary" 
                                component={RouterLink}
                                to="/medrachistory"
                                >กลับ</Button>
                    </Grid>

        
        </Paper>
    </Container>
    
 </>
  
)
}