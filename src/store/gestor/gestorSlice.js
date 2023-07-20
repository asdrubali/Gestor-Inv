import { createSlice } from '@reduxjs/toolkit';


const initialProduct = { 
  id: '', 
  name : '', 
  price: '', 
  fecha_ingreso: '' ,
  fecha_vencimiento: '' ,
  category: '', 
  stock:	'', 
  status:	'' , // Activo, Inactivos, No disponibles, Descontinuados, Todos, Vencidos, Por vencer, Todo
  img: ''
}





export const gestorSlice = createSlice({
    name: 'gestor',
    initialState: {
        activeModal: false,
        products: [],
        activeProduct: initialProduct,
        menuItems: [],
        gestorStatus: 'checking' // checking, ok
    },
    reducers: {
        openModal: (state,) => {
            state.activeModal = true
        },

        closeModal: (state,) => {
            state.activeModal = false
            state.activeProduct = initialProduct;
        },

        saveProduct: (state, { payload } ) => {
            state.products.push({id: Math.random(), ...rest });
            state.activeModal = false;
        },

        deleteProduct: (state, { payload } ) => {
            state.products = state.products.filter( product => product.id !== payload.id );
        },

        editProduct: (state, { payload } ) => {
          state.activeModal = true;
          state.activeProduct = {
            id: payload.id,
            name: payload.name,
            price: payload.price,
            fecha_ingreso: payload.fecha_ingreso,
            fecha_vencimiento: payload.fecha_vencimiento,
            category: payload.category.name,
            stock: payload.stock,
            status: payload.status,
          }
        },
        
        uploadProduct: (state, { payload }) => {
          state.activeModal = false;
          state.activeProduct = initialProduct;
        },

        setMenuitems: ( state, { payload } ) => {
          state.menuItems = [...payload]
        },

        SetDataGestor: ( state, {payload} ) =>{
          state.products = [...payload]
        },
        checkingData: (state, {payload}) => {
          state.gestorStatus= payload
        }

    }
});


// Action creators are generated for each case reducer function
export const { 
  openModal, 
  closeModal, 
  saveProduct, 
  deleteProduct, 
  editProduct, 
  uploadProduct, 
  setMenuitems, 
  SetDataGestor, 
  checkingData } = gestorSlice.actions;