import React from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { loginActions } from '../store/storelogin';

function Home() {
    const userData = useSelector (state => state.login);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(loginActions());
    };

    return (
        <div>
            <h1> Bienvenido, {userData.userName}</h1>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
}

export default Home;