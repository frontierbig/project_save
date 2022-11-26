import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { UserInterface } from "../model/UserUI";
import {MuiPickersUtilsProvider,KeyboardDatePicker,} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
 
function Alert(props: AlertProps) {
 return <MuiAlert elevation={6} variant="filled" {...props} />;
}
 
const useStyles = makeStyles((theme: Theme) =>
 createStyles({
   root: {flexGrow: 1},
   container: {marginTop: theme.spacing(2)},
   paper: {padding: theme.spacing(2),color: theme.palette.text.secondary},
 })
);
 
function Admin() {
 const classes = useStyles();
 const [selectedDate, setSelectedDate] = React.useState<Date | null>(
   new Date()
 );
 const [user, setUser] = React.useState<Partial<UserInterface>>({});
 const [success, setSuccess] = React.useState(false);
 const [error, setError] = React.useState(false);
 
 const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
   if (reason === "clickaway") {
     return;
   }
   setSuccess(false);
   setError(false);
 };
 
 const handleDateChange = (date: Date | null) => {
   setSelectedDate(date);
 };
 
 const handleInputChange = (
   event: React.ChangeEvent<{ id?: string; value: any }>
 ) => {
   const id = event.target.id as keyof typeof Admin;
   const { value } = event.target;
   setUser({ ...user, [id]: value });
 };
 
 function submit() {
   let data = {
     FirstName: user.Name ?? "",
     Email: user.Email ?? "",
    //  Age: typeof user.Age === "string" ? parseInt(user.Age) : 0,
     BirthDay : selectedDate
   };
 
   const apiUrl = "http://localhost:8080/users";
   const requestOptions = {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(data),
   };
 
   fetch(apiUrl, requestOptions)
     .then((response) => response.json())
     .then((res) => {
       if (res.data) {
         setSuccess(true);
       } else {
         setError(true);
       }
     });
 }

return (
    <h1>Hello Admin</h1>
);
}
export default Admin;