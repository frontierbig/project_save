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
import { MedicalRecordInterface2 } from '../../model/Medicalrec';
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
    const [medicalrecord, setMedicalrecord] = useState<MedicalRecordInterface2[]>([]);
    const [output,SetOutput] = useState("")

    // const [decryption, setMedicalrecord] = useState<MedicalRecordInterface[]>([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [chronics,setChronic]=useState<any[]>([])
    const [allergies,setAllergies]=useState<any[]>([])
    const[parents,setParents]=useState<any[]>([])
    
    

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
    <div className="paper">
        <div className="content">

      <div>
        <div>
         
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
          <br />
       

          <div className="toptitle">
            Personal Health and Medical Record
          </div>

          
        </div>
      </div>
      <Divider />

      <h3 className="title">Participant information</h3>

      <Grid container spacing={5}>
      
        <Grid item xs={6} >
          <p>Hospital number</p>
          <TextField
            
            id="Hospital_Number"
            type="string"
            inputProps={{ name: "Hospital_Number" }}
            variant="outlined"
            value={""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        

        {/* <Grid item xs={6}>
          <p>Personal ID</p>
          <TextField
            id="Personal_ID"
            type="string"
            inputProps={{ name: "Personal_ID" }}
            variant="outlined"
            value={medicalrecord.Personal_ID || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <p>Name</p>
          <Select
            variant="outlined"
            defaultValue={0}
            inputProps={{ name: "Patient_ID" }}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value={0} key={0} disabled>
              SelectUser
            </MenuItem>
            {User.map((item: UserInterface) => (
              <MenuItem value={item.ID} key={item.ID}>
                {item.Name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={6}>
          <p>Age</p>
          <TextField
            id="Patient_Age"
            type="string"
            inputProps={{ name: "Patient_Age" }}
            variant="outlined"
            value={medicalrecord.Patient_Age || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <p>Gender</p>
          <TextField
            id="Patient_gender"
            type="string"
            inputProps={{ name: "Patient_gender" }}
            variant="outlined"
            value={medicalrecord.Patient_gender || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl variant="outlined">
            <p>Date of birth</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                name="Patient_dob"
                value={selectedDate}
                onChange={handleDateChange}
                format="yyyy-MM-dd"
                fullWidth
              />
            </MuiPickersUtilsProvider>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <p>Address</p>
          <TextField
            id="Patient_address"
            type="string"
            inputProps={{ name: "Patient_address" }}
            variant="outlined"
            value={medicalrecord.Patient_address || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <p>Phone</p>
          <TextField
            id="Patient_phone"
            type="string"
            inputProps={{ name: "Patient_phone" }}
            variant="outlined"
            value={medicalrecord.Patient_phone || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <div className="container my-4" style={{ width: "500px" }}>
            <form className="form w-100">
              <h3 className="title">Parent infromation</h3>
              <div className="form-check"></div>
              {parents.map((Parent, index) => (
                <div className="form-check" key={index}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name={Parent.name}
                    checked={Parent?.isChecked || false}
                    onChange={handleChangecheckbox}
                  />
                  <label className="namecheckbox">{Parent.name}</label>
                </div>
              ))}
            </form>
          </div>
        </Grid>

        <Grid item xs={6}>
          {" "}
        </Grid>

        <Grid item xs={6}>
          <p>Parent name</p>
          <TextField
            id="Parent_Name"
            type="string"
            inputProps={{ name: "Parent_Name" }}
            variant="outlined"
            value={medicalrecord.Parent_Name || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <p>Parent Address</p>
          <TextField
            id="Parent_address"
            type="string"
            inputProps={{ name: "Parent_address" }}
            variant="outlined"
            value={medicalrecord.Parent_address || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <p>Parent Phone</p>
          <TextField
            id="Parent_phone"
            type="string"
            inputProps={{ name: "Parent_phone" }}
            variant="outlined"
            value={medicalrecord.Parent_phone || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}></Grid>

        <Grid item xs={6}>
          <h3 className='title'>Medical history</h3>
        </Grid>
        <Grid item xs={6}></Grid>

        <Grid item xs={6}>
          <p>Medical history</p>
          <TextField
            id="Medical_history"
            type="string"
            inputProps={{ name: "Medical_history" }}
            variant="outlined"
            value={medicalrecord.Medical_history || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <p>Current Medications</p>
          <TextField
            id="Current_medications"
            type="string"
            inputProps={{ name: "Current_medications" }}
            variant="outlined"
            value={medicalrecord.Current_medications || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <div className="container my-4" style={{ width: "500px" }}>
            <form className="form w-100">
              <h3 className="title">Chronic or Recurring conditions</h3>
              <div className="form-check"></div>
              {chronics.map((chronic, index) => (
                <div className="form-check" key={index}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name={chronic.name}
                    checked={chronic?.isChecked || false}
                    onChange={handleChangecheckbox1}
                  />
                  <label className="namecheckbox">
                    {chronic.name}
                  </label>
                </div>
              ))}
            </form>
          </div>
        </Grid>

        <Grid item xs={6}>
          <div className="container my-4" style={{ width: "500px" }}>
            <form className="form w-100">
              <h3 className="title">Allergies</h3>
              <div className="form-check"></div>
              {allergies.map((aller, index) => (
                <div className="form-check" key={index}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name={aller.name}
                    checked={aller?.isChecked || false}
                    onChange={handleChangecheckbox2}
                  />
                  <label className="namecheckbox">{aller.name}</label>
                </div>
              ))}
            </form>
          </div>
        </Grid>

        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/medrachistory"
          >
            กลับ
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button
            style={{ float: "right" }}
            variant="contained"
            onClick={submitMedicalrecord}
            color="primary"
          >
            บันทึก
          </Button>
        </Grid> */}
      </Grid>
      </div>

      </div>
    </>
    
  );
}


{/* <Grid item xs={6}>
<Button 
        variant="contained" 
        color="primary" 
        component={RouterLink}
        to="/medrachistory"
        >กลับ</Button>
</Grid> */}

