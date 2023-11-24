import React, { useState, useEffect} from 'react';
import TopBar from './TopBar';
import { useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Button, Grid, Paper} from "@mui/material";
import InformeColeccion from './InformeColeccion';

function Informes () {

    const [botonClicked, setBotonClicked] = useState(false)
    const navigate = useNavigate()
    const userData = useSelector (state => state.login)
    const [datosBaseDatos, setDatosBaseDatos] = useState([]);
    const isLoggedin = userData.isAudenticated;

    const handleGetItem = () => {
        fetch(`http://localhost:3030/getItems`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if (Object.keys(response.data).length !== 0) {
                    setDatosBaseDatos(response.data)
                }
            })
    };

    useEffect(()=>{
        if (!isLoggedin) { 
                navigate('/')
        }
        handleGetItem()
        console.log(datosBaseDatos)

    }, [isLoggedin, navigate])

    const handleClick= (e) => {
        setBotonClicked((prev) => !prev);
    }

    return<>
    <Grid>
        <TopBar /> {/* Llamada al componente TopBar */}
        <Grid>
            <Paper elevation={1} sx={{padding: 10, textAlign: 'center'}}>
                <Button variant="contained" textAlign='center' onClick={handleClick}>Informe Coleccion</Button>
            </Paper>
            {botonClicked? <InformeColeccion datos={datosBaseDatos}/>:null}
        </Grid>
        </Grid>
    </>
}

export default Informes;