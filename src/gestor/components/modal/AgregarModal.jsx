import { DoDisturb, Save } from '@mui/icons-material';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { DatePicker } from '@mui/x-date-pickers';
import { add } from 'date-fns';
import { useForm, useGestorStore } from '../../../hooks';






// Estilos personalizados para el modal
const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    width: '300px',
    margin: 'auto',
    marginTop: '100px',
    padding: '20px',
  },
};

const menuStatus = ['Activo', 'Inactivo', 'No Disponible', 'Descontinuado', 'Vencido', 'Por Vencer', 'Todos']
const menuCategory = ['Tecnologia', 'otros...']

export const AgregarModal = () => {

    
    const { activeModal, activeProduct, startCloseModal, startSavingProduct } = useGestorStore();
    const { formState, onInputChange, onResetForm } = useForm( activeProduct )

    const [fechaIngr, setFechaIngr] = useState( new Date())
    const [fechaVen, setFechaVen] = useState( add(new Date(), { days: 8 }))


  const onSubmitForm = (event) => {
    event.preventDefault();

    startSavingProduct({
        ...formState, 
        fecha_ingreso: fechaIngr, 
        fecha_vencimiento: fechaVen, 
    });
    onResetForm()
    startCloseModal()
  };


  const onCancel = () =>{
    onResetForm()
    startCloseModal()
  }



  return (
      <Modal
        className='modal'
        overlayClassName='modal-fondo'
        isOpen={ activeModal }
        style={modalStyles}
        ariaHideApp={false} // Importante para evitar warnings de accesibilidad
      >
        <Typography variant='h2' fontSize='1.5rem' mb='3%'>Agregar Producto</Typography>
        <form onSubmit={onSubmitForm}>
            <Grid container direction="row" justifyContent="start" alignItems="center" spacing={2}>
                
                <Grid item flexBasis='90%'>
                    <Typography variant='body1' >Nombre:</Typography>
                    <TextField
                        name='name'
                        value={formState.name}
                        fullWidth
                        margin="none"
                        required
                        size="small"
                        onChange={ onInputChange }
                    />
                </Grid>

                <Grid item flexBasis='33%' >
                    <Typography variant='body1' >Ingreso:</Typography>
                    <DatePicker className='inputDate' onChange={ val => setFechaIngr(val)  } minDate={ new Date() } defaultValue={ activeProduct.fecha_ingreso ? new Date(activeProduct.fecha_ingreso) : fechaIngr }  />
                </Grid>
                
                <Grid item flexBasis='33%' >
                    <Typography variant='body1' >Vencimiento:</Typography>
                    <DatePicker className='inputDate' onChange={ val => setFechaVen(val) } minDate={ add(new Date(), { days: 8 }) } value={ activeProduct.fecha_vencimiento ? new Date(activeProduct.fecha_vencimiento) : fechaVen } />
                </Grid>

                <Grid item flexBasis='25%' >
                    <Typography variant='body1' >Precio:</Typography>
                    <TextField
                        name='price'
                        
                        value={formState.price}
                        fullWidth
                        margin="none"
                        required
                        size="small"
                        onChange={ onInputChange }
                    />
                </Grid>

                <Grid item flexBasis='30%' >
                    <FormControl 
                        fullWidth 
                        margin="none" 
                        required 
                        size="small"
                        >
                        <Typography variant='body1' >Categoria:</Typography>
                        <Select
                            name='category'
                            value={formState.category}
                            onChange={ onInputChange }
                            displayEmpty
                            renderValue={(selected) => {
                                if (selected === '') {
                                  return <em>Seleccionar</em>;
                                }
                                return selected;
                              }}  
                        >                         
                        {
                            menuCategory.map( category => (
                                <MenuItem value={category.toLocaleLowerCase()}>{category}</MenuItem>
                            ))
                        } 
                        
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item flexBasis='30%' >
                    <FormControl 
                        fullWidth 
                        margin="none" 
                        required 
                        size="small"
                        >
                        <Typography variant='body1' >Estado:</Typography>
                        <Select
                            name='status'
                            value={formState.status ? formState.status : 'Activo' }
                            onChange={ onInputChange }
                        >
                            {
                                menuStatus.map( value => (
                                    <MenuItem value={value}
                                        sx={{ fontSize: '.65rem' }}
                                    >{value}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item flexBasis='20%' >
                    <Typography variant='body1' >Stock:</Typography>
                    <TextField
                        name='stock'
                        value={formState.stock}
                        fullWidth
                        margin="none"
                        required
                        size="small"
                        onChange={ onInputChange }
                    />
                </Grid>

                <Grid item flexBasis='30%' >
                    <Typography variant='body1' >Codigo:</Typography>
                    <TextField
                        name='id'
                        required={false}
                        value={formState.id}
                        fullWidth
                        margin="none"
                        size="small"
                        disabled={true}
                        onChange={ onInputChange }
                    />
                </Grid>


                <Grid item flexBasis='100%' sx={{
                    display: 'flex',
                    justifyContent: 'space-around'
                }}>
                    <Button 
                        variant="contained" 
                        size='small' 
                        type='submit'
                        sx={{
                            fontSize: '.9rem'

                        }} startIcon={<Save fontSize='1rem' />}>
                            Guardar
                    </Button>

                    <Button 
                        onClick={ onCancel }
                        variant="contained" 
                        size='small' 
                        sx={{
                            fontSize: '.9rem',
                            backgroundColor: 'error.main',
                        }} startIcon={<DoDisturb fontSize='1rem' />}>
                        Cancelar
                    </Button>
                </Grid>
            </Grid>
        </form>

      </Modal>
  );
};
