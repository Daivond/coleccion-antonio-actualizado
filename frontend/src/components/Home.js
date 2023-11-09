import React from 'react'
import { Grid, Typography } from "@mui/material";
import { useSelector, useDispatch} from 'react-redux';
import { loginActions } from '../store/storelogin';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useEffect } from 'react';

function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector (state => state.login)
    const isLoggedin = userData.isAudenticated;

    // Efecto secundario para redirigir al usuario si no ha iniciado sesión
    useEffect(()=>{
        if (!isLoggedin) { 
                navigate('/')
        }
        }, [isLoggedin, navigate])

    // Función para manejar el cierre de sesión
    console.log('Datos del usuario en el store: ', userData)
    const handleLogout = (e) => {
            dispatch(loginActions.logout());
            navigate('/');
    };

    // Renderizado del componente Home
        return (
            <Grid
                bgcolor="#161616"
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: '100vh',display: 'flex', textAlign: 'center'}}
                alignContent="center">
                    <div>
                    <Typography variant = 'h1' color='primary'>
                        Página home de Antonio David Alonso Ramos
                    </Typography>
                    <Typography variant='h2' color='secondary'> 
                        {userData.userName} Rol: {userData.userRol}
                    </Typography>
                    <Button variant='outlined' color='info' onClick={handleLogout}>
                        Cerrar Sesión
                    </Button>
                    </div>
                </Grid>
            
        );
}

export default Home;