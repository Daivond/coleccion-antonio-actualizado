import React, { useState, useEffect, Component } from 'react'
import { loginActions } from '../store/storelogin';
import { AppBar, Container, Toolbar, Grid, Typography, Button, Tooltip } from "@mui/material";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import Album from '@mui/icons-material/Album';
import PersonIcon from '@mui/icons-material/Person';


function TopBar() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector (state => state.login)
    const isLoggedin = userData.isAudenticated;

    console.log('Estado actual del usuario:', userData);

    // Efecto secundario para redirigir al usuario si no ha iniciado sesión
    useEffect(()=>{
        if (!isLoggedin) { 
                navigate('/')
        }
        handleGetItem()
        }, [isLoggedin, navigate])

        const [tableData, setTableData] = useState([])

    // Función para manejar el cierre de sesión
    console.log('Datos del usuario en el store: ', userData)
    
    const handleLogout = (e) => {
            dispatch(loginActions.logout());
            navigate('/');
    };

    const handleGetItem = async (e) => {

        const response = await fetch(`http://localhost:3030/getItems`)

            .then(response => response.json())
            .then(response => {
                console.log(response)
                if (Object.keys(response.data).length !== 0) {
                    setTableData(response.data)
                }
            })
    };

        return <>
            {/*Fixed hace que la barra se quede siempre msotrandose arriba, static la deja fija y si desplazas no la ves */}
            <AppBar position='fixed'>
                <Container>
                    <Toolbar>
                        <Grid container alignItems='center'>
                            <Grid item xs={1} md={1} lg={1}>
                {/* // Mostramos el rol del usuario al lado de su nombre e icono  */}
                                <Typography color='primary' component='div'>
                                {userData.userRol === 'admin' ? <div readOnly>Admin</div> : <div readOnly>User</div>}
                                </Typography> 
                            </Grid>
                            <Grid item xs={1} md={2} lg={3}>
                {/* // Asignamos un renderizado condicional para mostar un icono u otro dependiendo del rol del usuario */}
                                {userData.userRol === 'admin' ? <Album /> : <PersonIcon />}
                            <Typography sx={{display: 'inline' }} color="primary" component="div">
                                {userData.userName}
                            </Typography>
                            </Grid>
                            <Grid item xs={3} md={1} lg={2}>
                                <Link to='/Home' style={{ color: 'inherit', textDecoration: 'none' }}>
                                    <Typography color='secondary'>Home</Typography>
                                </Link>
                            </Grid>
                {/* Al meter todo el gris siguiente dentro de la condicion, estamos haciendo que solo se muestre ese enlace al admin, pero para el resto
                hacemos que no se vea un campo vacío, sino que los enlaces de Incio y Ayuda se autoAlinean otra vez para que no parezca raro */}
                            {userData.userRol === 'admin' && <Grid item xs={3} md={1} lg={2}>
                                <Link to='/Informes' style={{ color: 'inherit', textDecoration: 'none' }}>
                                    <Typography color='secondary'>Informes</Typography>
                                </Link>
                            </Grid> }
                            <Grid item xs={3} md={1} lg={3}>
                                <Link to='/Manual.pdf' target='_blank' style={{ color: 'inherit', textDecoration: 'none' }}>
                                    <Typography color='secondary'>Ayuda</Typography>
                                </Link>
                            </Grid>
                            <Grid item xs={1} md={1} lg={1}>
                            <Tooltip title="Botón para cerrar la sesión de usuario actual y volver al 'Login'" arrow>
                                <Button size='big' variant='contained' color='secondary' onClick = {handleLogout}>
                                    Salir
                                </Button>
                            </Tooltip>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
        </>;
}

export default TopBar;
