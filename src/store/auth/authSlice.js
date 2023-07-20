import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        statusSesion: 'checking', // authenticated, no-authenticated, checking
        errorMessage: null,
        user: null,
        
    },
    reducers: {
        login:(state, { payload } ) => {
            state.statusSesion = 'authenticated',

            console.log(payload.name);
            state.user = {
                id: payload.id,
                name: payload.name,
                email: payload.email,
                role: payload.role,
                is_active: payload.is_active,
            }

        },
        logout:(state, { payload } ) => {
            localStorage.clear()
            state.statusSesion = 'no-authenticated'
            state.errorMessage = payload
            state.user = null
        },
        checkigCredentials: (state) => {
            state.statusSesion = 'checking'
        },
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkigCredentials, statusSesion, errorMessage } = authSlice.actions;