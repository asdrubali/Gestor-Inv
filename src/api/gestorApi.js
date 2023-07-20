import axios from 'axios';


const VITE_API_URL = 'https://snowy-dawn-7436.fly.dev/api'


console.log(VITE_API_URL);

const gestorApi = axios.create({
    baseURL: VITE_API_URL
});

gestorApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'token': localStorage.getItem('token')
    }

    return config;
})


export default gestorApi;