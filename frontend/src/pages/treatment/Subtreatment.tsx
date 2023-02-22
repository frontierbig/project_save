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

export default function SubTreatmentDoctor() {
  const [treatmentuser, setTreatmentuser] = useState<Treatmentuserinterface[]>([]);

  const User: UserInterface = JSON.parse(localStorage.getItem("User") || "");

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
        console.log(res.data);
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
      Diagnosis_results: subtreatment.Diagnosis_results ?? "",
      Method_treatment: subtreatment.Method_treatment ?? "",
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
                  {ErrorMessage}
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
                onChange={handleChange}
                defaultValue={0}
                // inputProps={{ name: "Patient_ID" }}
                 inputProps={{ name: "Treatment_ID" }}
                 value={subtreatment.Treatment_ID||""}
                
                fullWidth
              >
                <MenuItem value={0} key={0} disabled>
                  SelectUser
                </MenuItem>
                {treatmentuser.map((item: Treatmentuserinterface) => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={5}></Grid>

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
