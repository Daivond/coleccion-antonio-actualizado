import React, { useState, useEffect } from 'react'
import { useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Button, Grid, Paper, Box, TextField, Tooltip} from "@mui/material";
import TopBar from './TopBar';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function Home() {
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

    const [item, setItem] = useState({ nombre: '', marca: '', tipo: '', precio: '' })

    const [tableData, setTableData] = useState([])

    const [isFormValid, setIsFormValid] = useState(true);


    const handleSaveItem = (e) => {
        e.preventDefault();
        if (item.nombre && item.tipo && item.marca && item.precio) {
        fetch(`http://localhost:3030/addItem?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio}`)

            .then(response => response.json())
            .then(response => {
                if (response > 0) {
                    handleGetItem()
                    alert('Datos guardados con éxito')
    // Aqui hacemos que cuando se le de al botón para introducir los datos, los campos de texto vuelvan a estar vacio 
                    setItem({ nombre: '', marca: '', tipo: '', precio: '' });
                } else {
                    alert('Datos no guardados')
                }
            })
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
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

        {/* Lo primero que hacemos es llamar al componente Topbar para que nos muestre la barra superior */}
        <div>
            <TopBar /> {/* Llamada al componente TopBar */}
        </div>

            
            <Grid Container
                bgcolor="#161616"
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: '87vh',display: 'flex', textAlign: 'center'}}
                alignContent="center">
                    <Paper elevation={5} sx={{padding: 5, textAlign: 'center', margin: 'auto', border : '20px'}}>
                        <Box component='form' autoComplete='off' onSubmit={handleSaveItem} >
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={6}>
                                    <TextField
                                    label='Nombre'
                                    required
                                    value={item.nombre}
                                    onChange={(event) => setItem({...item, nombre: event.target.value })}
                                    error={!isFormValid && !item.nombre}
                                    helperText={!isFormValid && !item.nombre ? 'Este campo es obligatorio' : ''}
                                    />
                                </Grid>

                                <Grid item xs={6} md={6}>
                                    <TextField
                                        label='Tipo'
                                        required
                                        value={item.tipo}
                                        onChange={(event) => setItem({ ...item, tipo: event.target.value })}
                                        error={!isFormValid && !item.tipo}
                                        helperText={!isFormValid && !item.tipo ? 'Este campo es obligatorio' : ''}
                                    />
                                </Grid>

                                <Grid item xs={6} md={6}>
                                    <TextField
                                        label='Marca'
                                        required
                                        value={item.marca}
                                        onChange={(event) => setItem({ ...item, marca: event.target.value })}
                                        error={!isFormValid && !item.marca}
                                        helperText={!isFormValid && !item.marca ? 'Este campo es obligatorio' : ''}
                                    />
                                </Grid>

                                <Grid item xs={6} md={6}>
                                    <TextField
                                        label='Precio'
                                        required
                                        value={item.precio}
                                        onChange={(event) => setItem({ ...item, precio: event.target.value })}
                                        error={!isFormValid && !item.precio}
                                        helperText={!isFormValid && !item.precio ? 'Este campo es obligatorio' : ''}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} sx={{textAlign: 'center' }}>
                                    <Tooltip title="Botón para insertar datos de productos en la tabla de 'colección' en la BD" arrow>
                                        <Button size='large' variant='outlined' onClick={handleSaveItem}>
                                            Insertar Datos
                                        </Button>
                                    </Tooltip>
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
    {/* Metemos dentro del condional el boton para eliminar datos de la base de datos, asi solo el admin puede hacerlo */}
                                <Tooltip title="Botón en forma de papelera para borrar los datos deseados en la tabla 'colección' en la BD" arrow>
                                    { userData.userRol === 'admin' && <Button onClick={() => handleDeleteItem(row.id)}>
                                        <DeleteForeverIcon />
                                    </Button> }
                                </Tooltip>
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