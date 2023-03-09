import "./medrec.css";
import NavbarPatient from "../../components/NavbarPatient";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MedicalRecordInterface } from "../../model/Medicalrec";
import { UserInterface } from "../../model/UserUI";

const ParentData = [
  { name: "Both_parent" },
  { name: "Guardain" },
  { name: "Mother Only" },
  { name: "Father Only" },
];

const ChronicData = [
  { name: "Asthma" },
  { name: "Heart disease / defect " },
  { name: "Bleeding Disorders" },
  { name: "Urinary Infection" },
  { name: "Convulsions / Seizures " },
  { name: "Vision – Contacts / Glasses" },
  { name: "Diabetes " },
  { name: "Teeth – dentures / bridge" },
  { name: "Ear Infection" },
  { name: "Menstrual problems" },
  { name: "Emotional / behavior disturbance" },
  { name: "Fainting" },
  { name: "Hypertension" },
];
const AllergiesData = [
  { name: "Animals" },
  { name: "Plants" },
  { name: "Food(s)" },
  { name: "Pollen" },
  { name: "Hay Fever " },
  { name: "Insect Stings" },
  { name: "Medicine/drugs" },
];

export default function MedrecDoctor() {
  const [User, setUser] = useState<UserInterface[]>([]);

  const [parents, setParents] = useState<any[]>([]);
  const [chronics, setChronic] = useState<any[]>([]);
  const [allergies, setAllergies] = useState<any[]>([]);

  useEffect(() => {
    setParents(ParentData);
    setChronic(ChronicData);
    setAllergies(AllergiesData);
    getUser();
  }, []);

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  // const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const [medicalrecord, setMedicalRecord] = useState<Partial<MedicalRecordInterface>>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };
  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

  const handleChange = (
    event: ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof medicalrecord;
    setMedicalRecord({ ...medicalrecord, [name]: event.target.value });
  };

  // const handleDateChange = (date: Date | null) => {
  //   console.log(date);
  //   setSelectedDate(date);
  // };
  const handleChangecheckbox = (e: any) => {
    const { name, checked } = e.target;
    let tempParent = parents.map((parent) =>
      parent.name === name ? { ...parent, isChecked: checked } : parent
    );
    setParents(tempParent);
  };

  const handleChangecheckbox1 = (e: any) => {
    const { name, checked } = e.target;
    let tempChronic = chronics.map((chronic) =>
      chronic.name === name ? { ...chronic, isChecked: checked } : chronic
    );
    setChronic(tempChronic);
  };
  const handleChangecheckbox2 = (e: any) => {
    const { name, checked } = e.target;
    let tempAllergies = allergies.map((aller) =>
      aller.name === name ? { ...aller, isChecked: checked } : aller
    );
    setAllergies(tempAllergies);
  };

  const getUser = async () => {
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
          setUser(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const [ErrorMessage, setErrorMessage] = React.useState<String>();
  
  // const handleDateChange = (date: Date | null) => {
  //   console.log(date);
  // };
  // const classes = useStyles();

  const submitMedicalrecord = () => {
    let data = {
      //?? ""
      Hospital_Number: medicalrecord.Hospital_Number ?? "",
      Personal_ID: medicalrecord.Personal_ID ?? "",
      Patient_ID: medicalrecord.Patient_ID ?? "",
      Patient_Age:
        typeof medicalrecord.Patient_Age === "string"
          ? parseInt(medicalrecord.Patient_Age)
          : NaN,
      Patient_gender: medicalrecord.Patient_gender ?? "",
      Patient_dob:selectedDate ?? "",
      Patient_address: medicalrecord.Patient_address ?? "",
      Patient_phone: medicalrecord.Patient_phone ?? "",

      Both_parent: parents[0].isChecked ? true : false,
      Guardian: parents[1].isChecked ? true : false,
      Mother_only: parents[2].isChecked ? true : false,
      Father_only: parents[3].isChecked ? true : false,

      Parent_Name: medicalrecord.Parent_Name ?? "",
      Parent_address: medicalrecord.Parent_address ?? "",
      Parent_phone: medicalrecord.Parent_phone ?? "",
      Medical_history: medicalrecord.Medical_history ?? "",
      Current_medications: medicalrecord.Current_medications ?? "",

      Secret_Data: medicalrecord.Secret_Data ?? "",
      Master_Key: medicalrecord.Master_Key ?? "",

      Asthma: chronics[0].isChecked ? true : false,
      Heart_disease: chronics[1].isChecked ? true : false,
      Bleeding_Disorders: chronics[2].isChecked ? true : false,
      Urinary_Infection: chronics[3].isChecked ? true : false,
      Convulsions: chronics[4].isChecked ? true : false,
      Vision_Contacts: chronics[5].isChecked ? true : false,
      Diabetes: chronics[6].isChecked ? true : false,
      Teeth_dentures: chronics[7].isChecked ? true : false,
      Ear_Infection: chronics[8].isChecked ? true : false,
      Menstrual_problems: chronics[9].isChecked ? true : false,
      Emotional: chronics[10].isChecked ? true : false,
      Fainting: chronics[11].isChecked ? true : false,
      Hypertension: chronics[12].isChecked ? true : false,

      Animals: allergies[0].isChecked ? true : false,
      Plants: allergies[1].isChecked ? true : false,
      Food: allergies[2].isChecked ? true : false,
      Pollen: allergies[3].isChecked ? true : false,
      Hay_Fever: allergies[4].isChecked ? true : false,
      Insect_Stings: allergies[5].isChecked ? true : false,
      Medicine_drugs: allergies[6].isChecked ? true : false,
    };

    console.log(data);

    const apiUrl = "http://localhost:8080/api/CreateMedicalRecord";
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
                  {ErrorMessage}
                </Alert>
              </Snackbar>
              <br />

              <div className="toptitle">Personal Health and Medical Record</div>
            </div>
          </div>
          <Divider />

          <h3 className="title">Participant information</h3>

          <Grid container spacing={5}>
            <Grid item xs={6}>
              <p>Hospital number</p>
              <TextField
                id="Hospital_Number"
                type="string"
                inputProps={{ name: "Hospital_Number" }}
                variant="outlined"
                value={medicalrecord.Hospital_Number || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
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
                  <h3 className="title">Parent infromation</h3>
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
              <h3 className="title">Medical history</h3>
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
             
                  <h3 className="title">Chronic or Recurring conditions</h3>
                  
                  {chronics.map((chronic, index) => (
                    <div className="form-check" key={index}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name={chronic.name}
                        checked={chronic?.isChecked || false}
                        onChange={handleChangecheckbox1}
                      />
                      <label className="namecheckbox">{chronic.name}</label>
                    </div>
                  ))}
             
            </Grid>

            <Grid item xs={6}>
            
          
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

            <Grid item xs={6}>
              <Button
                style={{ float: "right" }}
                variant="contained"
                onClick={submitMedicalrecord}
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
