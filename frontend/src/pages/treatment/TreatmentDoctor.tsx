import NavbarPatient from '../../components/NavbarPatient'

import React, { ChangeEvent,
  useEffect,
  useState, 
  Fragment, 
  SyntheticEvent } from 'react';
import { Link as RouterLink } from "react-router-dom";
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
import { TreatmentInterface } from '../../model/Treatment';
import { UserInterface} from '../../model/UserUI';
import { MasterkeyInterface } from '../../model/Decryption';

import { DateTimePicker } from "@material-ui/pickers";




const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(3),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      marginTop:theme.spacing(4),
    
    },
    container: { marginTop: theme.spacing(2) },
    combobox: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: '50ch',
      },
    },

    textbox: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: '50ch',
      },
    },
  
    
  }),
);






export default function  MedrecPatient() {


  const [patient, setPatient] = useState<UserInterface[]>([]);

  const User: UserInterface = JSON.parse(localStorage.getItem("User") || "");


 
 useEffect(() => {
  
    getUser();
    },[]);
    


  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const [masterkey, setMasterkey] = useState<Partial<MasterkeyInterface>>( {} );
  const [treatment, setTreatment] = useState<Partial<TreatmentInterface>>(
    {}
  );
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (event: ChangeEvent<{name?: string; value: unknown}>) => {
    const name = event.target.name as keyof typeof treatment;
    setTreatment({...treatment, [name]: event.target.value,});
  }; 

  const handleChangekey = (event: ChangeEvent<{name?: string; value: any}>) => {
    const name = event.target.name as keyof typeof masterkey;
    setMasterkey({...masterkey,[name]: event.target.value,});
  }; 

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };



  

  const getUser= async() => {
    const apiUrl = `http://localhost:8080/api/ListUser`; //ดึง
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

          console.log(res.data);
          setPatient(res.data);
        } else {
          console.log("else");
        }
      });
    }
  


  const [ErrorMessage, setErrorMessage] = React.useState<String>();

  const submitTreatment = () => {
    let data = {
      //?? ""
      Patient_ID:treatment.Patient_ID?? "",
      Diagnosis_results : treatment.Diagnosis_results??"",      
      Method_treatment : treatment.Method_treatment??"",
      Appointment_time : selectedDate??"",
      Master_Key  :  masterkey.Master_Key??"",
      Doctor_ID : User.ID
    };

    console.log(data)

    const apiUrl = "http://localhost:8080/api/CreateTreatment";
      const requestOptionsPost = {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",},
        body: JSON.stringify(data),
      };
  
       fetch(apiUrl, requestOptionsPost)
        .then((response) => response.json())
        .then((res) => {
          if (res.data) {
            setSuccess(true);
          } else {
            setError(true);
            setErrorMessage(res.error);
          }
        });
    
}

return (
    <>
    <NavbarPatient/>

   
    <Container className={classes.container} maxWidth="md">
    <Paper className={classes.paper}>
        <div >
            <div >

            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {ErrorMessage}
        </Alert>
      </Snackbar>
      <br/><br/> 

                <Typography
                    component="h2"

                    variant="h6"

                    color="primary"

                    gutterBottom
                >
                    Treatment
                </Typography>

            </div>
        </div>
        <Divider />

        
                <Grid container spacing={5}>
                    

                    

                    <Grid item xs={5}>
                        <p>Name</p>
                        <Select variant="outlined"                         
                            // value={equipment.SportTypeID}
                            onChange={handleChange}
                            defaultValue={0}
                            inputProps={{ name: "Patient_ID" }}
                            fullWidth
                        >
                              <MenuItem value={0} key={0} disabled>
                SelectUser
              </MenuItem>
                     {patient.map((item: UserInterface) => (
                <MenuItem value={item.ID} key={item.ID}>
                  {item.Name}
                </MenuItem>
              ))}
                        </Select>
                    </Grid>



                    <Grid item xs={5}>
                       
                    </Grid>


                    <Grid item xs={10}>
                        <p>Diagnosis results</p>
                        <TextField 
                        id="Diagnosis_results" 
                        type="string"
                        inputProps={{name:"Diagnosis_results"}}
                        variant="outlined" 
                        value={treatment.Diagnosis_results ||""}
                        onChange={handleChange}            
                        multiline      
                        rows={3}
                        fullWidth/>
                    </Grid>






                




    
                
                    <Grid item xs={10}>
                        <p>Method of treatment</p>
                        <TextField 
                        id="Method_treatment" 
                        type="string"
                        inputProps={{name:"Method_treatment"}}
                        variant="outlined" 
                        value={treatment.Method_treatment ||""}
                        multiline      
                        rows={3}
                        onChange={handleChange}                      
                        fullWidth/>
                    </Grid>
                    

                    <Grid item xs={6}> 
                      <FormControl variant="outlined">
                        <p>Appointment time</p>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                name="Patient_dob"
                                value={selectedDate}
                                onChange={handleDateChange}
                 
                                format="yyyy/MM/dd HH:mm"
                                fullWidth
                            />
                          </MuiPickersUtilsProvider>
                      </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                   
                    </Grid>
                  

                    <Grid item xs={6}>
                    <h3>Encryption</h3>
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>




                    <Grid item xs={5}>
                        <p>Master Key</p>
                        <TextField 
                        id="Master_Key" 
                        type="string"
                        inputProps={{name:"Master_Key"}}
                        variant="outlined" 
                        value={masterkey.Master_Key ||""}
                        onChange={handleChangekey}                      
                        fullWidth/>
                    </Grid>
                    
                    <Grid item xs={5}>
                    </Grid>

                    <Grid item xs={6}>
                        <Button 
                                variant="contained" 
                                color="primary" 
                                component={RouterLink}
                                to="/medrachistory"
                                >กลับ</Button>
                    </Grid>


                    <Grid item xs={6}>
                      <Button
                        style={{ float: "right" }}
                        variant="contained"
                        onClick={submitTreatment}
                        color="primary"
              
                      >
                        บันทึก
                      </Button>
                    </Grid>

                    

        
                </Grid>   
        
        </Paper>
    </Container>
    
 </>
  
)
}