import "./medrec.css";
import NavbarPatient from "../../components/NavbarPatient";

import React, {
  ChangeEvent,
  useEffect,
  useState,
  Fragment,
  SyntheticEvent,
} from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Box, Paper } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Select } from "@material-ui/core";
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
import { MedicalRecordInterface2 } from "../../model/Medicalrec";
import { DecrytionInterface } from "../../model/Decryption";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function HistoryMedicalrecord() {
  const [decryption, setDecryption] = useState<Partial<DecrytionInterface>>({});
  // const [decryption, setDecryption] = useState("")
  const [medicalrecord, setMedicalrecord] = useState<MedicalRecordInterface2[]>(
    []
  );
  const [output, SetOutput] = useState("");

  // const [decryption, setMedicalrecord] = useState<MedicalRecordInterface[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  let { id } = useParams();
  const getMedicalracordByID = async () => {
    const apiUrl = `http://localhost:8080/api/ListMedicalRecord/${id}`; //ดึง
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
  useEffect(() => {
    getMedicalracordByID();
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
        if (res.data) {
          setDecryption(res.data);
          SetOutput(res.data);

          return res.data;
        } else {
          setError(true);
          console.log(res);
        }
      });
  };
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
        {medicalrecord.map((item: MedicalRecordInterface2) => {
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

                    <div className="toptitle">
                      Personal Health and Medical Record
                    </div>
                  </div>
                </div>
                <Divider />

                <h3 className="title">Participant information</h3>

                <Grid container spacing={5}>
                  <Grid item xs={6}>
                    <p>Hospital number</p>
                    <TextField
                      type="string"
                      variant="outlined"
                      value={item.hospital_number}
                      disabled
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={6}>
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

                  <Grid item xs={6}>
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

                  <Grid item xs={6}>
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

                  <Grid item xs={6}>
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

                  <Grid item xs={6}>
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

                  <Grid item xs={6}>
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

                  <Grid item xs={6}>
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

                  <Grid item xs={6}>
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

                  <Grid item xs={6}>
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

                  <Grid item xs={6}>
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

                  <Grid item xs={6}>
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

                  <Grid item xs={6}>
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

                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      component={RouterLink}
                      to="/doctorrecordtable"
                    >
                      กลับ
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          );
        })}
        ,
      </div>
    </>
  );
}
