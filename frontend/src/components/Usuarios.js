import React, { useState, useEffect} from 'react';
import TopBar from './TopBar';
import { useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Button, Grid, Paper, Box, TextField} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function Usuarios () {

    const navigate = useNavigate()
    const userData = useSelector (state => state.login)
    const isLoggedin = userData.isAudenticated;

    console.log('Estado actual del usuario:', userData);

    // Efecto secundario para redirigir al usuario si no ha iniciado sesión
    useEffect(()=>{
        if (!isLoggedin) { 
                navigate('/')
        }
        handleGetUser()
        }, [isLoggedin, navigate])

    const [user, setUser] = useState({ nombre: '', login: '', password: '', rol: '' })

    const [tableData, setTableData] = useState([])

    const [isFormValid, setIsFormValid] = useState(true);


    const handleSaveUser = (e) => {
        e.preventDefault();
        if (user.nombre && user.login && user.password && user.rol) {
        fetch(`http://localhost:3030/addUser?nombre=${user.nombre}&login=${user.login}&password=${user.password}&rol=${user.rol}`)

            .then(response => response.json())
            .then(response => {
                if (response > 0) {
                    handleGetUser()
                    alert('Datos guardados con éxito')
    // Aqui hacemos que cuando se le de al botón para introducir los datos, los campos de texto vuelvan a estar vacio 
                    setUser({ nombre: '', login: '', password: '', rol: '' });
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

        fetch(`http://localhost:3030/deleteUser?id=${id}`)

            .then(response => response.json())
            .then(response => {
                if (response < 0) {
                    alert('Datos no eliminados')
                } else {
                    handleGetUser()
                    alert('Datos eliminados')
                }
            })
    };

    const handleGetUser = async (e) => {

        const response = await fetch(`http://localhost:3030/getUsers`)

            .then(response => response.json())
            .then(response => {
                console.log(response)
                if (Object.keys(response.data).length !== 0) {
                    setTableData(response.data)
                }
            })
    };

    return<>
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
                        <Box component='form' autoComplete='off' onSubmit={handleSaveUser} >
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={6}>
                                    <TextField
                                    label='Nombre'
                                    required
                                    value={user.nombre}
                                    onChange={(event) => setUser({...user, nombre: event.target.value })}
                                    error={!isFormValid && !user.nombre}
                                    helperText={!isFormValid && !user.nombre ? 'Este campo es obligatorio' : ''}
                                    />
                                </Grid>

                                <Grid item xs={6} md={6}>
                                    <TextField
                                        label='Login'
                                        required
                                        value={user.login}
                                        onChange={(event) => setUser({ ...user, login: event.target.value })}
                                        error={!isFormValid && !user.login}
                                        helperText={!isFormValid && !user.login ? 'Este campo es obligatorio' : ''}
                                    />
                                </Grid>

                                <Grid item xs={6} md={6}>
                                    <TextField
                                        label='Password'
                                        required
                                        value={user.password}
                                        onChange={(event) => setUser({ ...user, password: event.target.value })}
                                        error={!isFormValid && !user.password}
                                        helperText={!isFormValid && !user.password ? 'Este campo es obligatorio' : ''}
                                    />
                                </Grid>

                                <Grid item xs={6} md={6}>
                                    <TextField
                                        label='Rol'
                                        required
                                        value={user.rol}
                                        onChange={(event) => setUser({ ...user, rol: event.target.value })}
                                        error={!isFormValid && !user.rol}
                                        helperText={!isFormValid && !user.rol ? 'Este campo es obligatorio' : ''}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} sx={{textAlign: 'center' }}>
                                    <Button size='large' variant='outlined' onClick={handleSaveUser}>
                                        Insertar Usuario
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
    {/* Metemos dentro del condional el boton para eliminar datos de la base de datos, asi solo el admin puede hacerlo */}
                                { userData.userRol === 'admin' && <Button onClick={() => handleDeleteItem(row.id)}>
                                    <DeleteForeverIcon />
                                </Button> }
                            </TableCell>
                            <TableCell>{row.nombre}</TableCell>
                            <TableCell>{row.login}</TableCell>
                            <TableCell>{row.password}</TableCell>
                            <TableCell>{row.rol}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
            </Grid>
    </>
}

export default Usuarios