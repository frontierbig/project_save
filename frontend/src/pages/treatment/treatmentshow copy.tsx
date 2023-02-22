// import "./medrec.css";
import NavbarPatient from "../../components/NavbarPatient";
import DateFnsUtils from "@date-io/date-fns";
import React, {
  ChangeEvent,
  useEffect,
  useState,
} from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import {KeyboardDatePicker} from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import { FormControl } from "@material-ui/core";

import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { DecrytionInterface } from "../../model/Decryption";
import { TreatmentshowInterface,SubTreatmentshowInterface } from "../../model/Treatment";
import { resprondecrytion } from "../../model/Treatment";
function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function TreatmentShow() {
  const [decryption, setDecryption] = useState<Partial<DecrytionInterface>>({});
  const [treatment, setTreatment] = useState<TreatmentshowInterface[]>([]);
  const [subtreatment, setSubTreatment] = useState<SubTreatmentshowInterface[]>([]);
  const [output, setOutput] = useState("");
  const [output2, setOutput2] = useState<resprondecrytion[]>([]);



  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  let { id } = useParams();

  const getTreatmentByID = async () => {
    const apiUrl = `http://localhost:8080/api/ListTreatment/${id}`; //ดึง
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    await fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
           // Access the individual fields of the Treatmentrespon struct
           const treatment = res.data[0].treatment;
           const subTreatment = res.data[0].sub_treatment;
 
           // Use the values in the Treatmentrespon struct
           console.log("Treatment:", treatment);
           console.log("SubTreatment:", subTreatment);

          setTreatment(treatment);
          setTreatment(subTreatment);
        } else {
          console.log("else");
        }
      });
  };
  useEffect(() => {
    getTreatmentByID();
    // DecryptionMedicalrecord()
  }, []);
  const handleChange = (event: ChangeEvent<{ name?: string; value: any }>) => {
    const name = event.target.name as keyof typeof decryption;
    setDecryption({ ...decryption, [name]: event.target.value });
  };

  const DecryptionMedicalrecord = async () => {
    const apiUrl = `http://localhost:8080/api/DecryptionMedicalRecord/${id}`;
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(decryption),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        let b = res.data
        if (res.data) {
          console.log(res);
          setOutput(b.methodtreatment)
          setOutput2(b.diagnosis); 
          // setTreatment(res.data)
          setSuccess(true)
          // let  method_treatment = 'method_treatment';
          // setTreatment({ ...treatment,[method_treatment]: b.methodtreatment})
          
        } else {
          setError(true);
          console.log(res);
        }
      })
      
  };
  const [ErrorMessage, setErrorMessage] = React.useState<String>();
  const handleDateChange = (date: Date | null) => {
    console.log(date);
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
      <div className="oneh">
        {treatment.map((item: TreatmentshowInterface) => {
          return (
            <div className="paper">
        <div className="content">
          <div>
            <div>
            <Snackbar
                      open={success}
                      autoHideDuration={6000}
                      onClose={handleClose}
                    >
                      <Alert onClose={handleClose} severity="success">
                        Decriptionsuccess
                      </Alert>
                    </Snackbar>
                    <Snackbar
                      open={error}
                      autoHideDuration={6000}
                      onClose={handleClose}
                    >
                      <Alert onClose={handleClose} severity="error">
                        Decription fail , invalid Key
                      </Alert>
                    </Snackbar>
                    <br />

              <div className="toptitle">Treatment</div>
            </div>
          </div>
          <Divider />
          <br />

          <Grid container spacing={5}>


             <Grid item xs={6}>
              <p>Name</p>
              <TextField   
                type="string"
                variant="outlined"
                value={item.patient}
                disabled
                fullWidth
              />
            </Grid>

            <Grid item xs={5}></Grid>

            {/* <Grid item xs={10}>
              <p>Diagnosis results</p>
              <TextField
                id="Diagnosis_results"
                type="string"
                disabled
                inputProps={{ name: "Diagnosis_results" }}
                variant="outlined"
                value={item.diagnosis_results}
                multiline
                rows={3}
                fullWidth
              />
            </Grid> */}

            {/* <Grid item xs={10}>
              <p>Method of treatment</p>
              <TextField
                id="Method_treatment"
                type="string"
                inputProps={{ name: "Method_treatment" }}
                variant="outlined"
                value={item.method_treatment}
                multiline
                rows={3}
                disabled
                onChange={handleChange}
                fullWidth
              />
            </Grid> */}

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
                    disabled
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </Grid>

            <Grid item xs={5}></Grid>

        
<Grid item xs={6}>
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

                            <Grid item xs={10}>
                                <p>Output</p>
                               <TextField 
                               id="Output" 
                               type="string"
                               disabled
                               multiline
                               rows={3}
                               inputProps={{name:"Output"}}
                               variant="outlined" 
                               value={output2}                
                               fullWidth
                               />
                            </Grid>

                            <Grid item xs={10}>
                                <p>Output</p>
                               <TextField 
                               id="Output" 
                               type="string"
                               disabled
                               multiline
                               rows={3}
                               inputProps={{name:"Output"}}
                               variant="outlined" 
                               value={output}                
                               fullWidth
                               />
                            </Grid>
                            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/treatmentdoctortable"
              >
                กลับ
              </Button>
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
            

    
           

            <Grid item xs={6}>
            
            </Grid>
          </Grid>

          
        </div>
      </div>
          );
        })}

      
      </div>
    </>
  );
}
