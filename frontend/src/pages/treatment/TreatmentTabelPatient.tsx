import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import "./table.css";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { UserInterface } from "../../model/UserUI";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import {  TreatmentInterface} from "../../model/Treatment";
import Button from "@material-ui/core/Button";
import { getInitialGridRowState } from "@material-ui/data-grid";

function MedracTabel() {

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      width: 200,
      hideable: false,
    },



    {
      field: "patient",

      hideable: false,
      headerName: "Name",
      width: 450,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "doctor",
      headerName: "Docter",
      // hide: true,
      width: 450,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
      editable: false,
    },

    

    {
      field: "view",
      headerName: "view",
      width: 220,
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
              to={"/treatmentshow/" + params.row.id}
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
  const [treatment, setTreatment] = useState<Partial<TreatmentInterface>[]>([]);
  const User: UserInterface = JSON.parse(localStorage.getItem("User") || "");
  const getMedicalracord = async () => {
    const apiUrl = `http://localhost:8080/api/ListTreatmentBypatient/${User.ID}`;
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
          setTreatment(res.data);
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
      <div className="papertable">
        <div className="histable">

         

          <div className="btnicons" >
          <div>
            <p>Treatmemt</p>
          </div>
{/* 
          <div>
          <Button
              style={{ float: "left"  ,cursor: "pointer",backgroundColor:'#23395d' ,padding:'10px',color:'white' ,marginRight:'10px'}}
              component={RouterLink}
              to={"/subtreatment"}
              color="inherit"
              size='medium'
              
            >
              <AddCircleOutlineIcon style={{ fill: "white" ,marginRight:'10px'}}  />
              <p> Add Treatment</p>
            </Button>
            <Button
              style={{ float: "left"  ,cursor: "pointer",backgroundColor:'#23395d' ,padding:'10px',color:'white' }}
              component={RouterLink}
              to={"/treatmentdoctor"}
              color="inherit"
              size='medium'
              
            >
              <AddCircleOutlineIcon style={{ fill: "white" ,marginRight:'10px'}}  />
              <p> Create Treatment</p>
            </Button>

          </div> */}
          </div>


          <div style={{ height: 830, width: "100%", marginBottom: "2rem" }}>
            <DataGrid
              rows={treatment}
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

export default MedracTabel;
