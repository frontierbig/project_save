import React, { useEffect ,useState} from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from 'moment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import { MedicalRecordInterface } from '../../model/Medicalrec';




const useStyles = makeStyles((theme: Theme) =>

 createStyles({

   container: {marginTop: theme.spacing(2)},

   table: { 
     minWidth: 620,
     border: 1,
    },

   tableSpace: {
     marginTop: 20 , 
     maxHeight: 580 ,
     border: 1 ,
     m: 1,
     borderColor: 'text.primary',
    },

   button: {
      
    margin: theme.spacing(2),
    background: '#dd0000',
    color: '#ffffff',
},

  background: {

    background: '#ffffff',
    maxHeight : 'auto',

  },
  

  tablehead: {

    background: '#DF1B3F',
    color: '#000000',

  },

  headtext: {
    marginTop: 20 ,
    color: '#666666',
    textAlign: 'center',
  },

  textmember: {
    marginTop: 20 ,
    color: '#666666',
    textAlign: 'left',
    fontWeight: 600,
  },

  borrowing: {
    color: '#FFB90F',
    fontWeight: 600,
  },

  finished: {
    color: '#32CD32',
    fontWeight: 600,
  },

  missed: {
    color: '#FF4500',
    fontWeight: 600,
  },



 })

);

 

function HistoryMedicalracord() {

  const classes = useStyles();
  const [medicalracord, setMedicalracord] = useState<MedicalRecordInterface[]>([]);





  const getMedicalracord = async() => {
    const apiUrl = "http://localhost:8080/api/ListMedicalRecord";
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",},
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setMedicalracord(res.data);
        } else {
          console.log("else");
        }
      });
  };



 

 useEffect(() => {

  getMedicalracord();

 }, []);


 

 return (

   <div className={classes.background}>

     <Container className={classes.container} maxWidth="lg">

       <div >

         <div >
            <br/>
           <Typography
             className={classes.headtext}
             component="h1"
             variant="h4"
             color="primary"
             gutterBottom
           >

             ประวัติการยืมอุปกรณ์

           </Typography>

           <Typography
             className={classes.textmember}
             component="h1"
             variant="h6"
             color="primary"
             gutterBottom
           >

             {/* ผู้ใช้ปัจจุบัน : {medicalracord.unshift} */}

           </Typography>


         </div>

         <div>

         </div>

       </div>

       <TableContainer component={Paper} className={classes.tableSpace} >

         <Table className={classes.table} aria-label="a dense table"  size="small">

           <TableHead>

             <TableRow className={classes.tablehead}>

               <TableCell align="center" width="5%" className={classes.tablehead}>

                 ID

               </TableCell>

               <TableCell align="left" width="8%" className={classes.tablehead}>

                 สมาชิก

               </TableCell>

               <TableCell align="right" width="6%" className={classes.tablehead}>

                 อุปกรณ์

               </TableCell>

               <TableCell align="right" width="5%" className={classes.tablehead}>

                 จำนวน

               </TableCell>

               <TableCell align="right" width="10%" className={classes.tablehead}>

                 เบอร์ติดต่อ

               </TableCell>

               <TableCell align="right" width="12%" className={classes.tablehead}>

                 เวลายืม

               </TableCell>

               <TableCell align="right" width="12%" className={classes.tablehead}>

                 เวลาคืน

               </TableCell>

               <TableCell align="right" width="8%" className={classes.tablehead}>

                 สถานะ

               </TableCell>

               <TableCell align="right" width="10%" className={classes.tablehead}>

                 หมายเหตุ

               </TableCell>


             </TableRow>

           </TableHead>

           <TableBody >

             {medicalracord.map((md: MedicalRecordInterface) => (

               <TableRow key={md.Parent_Name}>

                 <TableCell align="center">{md.Parent_Name}</TableCell>

                 <TableCell align="left" size="medium">{md.Parent_Name}</TableCell>

                 <TableCell align="right" size="medium">{md.Parent_Name}</TableCell>

                 <TableCell align="right" size="medium">{md.Parent_Name}</TableCell>

                 <TableCell align="right" size="medium">{md.Parent_Name}</TableCell>

                {/* //  <TableCell align="right">{moment(borrow.Borrowtime).format("HH:mm DD/MM/YYYY")}</TableCell>

                //  <TableCell align="right">
                //  {borrow.BorrowStatus?.Status === 'สำเร็จ' && ( <>

                //    {moment(borrow.Backtime).format("HH:mm DD/MM/YYYY")} </> )} </TableCell>


                //    {borrow.BorrowStatus?.Status === 'กำลังยืม' && ( <> 
                //   <TableCell align="center" size="medium" className={classes.borrowing}>
                //     {borrow.BorrowStatus.Status}</TableCell> </> )}

                //     {borrow.BorrowStatus?.Status === 'สำเร็จ' && ( <> 
                //   <TableCell align="center" size="medium" className={classes.finished}>
                //     {borrow.BorrowStatus.Status}</TableCell> </> )}
                 
                //     {borrow.BorrowStatus?.Status === 'เสียหาย' && ( <> 
                //   <TableCell align="center" size="medium" className={classes.missed}>
                //     {borrow.BorrowStatus.Status}</TableCell> </> )}

                 
                //  <TableCell align="right">{borrow.Comment}</TableCell> */}

               </TableRow>

             ))}

           </TableBody>

         </Table>

       </TableContainer>

     </Container>

   </div>

 );

}

 

export default HistoryMedicalracord;