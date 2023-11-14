import React from 'react'
import { Typography } from "@mui/material";
import { useSelector, useDispatch} from 'react-redux';
import { loginActions } from '../store/storelogin';
import { useNavigate } from "react-router-dom";
import { Button, AppBar, Container,Toolbar, Grid, Link, Paper, Box, TextField} from "@mui/material";
import Album from '@mui/icons-material/Album'
import { useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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
        handleGetItem()
        }, [isLoggedin, navigate])

    // Función para manejar el cierre de sesión
    console.log('Datos del usuario en el store: ', userData)
    const handleLogout = (e) => {
            dispatch(loginActions.logout());
            navigate('/');
    };

    const [item, setItem] = useState({ nombre: '', marca: '', tipo: '', precio: '' })

    const [tableData, setTableData] = useState([])


    const handleSaveItem = (e) => {

        fetch(`http://localhost:3030/addItem?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio}`)

            .then(response => response.json())
            .then(response => {
                if (response > 0) {
                    handleGetItem()
                    alert('Datos guardados con éxito')
                } else {
                    alert('Datos no guardados')
                }
            })
    };

    const handleDeleteItem=(id) => {

        fetch(`http://localhost:3030/deleteItem?id=${id}`)

            .then(response => response.json())
            .then(response => {
                if (response < 0) {
                    alert('Datos no eliminados')
                } else {
                    handleGetItem()
                    alert('Datos eliminados')
                }
            })
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

    // Renderizado del componente Home
        return <>
            <AppBar position='static'>
                <Container>
                    <Toolbar>
                        <Grid container>
                            <Grid item xs={1} md={2} lg={3}>
                            <Album />
                            <Typography sx={{display: 'inline' }}>
                                {userData.userName}
                            </Typography>
                            </Grid>
                            <Grid item xs={3} md={1} lg={2}>
                                <Link to='/home'>Inicio</Link>
                            </Grid>
                            <Grid item xs={3} md={1} lg={2}>
                                <Link to=''>Informe</Link>
                            </Grid>
                            <Grid item xs={3} md={1} lg={3}>
                                <Link to=''>Ayuda</Link>
                            </Grid>
                            <Grid item xs={1} md={1} lg={1}>
                                <Button size='large' variant='outlined' color='primary' onClick = {handleLogout}>
                                    Cerrar Sesión
                                </Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>

            <Grid Container
                bgcolor="#161616"
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: '87vh',display: 'flex', textAlign: 'center'}}
                alignContent="center">
                        <Paper elevation={5} sx={{padding: 5, textAlign: 'center', margin: 'auto'}}>
                            <Box component='form' autoComplete='off' onSubmit={handleSaveItem} >
                                <Grid container spacing={2}>
                                    <Grid item xs={3} md={3}>
                                        <TextField
                                        label='Nombre'
                                        required
                                        value={item.nombre}
                                        onChange={(event) => setItem({...item, nombre: event.target.value })}>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={3} md={3}>
                                        <TextField
                                            label='Marca'
                                            value={item.marca}
                                            onChange={(event) => setItem({ ...item, marca: event.target.value })}>
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={3} md={3}>
                                        <TextField
                                            label='Tipo'
                                            value={item.tipo}
                                            onChange={(event) => setItem({ ...item, tipo: event.target.value })}>
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={3} md={3}>
                                        <TextField
                                            label='Precio'
                                            value={item.precio}
                                            onChange={(event) => setItem({ ...item, precio: event.target.value })}>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={5} md={5} />
                                    <Grid item xs={3} md={3}>
                                        <Button size='large' variant='outlined' onClick={handleSaveItem}>
                                            Insertar Datos
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
            </Grid>

            <Grid Container
                bgcolor="#161616"
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: '1vh',display: 'flex', textAlign: 'center'}}
                alignContent="center">
            <TableContainer>
            <Table aria-label='Base de Datos'>
                <TableHead>
                    <TableRow>
                        <TableCell ></TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Marca</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Precio</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>
                                <Button onClick={() => handleDeleteItem(row.id)}>
                                    <DeleteForeverIcon />
                                </Button>
                            </TableCell>
                            <TableCell>{row.nombre}</TableCell>
                            <TableCell>{row.marca}</TableCell>
                            <TableCell>{row.tipo}</TableCell>
                            <TableCell>{row.precio}</TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </TableContainer>
        </Grid>
        </>;
}

export default Home;