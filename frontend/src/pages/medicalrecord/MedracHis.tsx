import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import "./table.css";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import {
  MedicalRecordInterface2,
  MedicalRecordInterface,
} from "../../model/Medicalrec";
import { colors } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { getInitialGridRowState } from "@material-ui/data-grid";

function HistoryMedicalracord() {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      width: 120,
      hideable: false,
    },

    {
      field: "hospital_number",
      headerName: "Hospital Number",
      headerAlign: "center",
      align: "center",
      width: 170,
      hide: true,
      editable: false,
    },

    {
      field: "patient",

      hideable: false,
      headerName: "Name",
      width: 200,
      align: "center",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "personal_id",
      headerName: "Personal ID",
      width: 180,
      align: "center",
      headerAlign: "center",
      editable: false,
      sortable: false,
    },

    {
      field: "patient_phone",
      headerName: "Tel",
      align: "center",
      headerAlign: "center",
      sortable: false,
      width: 170,
      editable: true,
    },
    {
      field: "patient_age",
      headerName: "Age",
      hide: true,
      width: 100,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
      editable: false,
    },

    {
      field: "patient_gender",
      headerName: "Gender",
      width: 80,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
      editable: false,
      hide: true,
    },

    {
      field: "patient_address",
      headerName: "Address",
      width: 220,
      headerAlign: "center",
      sortable: false,
      headerClassName: "super-app-theme--header",
      editable: true,
    },

    {
      field: "parent_name",
      headerName: "Parent Name",
      width: 200,
      headerAlign: "center",
      hide: true,
      align: "center",
      headerClassName: "super-app-theme--header",
      editable: true,
    },

    {
      field: "parent_phone",
      headerName: "Parent Phone",
      width: 170,
      align: "center",
      headerAlign: "center",
      hide: true,
      headerClassName: "super-app-theme--header",
      editable: true,
      sortable: false,
    },

    {
      field: "parent_address",
      headerName: "Parent Address",
      width: 220,
      sortable: false,
      headerAlign: "center",
      hide: true,
      headerClassName: "super-app-theme--header",
      editable: true,
    },

    {
      field: "medical_history",

      headerName: "Medical History",
      width: 180,
      headerAlign: "center",
      align: "center",
      hide: true,
      headerClassName: "super-app-theme--header",
      editable: true,
    },

    {
      field: "current_medications",
      headerName: "Current Medications",
      width: 180,
      headerAlign: "center",

      align: "center",
      hide: true,

      headerClassName: "super-app-theme--header",
    },

    {
      field: "viewe",
      headerName: "Viewe",
      width: 80,
      headerAlign: "center",
      align: "center",

      headerClassName: "super-app-theme--header",

      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <Button
              style={{ float: "left" }}
              component={RouterLink}
              to={"/medrecshow/" + params.row.id}
              color="primary"
            >
              <VisibilityOutlinedIcon style={{ fill: "#0072ea" }} />
            </Button>
          </div>
        );
      },
    },
  ];

  // const [medicalracord, setMedicalracord] = useState<Partial<MedicalRecordInterface>[]>([]);

  const [temp, setTemp] = useState<Partial<MedicalRecordInterface2>[]>([]);

  const getMedicalracord = async () => {
    const apiUrl = "http://localhost:8080/api/ListMedicalRecord";
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
          setTemp(res.data);
          // setMedicalracord(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getMedicalracord();
  }, []);

  return (
    <>
      <div className="paper">
        <div className="histable">

         

          <div className="btnicons" >

          <div>
            <p>Medicalrecord</p>
          </div>
            <Button
              style={{ float: "left"  ,cursor: "pointer",backgroundColor:'#23395d' ,padding:'10px',color:'white' }}
              component={RouterLink}
              to={"/recordpatient"}
              color="inherit"
              size='medium'
              
            >
              <AddCircleOutlineIcon style={{ fill: "white" ,marginRight:'10px'}}  />
              <p> Add medicalracord</p>
              
            </Button>
          </div>
          <div style={{ height: 830, width: "100%", marginBottom: "2rem" }}>
            <DataGrid
              rows={temp}
              columns={columns}
              density="comfortable"
              components={{ Toolbar: GridToolbar }}
              pageSize={9}
              rowsPerPageOptions={[5]}
              experimentalFeatures={{ newEditingApi: true }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryMedicalracord;
