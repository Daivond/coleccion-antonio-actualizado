import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isAudenticated: false,
    userName: '',
    userRol: ''
}

const authSlice = createSlice ({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login: (state, action) => {
            const userData = action.payload
            state.isAudenticated = true
            state.userName = userData.name
            state.userRol = userData.rol
        },
        logout: (state) => {
            state.isAudenticated = false
            state.userName = ''
            state.userRol = ''
        }
    }
})

export const loginActions = authSlice.actions
export default authSlice.reducer