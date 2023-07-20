import gestorApi from "../api/gestorApi"


export const getProducts = async () => {

    const { data } = await gestorApi.get('/products')

    return data;

}