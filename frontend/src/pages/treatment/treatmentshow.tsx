import "./treatmentshow.css";
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
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import KeyIcon from '@mui/icons-material/Key';
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { DecrytionInterface } from "../../model/Decryption";
import {
  TreatmentshowInterface,
  SubTreatmentshowInterface,
} from "../../model/Treatment";
import { resprondecrytion } from "../../model/Treatment";
import Card from '@mui/material/Card';
import {
  CardHeader,
  Collapse,
  IconButton,
} from "@material-ui/core";
import { ExpandMore,ExpandLess } from "@material-ui/icons";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function TreatmentShow() {
  const [decryption, setDecryption] = useState<Partial<DecrytionInterface>>({});
  
  const Role: any = localStorage.getItem("Role"||"");
 
  // const [treatment, setTreatment] = useState<TreatmentshowInterface[]>([]);
  const [treatment, setTreatment] = useState<Partial<TreatmentshowInterface>>({});
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
          setTreatment(res.data.treatment);
          setSubTreatment(res.data.sub_treatment);
        } else {
          console.log("else");
        }
      });
  };
  useEffect(() => {
    getTreatmentByID();
  }, []);

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDecryption({...decryption, "Decryption": "",});
  };

  const handleChange = (event: ChangeEvent<{name?: string; value: any}>) => {
    const name = event.target.name as keyof typeof decryption;
    setDecryption({...decryption, [name]: event.target.value,});
  }; 
  const DecrypListTreatmentByID = async () => {
    let data = {
      Role: Role,
      Master_Key:decryption.Decryption,
    };
    const apiUrl = `http://localhost:8080/api/DecrypListTreatmentByID/${id}`;
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        
        if (res.data) {
          setTreatment(res.data.treatment);
          setSubTreatment(res.data.sub_treatment);
          setSuccess(true);
          setDecryption({...decryption, "Decryption": "",});
          handleCloseDialog();
          
        } else {
          setError(true);
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

  const handleExpandClickall = () => {
    let trueCount = 0;
    var falseCount = 0;
    expanded.forEach((value) => {
      if (value === true) {
        trueCount++;
      } else {
        falseCount++;
      }
    });

    if (falseCount === 0) {
      let falseArr = Array(expanded.length).fill(false);
      setExpanded(falseArr);
      
    }else{
      let trueArr = Array(expanded.length).fill(true);
      setExpanded(trueArr);
    }
 
  };


  return (
    <>
      <div className="oneh">
        
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
                      value={treatment.patient||""}
                      disabled
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <p>Doctor</p>
                    <TextField
                      type="string"
                      variant="outlined"
                      value={treatment.doctor||""}
                      disabled
                      fullWidth
                    />
                  </Grid>

               

                    <div className="treatmentreccordlist">
                    <div className="toptitle">Treatment Reccord List</div>
                    <div>

                    <Button
                      style={{ float: "left"  ,cursor: "pointer" ,color:'white' ,marginRight:'10px'}}
                      variant="contained"
                      size="small"
                      onClick={handleClickOpen}
                      color="primary"
                    >
         <KeyIcon style={{ fill: "#white",marginRight:'10px' }} />
          Decryption
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Decryption</DialogTitle>
        <DialogContent>
          <DialogContentText>
          You can see all treatment encrypted data   Plesase Enter  Decryption Key.
          </DialogContentText>
          <TextField
            margin="dense"
            id="Decryption"
            value={decryption.Decryption || ""}
            inputProps={{ name: "Decryption" }}
            label="Decryption Key"
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button 
          style={{ float: "left"  ,cursor: "pointer",backgroundColor:'#b20000' ,color:'white' }}
          onClick={handleCloseDialog}
         
          >Cancel</Button>
          <Button 
          onClick={DecrypListTreatmentByID}
          style={{ float: "left"  ,cursor: "pointer",backgroundColor:'#166d52' ,color:'white' }}
          >OK</Button>
        </DialogActions>
      </Dialog>

                    <Button
                      style={{ float: "right" }}
                      variant="contained"
                      size="small"
                      onClick={handleExpandClickall}
                      color="primary"
                    >
                      <VisibilityOutlinedIcon style={{ fill: "#white",marginRight:'10px' }} />
                      Show data
                    </Button>

                    </div>
                    
                    </div>
               
                  <Grid item xs={12}>
                    {subtreatment.map(
                      (item: SubTreatmentshowInterface, index: number) => {
                        return (
                          <div key={index}  >
                            
                            <Card sx={{ borderRadius: 0 }}>
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
                                          InputProps={{    disableUnderline: true,   }}
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

                  {/* <div>
                  <Button
                      style={{ float: "left"  ,cursor: "pointer" ,color:'white' ,marginRight:'10px'}}
                      variant="contained"
                      size="small"
                      onClick={handleClickOpen}
                      color="primary"
                    >
         <KeyIcon style={{ fill: "#white",marginRight:'10px' }} />
          Decryption all
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Decryption</DialogTitle>
        <DialogContent>
          <DialogContentText>
          You can see all treatment encrypted data   Plesase Enter  Decryption Key.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Decryption Key"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button 
          style={{ float: "left"  ,cursor: "pointer",backgroundColor:'#b20000' ,color:'white' }}
          onClick={handleCloseDialog}
         
          >Cancel</Button>
          <Button 
          onClick={handleCloseDialog}
          style={{ float: "left"  ,cursor: "pointer",backgroundColor:'#166d52' ,color:'white' }}
          >OK</Button>
        </DialogActions>
      </Dialog>
    </div> */}
{/* 
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
                  </Grid> */}
                  

                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      component={RouterLink}
                      to={Role =='doctor'?"/treatmentdoctortable":"/treatmentpatienttable"}
                      
                    >
                      กลับ
                    </Button>
                  </Grid>

                  {/* <Grid item xs={6}>
                    <Button
                      style={{ float: "right" }}
                      variant="contained"
                      onClick={DecrypListTreatmentByID}
                      color="primary"
                    >
                      Decryption
                    </Button>
                  </Grid> */}

                  <Grid item xs={6}></Grid>
                </Grid>
              </div>
            </div>
          
      </div>
    </>
  );
}
