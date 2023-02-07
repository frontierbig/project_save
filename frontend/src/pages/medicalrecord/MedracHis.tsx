import React, { useEffect ,useState} from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import './medrec.css'


import { DataGrid, GridToolbar,GridColDef ,GridValueGetterParams } from '@mui/x-data-grid';
import { MedicalRecordInterface2,MedicalRecordInterface } from '../../model/Medicalrec';



// const Mapst = (MedicalRecord:MedicalRecordInterface) =>{
//   if (MedicalRecord== null) {
//       return null;
//   }
//   let sourceObject: MedicalRecordInterface2 = {
//     id: MedicalRecord.ID,
//     hospital_number: MedicalRecord.Hospital_Number,
//     personal_id : MedicalRecord.Personal_ID ,
// 	  patient_id: MedicalRecord.Patient_ID,
// 	  patient_age : MedicalRecord.Patient_Age,
// 	  patient_gender : MedicalRecord.Patient_gender,
// 	  patient_dob : MedicalRecord.Patient_dob,
// 	  patient_address :MedicalRecord.Patient_address,
// 	  patient_phone : MedicalRecord.Patient_phone

//   };
//    return sourceObject
// }


 

function HistoryMedicalracord() {

  const columns: GridColDef[] = [
    { field: 'id',
     headerName: 'ID', 
     headerAlign: 'center',
     align:'center',
     width: 200
    }, 
    {
      field: 'personal_id',
      headerName: 'Personal ID',
      width: 220,
      align:'center',
      headerAlign: 'center',
      editable: true,
    },
    {
      field: 'patient_age',
      headerName: 'AGE',
      width: 230,
      headerAlign: 'center',
      align:'center',
      headerClassName: 'super-app-theme--header',
      editable: true,
    },
  
    // {
    //   field: 'fullName',
    
    //   headerAlign: 'center',
      
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   align:'center',
    //   width: 350,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
    {
      field: 'patient_phone',
      headerName: 'Tel',
      align:'center',
      headerAlign: 'center',
      sortable: false,
      width: 200,
      editable: true,
    },
  ];

  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35  ,tel:"099-3422033"},
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42,tel:"099-029211" },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 ,tel:"089-3121133"},
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 ,tel:"099-3422083"},
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 12,tel:"087-3422033" },
  //   { id: 6, lastName: 'Melisandre', firstName: "Aawee", age: 150 ,tel:"077-3422033"},
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 ,tel:"099-3422033"},
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36,tel:"099-3422033" },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65,tel:"099-3422033" },
  // ];
  
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

          setTemp(res.data);
          setMedicalracord(res.data);
        
          // let result: Partial<MedicalRecordInterface>[] = res.data;
          // result.map((item:Partial<MedicalRecordInterface>) => {
          // console.log(item)
          //   setTemp([ ...temp, {
          //     id:item.ID,
          //     hospital_number:item.Hospital_Number,
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

  <div className="histable">
  <div style={{ height: 830, width: '80%' }}>
 <DataGrid
 rows={temp}
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