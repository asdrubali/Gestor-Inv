import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { downloadData } from "../helpers";
import gestorApi from "../api/gestorApi";

import { SetDataGestor, checkingData, closeModal, editProduct, openModal, setMenuitems, uploadProduct } from "../store/gestor";

export const useGestorStore = () => {

  const dispatch = useDispatch()

    const { 
      activeModal,
      products,
      activeProduct,
      menuItems,
      gestorStatus
     } = useSelector( state => state.gestor );

    const startOpenModal = () => {
      dispatch( openModal() );
    }

    const startCloseModal = () => {
      dispatch( closeModal() );
    }

    const startSavingProduct = async ( _product ) => {
      
      try {

        if( !_product.id ){        
          (!_product.status) ? _product.status = 'Activo' : _product.status
          const { id, img, ...data } = _product
          data.name = data.name.toLowerCase();
          data.status = data.status;
          await gestorApi.post('/products', data)
          StartDataGestor()

        }else{
          console.log(_product);
          await gestorApi.put(`/products/${_product.id}`, _product)
          dispatch( uploadProduct())
          StartDataGestor()

        }
        


        if( true ){
          Swal.fire( 'Guardado exitoso', '', 'success' )
        }else{
          throw new Error('ocurrio un error')
        }
      } catch (error) {
        console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'No se pudo guardar el producto',
            text: error.message,
          })
      }

    }

    const startDownloadData = () => {
      downloadData( products )
    }

    const startDeleteData = async ( product ) => {
      console.log(product);
      await gestorApi.delete( `/products/${product.id}`)
      StartDataGestor()
    }

    const startEditProduct = async ( product ) => {
      console.log(product);
      dispatch( editProduct( product ) )
    }

    const startsetMenuItems = ( items ) => {
      dispatch( setMenuitems( items ) )
    }

    const StartDataGestor = async () => {

      dispatch(checkingData('checking'))
      const { data } = await gestorApi.get('/products')
      console.log(data.data.products);
      dispatch(SetDataGestor( data.data.products ))
      dispatch(checkingData('ok'))

    }

    const startCheckingData = (status) =>{
      dispatch(checkingData(status))
    }
  return {

      // Propiedades
        activeModal,
        products,
        activeProduct,
        menuItems,
        gestorStatus,

      // Metodos
      startOpenModal,
      startCloseModal,
      startSavingProduct,
      startDownloadData,
      startDeleteData,
      startEditProduct,
      startsetMenuItems,
      StartDataGestor,
      startCheckingData
  }
}
