//Antonio David Alonso Ramos


import React, { useState } from 'react'
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { Container, Typography, Grid, Paper, TextField, Button, Avatar, Tooltip} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginActions } from '../store/storelogin';

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user] = useState('');
    const [password] = useState('');
    const [error, setError] = useState('');
    const [login, setLogin] = useState({ user: '', pass: '' });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user|| !password) {
            setError("Por favor completa los campos que se piden");
            
        }

        // Llamamos al backend
        fetch(`http://localhost:3030/login?user=${login.user}&password=${login.pass}`)
        .then(response => response.json())
        .then(response => {
            if (response) {
                console.log(response.data.nombre)
                console.log(response.data.rol)
                if (response && response.data.nombre !== undefined) {
                    console.log('Entrando correctamente')
                    dispatch(loginActions.login ({
                        name: response.data.nombre,
                        rol: response.data.rol
                    }));
                    navigate('/home');
                } else {
                    setError("Usuario o contraseña incorrectos");
                }
            }
        }) .catch(() => {
            setError("Error al conectar al servidor");
        });
    };

    return (
    <Grid Container
    bgcolor="#161616"
    justifyContent="center"
    alignItems="center"
    sx={{ minHeight: '100vh',display: 'flex', textAlign: 'center'}}>
        <Container maxWidth = "sm">
        <Paper elevation={3} sx={{padding: 5, textAlign: 'center', margin: 'auto'}}>
            <Avatar sx={{m : 'auto', bgcolor: 'primary.main'}}>
                <CurrencyBitcoinIcon />
            </Avatar>
            <Typography variant="h4">Iniciar Sesión</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        fullWidth
                        placeholder='Usuario'
                        variant='outlined'
                        color='primary'
                        onChange={(event) => { setLogin({ ...login, user: event.target.value }) }}
                        required
                        />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            type='password'
                            placeholder='Contraseña'
                            variant='outlined'
                            color='secondary'
                            onChange={(event) => { setLogin({ ...login, pass: event.target.value }) }}
                            required
                            />
                        </Grid>
                    </Grid>
                    {error && <Typography color="error">{error}</Typography>}
                    <br></br>
                    <Tooltip title="Botón que permite comprobar si el usuario y contraseña son correctos e iniciar sesión" arrow>
                        <Button type='submit' variant='contained' color='primary' fullWidth>
                            Iniciar Sesión
                        </Button>
                    </Tooltip>
                </form>
            </Paper>
        </Container>
    </Grid>
    );
}

export default Login