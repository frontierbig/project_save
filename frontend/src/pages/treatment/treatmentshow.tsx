import "./treatmentshow.css";
import NavbarPatient from "../../components/NavbarPatient";
import DateFnsUtils from "@date-io/date-fns";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { FormControl } from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { DecrytionInterface } from "../../model/Decryption";
import {
  TreatmentshowInterface,
  SubTreatmentshowInterface,
} from "../../model/Treatment";
import { resprondecrytion } from "../../model/Treatment";

import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
} from "@material-ui/core";
import { ExpandMore,ExpandLess } from "@material-ui/icons";
function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function TreatmentShow() {
  const [decryption, setDecryption] = useState<Partial<DecrytionInterface>>({});
  const [treatment, setTreatment] = useState<TreatmentshowInterface[]>([]);
  const [subtreatment, setSubTreatment] = useState<SubTreatmentshowInterface[]>(
    []
  );
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
          setSubTreatment(subTreatment);
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
        let b = res.data;
        if (res.data) {
          console.log(res);
          setOutput(b.methodtreatment);
          setOutput2(b.diagnosis);
          // setTreatment(res.data)
          setSuccess(true);
          // let  method_treatment = 'method_treatment';
          // setTreatment({ ...treatment,[method_treatment]: b.methodtreatment})
        } else {
          setError(true);
          console.log(res);
        }
      });
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

  interface CollapseCardProps {
    title: string;
    content: React.ReactNode;
  }
  const [expanded, setExpanded] = React.useState<boolean[]>([]);

  const handleExpandClick = (index: number) => {
    let curArr = [...expanded];
    curArr[index] = !curArr[index];
    setExpanded(curArr);
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

                  <Grid item xs={6}>
                    <p>Doctor</p>
                    <TextField
                      type="string"
                      variant="outlined"
                      value={item.doctor}
                      disabled
                      fullWidth
                    />
                  </Grid>

               

                    <div className="treatmentreccordlist">
                    <div className="toptitle">Treatment Reccord List</div>
                    <div>

                    <Button
                      style={{ float: "right" }}
                      variant="contained"
                      size="small"
                      onClick={DecryptionMedicalrecord}
                      color="primary"
                    >
                      Decryption
                    </Button>

                    <Button
                      style={{ float: "right" }}
                      variant="contained"
                      size="small"
                      onClick={DecryptionMedicalrecord}
                      color="primary"
                    >
                      Decryption
                    </Button>

                    </div>
                    
                    </div>
               

                    
                   

   
                  <Grid item xs={12}>
                    {subtreatment.map(
                      (item: SubTreatmentshowInterface, index: number) => {
                        return (
                          <div key={index}>
                            <Card>
                              <CardHeader
                                className="cardheaddertitle"
                                title={"Treatment Reccode " + (index + 1)}
                                titleTypographyProps={{
                                  style: { fontSize: "18px" , fontWeight: 600  },
                                }}
                         
                                action={
                                  <IconButton onClick={() => handleExpandClick(index)}>
                                      {expanded[index] ? <ExpandLess /> : <ExpandMore />}

                                  </IconButton>
                                }
                              />
                              <Collapse in={expanded[index]}>
                                <div className="contenttreatmentreccord">
                                  <Grid item xs={4} style={{ float: "right" }}>
                                  
                                    <p className="appointment">Appointment time </p>    
                                    <FormControl>
                                      <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                      >
                                        <KeyboardDatePicker
                                          name="Patient_dob"
                                          value={item.appointment}
                                          onChange={handleDateChange}
                                          format="yyyy/MM/dd HH:mm"
                                          fullWidth
                                          inputVariant={"standard"}
                                          disabled
                                          style={{ borderBottom: 'none' }}
                                          // disabled
                                        />
                                      </MuiPickersUtilsProvider>
                                    </FormControl>
                                   
                                  </Grid>
                                  

                                  <div className="addpadingtreatmentshow">
                                  <Grid item xs={12} >
                        
                                    <p>Diagnosis results </p>
                                    <TextField
                                      type="string"
                                      variant="outlined"
                                      multiline
                                      rows={3}
                                      value={item.diagnosis_results}
                                      disabled
                                      fullWidth
                                    />
                                
                                  </Grid>
                                  </div>
                                <div className="addpadingtreatmentshow">
                                  <Grid item xs={12}>
                                    <p>Method Treatment</p>
                                    <TextField
                                      type="string"
                                      variant="outlined"
                                      multiline
                                      rows={3}
                                      value={item.method_treatment}
                                      disabled
                                      fullWidth
                                    />
                                  </Grid>
                                  </div>
                                </div>
                              </Collapse>
                            </Card>
                          </div>
                        );
                      }
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    <p>Decryption</p>
                    <TextField
                      id="Decryption"
                      type="string"
                      inputProps={{ name: "Decryption" }}
                      variant="outlined"
                      value={decryption.Decryption || ""}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
              
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
                      style={{ float: "right" }}
                      variant="contained"
                      onClick={DecryptionMedicalrecord}
                      color="primary"
                    >
                      Decryption
                    </Button>
                  </Grid>

                  <Grid item xs={6}></Grid>
                </Grid>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
