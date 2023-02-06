import React, { useEffect ,useState} from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import './medrec.css'
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

import { DataGrid, GridToolbar,GridColDef ,GridValueGetterParams } from '@mui/x-data-grid';
import { MedicalRecordInterface2,MedicalRecordInterface } from '../../model/Medicalrec';



const Mapst = (MedicalRecord:MedicalRecordInterface) =>{
  if (MedicalRecord== null) {
      return null;
  }
  let sourceObject: MedicalRecordInterface2 = {
    id: MedicalRecord.ID,
    hospital_number: MedicalRecord.Hospital_Number,
    personal_id : MedicalRecord.Personal_ID ,
	  patient_id: MedicalRecord.Patient_ID,
	  patient_age : MedicalRecord.Patient_Age,
	  patient_gender : MedicalRecord.Patient_gender,
	  patient_dob : MedicalRecord.Patient_dob,
	  patient_address :MedicalRecord.Patient_address,
	  patient_phone : MedicalRecord.Patient_phone

  };
   return sourceObject
}

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
    { field: 'id',
     headerName: 'ID', 
     headerAlign: 'center',
     align:'center',
     width: 200
    }, 
    {
      field: 'firstName',
      headerName: 'First Name',
      width: 220,
      align:'center',
      headerAlign: 'center',
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 230,
      headerAlign: 'center',
      align:'center',
      headerClassName: 'super-app-theme--header',
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      align:'center',
      headerAlign: 'center',
      width: 200,
      editable: true,
    },
    {
      field: 'fullName',
    
      headerAlign: 'center',
      
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      align:'center',
      width: 350,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'tel',
      headerName: 'Tel',
      align:'center',
      headerAlign: 'center',
      sortable: false,
      width: 200,
      editable: true,
    },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35  ,tel:"099-3422033"},
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42,tel:"099-029211" },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 ,tel:"089-3121133"},
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 ,tel:"099-3422083"},
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 12,tel:"087-3422033" },
    { id: 6, lastName: 'Melisandre', firstName: "Aawee", age: 150 ,tel:"077-3422033"},
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 ,tel:"099-3422033"},
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36,tel:"099-3422033" },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65,tel:"099-3422033" },
  ];
  
  
  const classes = useStyles();
  const [medicalracord, setMedicalracord] = useState<Partial<MedicalRecordInterface>[]>([]);

  const [temp, setTemp] = useState<Partial<MedicalRecordInterface2>[]>([]);



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
          // let result: Partial<MedicalRecordInterface2>[] = res.data;
          // result.map((item:Partial<MedicalRecordInterface2>) => {
          // console.log(item)
          //   setTemp([ ...temp, {
          //     id:item.id,
          //     hospital_number:item.hospital_number,
          //     personal_id:item.Personal_ID,
          //     patient_id: item.Patient_ID,
	        //     patient_age : item.Patient_Age,
          //   	patient_gender : item.Patient_gender,
          //     patient_dob : item.Patient_dob,
	        //     patient_phone :item.Patient_phone
          //   }])

          // } )
          
         
  
          
        } else {
          console.log("else");
        }
      });
  };



 

 useEffect(() => {

  getMedicalracord();
  

 }, []);


 

 return (

  // {temp.map((item:Partial<MedicalRecordInterface2>)=>(
  //   {{item.id}}

  // ))
  // }

  <div className="histable">
  <div style={{ height: 830, width: '80%' }}>
 <DataGrid
 rows={rows}
 columns={columns}
 density="comfortable"
 components={{ Toolbar: GridToolbar }}
 pageSize={9}
 rowsPerPageOptions={[5]}
 checkboxSelection
 // disableSelectionOnClick
 experimentalFeatures={{ newEditingApi: true }}
/>
</div>


</div>



 );

}

 

export default HistoryMedicalracord;