import './doctor.css'
import NavbarPatient from '../../components/NavbarPatient'
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
import { DoctorInterface } from '../../model/Doctor';
import { Card } from '@material-ui/core';



const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    container: {marginTop: theme.spacing(3)},
    paper: {padding: theme.spacing(3)},
    table: {minWidth: 800},
    tableSpace: {marginTop: 20},
    row: {'& > !': {borderBottom: 'unset'},},
  })
);


export default function DoctorPatient() {
    const classes = useStyles();
    const [doctor, setDoctor] = useState<DoctorInterface[]>([]);
  
    const getDoctor = async() => {
      const apiUrl = "http://localhost:8080/api/ListDoctor";
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
            setDoctor(res.data);
          } else {
            console.log("else");
          }
        });
    };

console.log(doctor)
  
    useEffect(() => {
      getDoctor();
    }, []);
  
    return (
   
      <>
      <NavbarPatient/>
      <h1>Titlesadf</h1>
      <h1>Titlesadf</h1>
      <section className='doctors'>
        <div className='container doctor__container'>
          {doctor.map((item: DoctorInterface) => (
            <Card className='trainer'>
            <div className='trainer__img'>
              <img src={item.img} alt={item.Name}></img>
              <h1>{item.Name}</h1>

            </div>
          </Card>
          ))}
          
        </div>

      </section>
      </>
      
      )
    }

    