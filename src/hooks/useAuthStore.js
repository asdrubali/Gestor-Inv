import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { checkigCredentials, login, logout } from "../store/auth";
import { useGestorStore } from "./useGestorStore";
import { getProducts } from "../helpers";
import gestorApi from "../api/gestorApi";


export const useAuthStore = () => {
  
    const dispatch = useDispatch();

    const { StartDataGestor } = useGestorStore()
  
    const { statusSesion, errorMessage, user} = useSelector( state => state.auth );
    const { SetDataGestor, checkingData } = useSelector( state => state.gestor );
    
    const startLogin = async ({ email, password }) => {
        
        dispatch( checkigCredentials() )
        
        try {
            const { data } = await gestorApi.post('/auth/login', { email, password } )
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime() );
            setTimeout(async() => {
                dispatch( login({...data.user}) );
                dispatch(SetDataGestor( ...await getProducts()?.data.products ))
            }, 1000);
            
            getProducts().then(({data}) => StartDataGestor({...data.products}))
            dispatch( checkingData('ok') )

        } catch (err) {
            console.log(err.response.data);
            setTimeout(() => {
                dispatch( logout('Credenciales Incorrectas') );
                Swal.fire({
                    icon: 'error',
                    title: `${ Array.isArray(err.response.data.errors) ? err.response.data.errors.map( error => error.msg ) : err.response.data.msg  }`,
                    width: '20%',
                    customClass: {
                      container: 'custom-swal-container',
                      title: 'custom-swal-title',
                    },
                  });
            }, 1000);
        }

    }

    const checkAuthToken = async() => {

        dispatch( checkigCredentials() )

        const token = localStorage.getItem('token');

        if ( !token ) return dispatch( logout() );

        try {
            const { data } = await gestorApi.get('auth/reval');
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            
            
            setTimeout(() => {
                dispatch( login({...data.user}) );
            }, 1000)

            getProducts().then(({data}) => StartDataGestor({...data.products}))
            dispatch( checkingData('ok') )

        } catch (error) {
            console.log(error);
            localStorage.clear();
            dispatch( logout() );
        }
    }

    const startLogout = () => {
        dispatch( logout() );
        dispatch(StartDataGestor([]))
    }

    return {

        //Propiedades
        statusSesion,
        errorMessage,
        user,

        //Metodos
        startLogin,
        startLogout,
        checkAuthToken
  }
}
