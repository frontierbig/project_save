import NavbarPatient from "../../components/NavbarPatient";
import "./treatment.css";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormControlLabel, Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { FormControl } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  KeyboardDateTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Treatmentuserinterface } from "../../model/Treatment";
import { UserInterface } from "../../model/UserUI";
import { SubTreatmentInterface } from "../../model/Treatment";
import { MasterkeyInterface } from "../../model/Decryption";
import FormLabel from "@mui/material/FormLabel";
import Switch from "@mui/material/Switch";
import { MedicalRecordInterface2 } from "../../model/Medicalrec";
import Card from '@mui/material/Card';
import { ExpandMore,ExpandLess } from "@material-ui/icons";
import {
  CardHeader,
  Collapse,
  IconButton,
} from "@material-ui/core";

export default function SubTreatmentDoctor() {
  const [medicalrecord, setMedicalrecord] = useState<MedicalRecordInterface2[]>(
    []
  );
  // const [temp, setTemp] = useState<Partial<MedicalRecordInterface2>[]>([]);
  const [temp, setTemp] = useState<MedicalRecordInterface2[]>([]);
  const [treatmentuser, setTreatmentuser] = useState<Treatmentuserinterface[]>([]);

  const User: UserInterface = JSON.parse(localStorage.getItem("User") || "");

  const [patientid,setPatientID]= useState("")
  
  
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  useEffect(() => {
    getTreatmentUser();
  }, []);

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [checked, setChecked] = React.useState(false);
  const [masterkey, setMasterkey] = useState<Partial<MasterkeyInterface>>({});
  const [subtreatment, setSubTreatment] = useState<Partial<SubTreatmentInterface>>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (
    event: ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof subtreatment;
    setSubTreatment({ ...subtreatment, [name]: event.target.value });
  };

  const handleChangekey = (
    event: ChangeEvent<{ name?: string; value: any }>
  ) => {
    const name = event.target.name as keyof typeof masterkey;
    setMasterkey({ ...masterkey, [name]: event.target.value });
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

  const getTreatmentUser = async () => {
    const apiUrl = `http://localhost:8080/api/ListTreatmentuser`; //ดึง
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
        console.log(res.data,"ASDASDASDSADASDas");
        if (res.data) {
          console.log(res.data);
          setTreatmentuser(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const [ErrorMessage, setErrorMessage] = React.useState<String>();

  const submitTreatment = () => {
    let data = {
      Treatment_ID: subtreatment.Treatment_ID ?? "",
      Patient_id : patientid??"",
      Diagnosis_results: subtreatment.Diagnosis_results ?? "",
      Method_treatment: subtreatment.Method_treatment ?? "",
      Note: subtreatment.Note??"",
      Appointment_time: selectedDate ?? "",
      Master_Key: masterkey.Master_Key ?? "",
      Encryptionselect:checked,
    };

    console.log(data);

    const apiUrl = "http://localhost:8080/api/CreateSubTreatment";
    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
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
  };

  console.log(checked)
  const handleChangesw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setMasterkey({});
  };
  const SelectNameChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown  }>
  ) => {
    const name = event.target.name as keyof typeof subtreatment;
    setSubTreatment({ ...subtreatment, [name]: event.target.value });

    const value = event.target.value;
    console.log(value)
    
    return value;
  };

  const getMedicalracordByID = async (id : any) => {
    setPatientID(id)
    const apiUrl = `http://localhost:8080/api/ListMedicalRecordBypatient/${id}`; //ดึง
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
          setMedicalrecord(res.data);
        } else {
          console.log("else");
        }
      });
  };


  return (
    <>
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
                  บันทึกข้อมูลสำเร็จ
                </Alert>
              </Snackbar>
              <Snackbar
                open={error}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="error">
                  Invalid MasterKey
                </Alert>
              </Snackbar>
              <br />

              <div className="toptitle"> Add Treatment</div>
            </div>
          </div>
          <Divider />
          <br />

          <Grid container spacing={5}>
            <Grid item xs={5}>
              <p>Name</p>
              <Select
                variant="outlined"
                // value={equipment.SportTypeID}
                onChange={SelectNameChange}
            
                defaultValue={0}
                // inputProps={{ name: "Patient_ID" }}
                 inputProps={{ name: "Treatment_ID" }}
                 value={subtreatment.Treatment_ID}            
                fullWidth
              >
                <MenuItem value={0} key={0} disabled>
                  SelectUser
                </MenuItem>
                {treatmentuser.map((item: Treatmentuserinterface) => (
                  <MenuItem value={item.id} key={item.id}
                  onClick={() => getMedicalracordByID(item.patient_id)}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs ={10}>
            {medicalrecord.map(
                      (item: MedicalRecordInterface2, index: number) => {
                        return (
                          <div key={index}  >
              
              <Card sx = {{borderRadius:0}}>
                <CardHeader

                 className="cardheaddertitle"
                                title={"MedicalRecord" }
                                titleTypographyProps={{
                                  style: { fontSize: "18px" , fontWeight: 600  },
                                }}
                         
                                action={
                                  <IconButton onClick={() => handleExpandClick()}>
                                      {expanded ? <ExpandLess /> : <ExpandMore />}

                                  </IconButton>
                                }
               />
                <Collapse in={expanded}>
                  <div className="contenttreatmentreccord">

                    <div className="contenttreatmentreccord2">
                  <Grid item xs={5} >
                    <p>Hospital number</p>
                    <TextField
                      type="string"
                      variant="outlined"
                      value={item.hospital_number}
                      disabled
                      fullWidth
                    />
                    

                  </Grid>
                  <Grid item xs={1} >
                  </Grid>

                  <Grid item xs={5}>
                    <p>Personal ID</p>
                    <TextField
                      id="Personal_ID"
                      type="string"
                      disabled
                      variant="outlined"
                      value={item.personal_id}
                      fullWidth
                    />
                  </Grid>
                  </div>

                  <div className="contenttreatmentreccord2">
                  <Grid item xs={5}>
                    <p>Name</p>
                    <TextField
                      id="Name"
                      type="string"
                      variant="outlined"
                      value={item.patient}
                      disabled
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1} >
                  </Grid>

                  <Grid item xs={5}>
                    <p>Age</p>
                    <TextField
                      id="Patient_Age"
                      type="string"
                      disabled
                      inputProps={{ name: "Patient_Age" }}
                      variant="outlined"
                      value={item.patient_age}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  </div>

                  <div className="contenttreatmentreccord2">

                  <Grid item xs={5}>
                    <p>Gender</p>
                    <TextField
                      id="Patient_gender"
                      type="string"
                      disabled
                      inputProps={{ name: "Patient_gender" }}
                      variant="outlined"
                      value={item.patient_gender}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1} >
                  </Grid>

                  <Grid item xs={5}>
                    <FormControl variant="outlined">
                      <p>Date of birth</p>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          name="Patient_dob"
                          onChange={handleDateChange}
                          disabled
                          value={item.patient_dob}
                          format="yyyy-MM-dd"
                          fullWidth
                        />
                      </MuiPickersUtilsProvider>
                    </FormControl>
                  </Grid>
                  </div>

                  <div className="contenttreatmentreccord2">

                  
                  <Grid item xs={5}>
                    <p>Address</p>
                    <TextField
                      id="Patient_address"
                      type="string"
                      variant="outlined"
                      disabled
                      value={item.parent_address}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1} >
                  </Grid>

                  <Grid item xs={5}>
                    <p>Phone</p>
                    <TextField
                      id="Patient_phone"
                      type="string"
                      variant="outlined"
                      disabled
                      value={item.patient_phone}
                      fullWidth
                    />
                  </Grid>
                  </div>

                  <Grid item xs={6}>
                    <div className="form-check">
                      <h3 className="title">Parent infromation</h3>
                      <input
                        type="checkbox"
                        disabled
                        className="form-check-input"
                        name="Both_parent"
                        checked={item.Both_parent}
                      />
                      <label className="namecheckbox">Both_parent</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        disabled
                        className="form-check-input"
                        name="Guardain"
                        checked={item.Guardian}
                      />
                      <label className="namecheckbox">Guardain</label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        disabled
                        className="form-check-input"
                        name="Mother_Only"
                        checked={item.Mother_only}
                      />
                      <label className="namecheckbox">Mother Only</label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        disabled
                        className="form-check-input"
                        name="Father_only"
                        checked={item.Father_only}
                      />
                      <label className="namecheckbox">Father only</label>
                    </div>
                  </Grid>

                  <Grid item xs={6}>
                    {" "}
                  </Grid>
                  <div className="contenttreatmentreccord2">
                  <Grid item xs={5}>
                    <p>Parent name</p>
                    <TextField
                      id="Parent_Name"
                      type="string"
                      variant="outlined"
                      value={item.parent_name}
                      disabled
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1} >
                  </Grid>

                  <Grid item xs={5}>
                    <p>Parent Address</p>
                    <TextField
                      id="Parent_address"
                      type="string"
                      variant="outlined"
                      value={item.parent_address}
                      disabled
                      fullWidth
                    />
                  </Grid>
                  </div>

                  <Grid item xs={5}>
                    <p>Parent Phone</p>
                    <TextField
                      id="Parent_phone"
                      type="string"
                      variant="outlined"
                      value={item.parent_phone}
                      disabled
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}></Grid>

                  <Grid item xs={6}>
                    <h3 className="title">Medical history</h3>
                  </Grid>
                  <Grid item xs={6}></Grid>
                  <div className="contenttreatmentreccord2">
                  <Grid item xs={5}>
                    <p>Medical history</p>
                    <TextField
                      id="Medical_history"
                      type="string"
                      variant="outlined"
                      value={item.medical_history}
                      disabled
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1} >
                  </Grid>

                  <Grid item xs={5}>
                    <p>Current Medications</p>
                    <TextField
                      id="Current_medications"
                      type="string"
                      variant="outlined"
                      value={item.current_medications}
                      disabled
                      fullWidth
                    />
                  </Grid>
                  </div>
                  <div className="contenttreatmentreccord2">

                 
                  <Grid item xs={6}>
                    <div className="form-check">
                      <h3 className="title">Chronic or Recurring conditions</h3>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={item.Asthma}
                        disabled
                      />
                      <label className="namecheckbox">Asthma</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        disabled
                        className="form-check-input"
                        name="Guardain"
                        checked={item.Heart_disease}
                      />
                      <label className="namecheckbox">
                        Heart disease / defect
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        disabled
                        className="form-check-input"
                        name="Mother_Only"
                        checked={item.Bleeding_Disorders}
                      />
                      <label className="namecheckbox">Bleeding Disorders</label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        disabled
                        className="form-check-input"
                        name="Father_only"
                        checked={item.Urinary_Infection}
                      />
                      <label className="namecheckbox">Urinary Infection</label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        disabled
                        className="form-check-input"
                        name="Father_only"
                        checked={item.Convulsions}
                      />
                      <label className="namecheckbox">
                        Convulsions / Seizures
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="Father_only"
                        disabled
                        checked={item.Vision_Contacts}
                      />
                      <label className="namecheckbox">
                        Vision – Contacts / Glasses
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        disabled
                        className="form-check-input"
                        name="Father_only"
                        checked={item.Diabetes}
                      />
                      <label className="namecheckbox">Diabetes</label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        disabled
                        className="form-check-input"
                        name="Father_only"
                        checked={item.Teeth_dentures}
                      />
                      <label className="namecheckbox">
                        Teeth – dentures / bridge
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        disabled
                        className="form-check-input"
                        name="Father_only"
                        checked={item.Ear_Infection}
                      />
                      <label className="namecheckbox">Ear Infection</label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        disabled
                        className="form-check-input"
                        name="Father_only"
                        checked={item.Menstrual_problems}
                      />
                      <label className="namecheckbox">Menstrual problems</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        disabled
                        className="form-check-input"
                        name="Father_only"
                        checked={item.Emotional}
                      />
                      <label className="namecheckbox">
                        Emotional / behavior disturbance
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        disabled
                        className="form-check-input"
                        name="Father_only"
                        checked={item.Fainting}
                      />
                      <label className="namecheckbox">Fainting</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        disabled
                        className="form-check-input"
                        name="Father_only"
                        checked={item.Hypertension}
                      />
                      <label className="namecheckbox">Hypertension</label>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="form-check">
                      <h3 className="title">AllergiesData</h3>
                      <input
                        type="checkbox"
                        disabled
                        className="form-check-input"
                        checked={item.Animals}
                      />
                      <label className="namecheckbox">Animals</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        disabled
                        className="form-check-input"
                        name="Guardain"
                        checked={item.Plants}
                      />
                      <label className="namecheckbox">Plants</label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        disabled
                        className="form-check-input"
                        name="Mother_Only"
                        checked={item.Food}
                      />
                      <label className="namecheckbox">Foods</label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        disabled
                        className="form-check-input"
                        name="Father_only"
                        checked={item.Pollen}
                      />
                      <label className="namecheckbox">Pollen</label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        disabled
                        className="form-check-input"
                        name="Father_only"
                        checked={item.Hay_Fever}
                      />
                      <label className="namecheckbox">Hay Fever</label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        disabled
                        className="form-check-input"
                        name="Father_only"
                        checked={item.Insect_Stings}
                      />
                      <label className="namecheckbox">Insect Stings</label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        disabled
                        className="form-check-input"
                        name="Father_only"
                        checked={item.Medicine_drugs}
                      />
                      <label className="namecheckbox">Medicine/drugs</label>
                    </div>
                    
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

         

            <Grid item xs={10}>
              <p>Diagnosis results</p>
              <TextField
                id="Diagnosis_results"
                type="string"
                inputProps={{ name: "Diagnosis_results" }}
                variant="outlined"
                value={subtreatment.Diagnosis_results || ""}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
              />
            </Grid>

            <Grid item xs={10}>
              <p>Method of treatment</p>
              <TextField
                id="Method_treatment"
                type="string"
                inputProps={{ name: "Method_treatment" }}
                variant="outlined"
                value={subtreatment.Method_treatment || ""}
                multiline
                rows={3}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={10}>
              <p>Note</p>
              <TextField
                id="Note"
                type="string"
                inputProps={{ name: "Note" }}
                variant="outlined"
                value={subtreatment.Note || ""}
                multiline
                rows={3}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl variant="outlined">
               
      <TextField
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
       
        InputLabelProps={{
          shrink: true,
        }}
      />
  
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    name="Patient_dob"
                    value={selectedDate}
                    onChange={handleDateChange}
                    format="yyyy/MM/dd HH:mm"
                    fullWidth
                  />
                </MuiPickersUtilsProvider> */}
              </FormControl>
            </Grid>
            <Grid item xs={5}></Grid>

            <Grid item xs={12}>
              <h3>Encryption</h3>

              <Switch
                checked={checked}
                onChange={handleChangesw}
                inputProps={{ "aria-label": "controlled" }}
                value={checked}
               
              />

           <Grid item xs={5} className={checked? "encryptioninputacctive" : "encryptioninputhide"}>
                <p>Master Key</p>
                <TextField
                  id="Master_Key"
                  type="string"
                  inputProps={{ name: "Master_Key" }}
                  variant="outlined"
                  value={masterkey.Master_Key || ""}
                  onChange={handleChangekey}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item xs={12}></Grid>

    
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
                onClick={submitTreatment}
                color="primary"
              >
                บันทึก
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
