import React, {  useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Container from '@material-ui/core/Container';
import { format } from 'date-fns'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { MedicalRecordInterface } from '../../model/Medicalrec';



const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    container: {marginTop: theme.spacing(3)},
    paper: {padding: theme.spacing(3)},
    table: {minWidth: 800},
    tableSpace: {marginTop: 20},
    row: {'& > !': {borderBottom: 'unset'},},
  })
);


export default function HistoryMedicalracord() {
    const classes = useStyles();
    const [Medicalracord, setMedicalracord] = useState<MedicalRecordInterface[]>([]);
  
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
      <div>
          
      <Container className={classes.container} maxWidth="lg">
  
        <div >
          <div >
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ผลการบันทึก
            </Typography>
          </div>
          <div>
            <Button
              component={RouterLink}
              to="/recordpatient"
              variant="contained"
              color="primary"

            >
              สร้างข้อมูล
            </Button>
          </div>
        </div>

        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="5%">
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="10%">
                  Name
                </TableCell>
                <TableCell align="center" width="10%">
                  Personal ID
                </TableCell>
                <TableCell align="center" width="12%">
                  Address
                </TableCell>
                <TableCell align="center" width="12%">
                  Phon
                </TableCell>
               
                 
              </TableRow>
            </TableHead>
            <TableBody>
              {Medicalracord.map((item: MedicalRecordInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.Parent_Name}</TableCell>
                  <TableCell align="center">{item.Personal_ID}</TableCell>
                  <TableCell align="center">{item.Parent_address}</TableCell>
                  <TableCell align="center">{item.Parent_phone}</TableCell>
                  {/* <TableCell align="center">{item.Parent_Name}</TableCell> */}
                 

                  <Button
                    style={{ float: "left" }}
                    component={RouterLink}
                    to={"/medrecshow/" + item.ID.toString()}
                    // variant="contained"
                    color="primary"
                  >
                    <VisibilityOutlinedIcon />
                  </Button>


                </TableRow>
              ))
              }
            </TableBody>
          </Table>
        </TableContainer>
     
      </Container>
    </div>
      )
    }