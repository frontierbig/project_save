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

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { MedicalRecordInterface2 } from '../../model/Medicalrec';




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
    marginTop: 60 ,
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

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    // { field: 'firstName', headerName: 'First name', width: 130 },
    // { field: 'lastName', headerName: 'Last name', width: 130 },
    // {
    //   field: 'age',
    //   headerName: 'Age',
    //   type: 'number',
    //   width: 90,
    // },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];
  
  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];

  const classes = useStyles();
  const [medicalracord, setMedicalracord] = useState<Partial<MedicalRecordInterface2>[]>([]);



  const print = () =>{
    console.log(medicalracord)
  }


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

            <button
            onClick={print}
            >asdasd</button>

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

           medicalracord


         </div>

         <div>

         </div>

       </div>
      
       {/* <TableContainer component={Paper} className={classes.tableSpace} > */}
       <div style={{ height: 580, width: '100%' }}>
      <DataGrid
        rows={medicalracord}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
    {/* </TableContainer> */}

          {/* <Table className={classes.table} aria-label="a dense table"  size="small"> */}

          

       
     </Container>

   </div>

 );

}

 

export default HistoryMedicalracord;