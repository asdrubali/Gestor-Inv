import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Menu, MenuItem } from '@mui/material'
import { AddCircleOutline, FileDownload } from '@mui/icons-material'
import { AgregarModal, TableViews } from '../components'
import { useGestorStore } from '../../hooks'


export const InventarioPage = () => {

  const { products, startDownloadData, startOpenModal } = useGestorStore()

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [itemMenu, setItemMenu] = useState('Todos')

  const [anchorCaT, setAnchorCat] = useState(null);
  const openCat = Boolean(anchorCaT);
  const [itemMenuCat, setItemMenuCat] = useState('Todos')

  const [dataProcesada, setDataProcesada] = useState(products)
  const menuItems = ['Activo', 'Inactivo', 'No Disponible', 'Descontinuado', 'Vencido', 'Por Vencer', 'Todos']
  const menuCategoria = ['tecnologia', 'otros...']

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const handleClickMenu = (event) =>{
    setItemMenu(event.target.innerText);
    setAnchorEl(null);
  }


  const handleClickCat = (event) => {
    setAnchorCat(event.currentTarget);
  };

  const handleClickMenuCat = (event) =>{
    setItemMenuCat(event.target.innerText);
    setAnchorCat(null);
  };

  const handleCloseCat = (event) => {
    setAnchorCat(null);
  };


  useEffect(() => {
  
    if(itemMenu.toLowerCase() === 'todos')
      setDataProcesada( products )
    else{
      const productsFilter = products.filter( product => {
        if( product.status.toLowerCase() === itemMenu.toLowerCase() ) return product
      })

      setDataProcesada( productsFilter )
    }

  }, [itemMenu, dataProcesada])

  useEffect(() => {
  
    if(itemMenuCat.toLowerCase() === 'todos')
      setDataProcesada( products )
    else{
      const productsFilter = products.filter( product => {
        if( product.category.name.toLowerCase() === itemMenuCat.toLowerCase() ) return product
      })

      setDataProcesada( productsFilter )
    }

  }, [itemMenuCat, dataProcesada])


  return (

    <Grid
        container
        width='100%'
        height='98vh'
        sx={{
          boxShadow: '0 0 5px #ccc'
        }}
      >

    {/* menu */}
      <Grid
        container
        width='100%'
        height='10%'
        justifyContent='space-between'
        wrap='nowrap'
        alignContent='center'
        p= '1%'
        borderBottom='1px solid #e0e0e0'

    >
      <Grid container>
        <Box>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Status: {itemMenu}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          > 
            {
              menuItems.map( item => (
                <MenuItem onClick={handleClickMenu}>{item}</MenuItem>
              ) )
            }
          </Menu>
        </Box>

        <Box>
          <Button
            id="basic-button"
            aria-controls={openCat ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openCat ? 'true' : undefined}
            onClick={handleClickCat}
          >
            Categoria: {itemMenu}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorCaT}
            open={openCat}
            onClose={handleCloseCat}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          > 
            {
              menuCategoria.map( item => (
                <MenuItem onClick={handleClickMenuCat}>{item}</MenuItem>
              ) )
            }
          </Menu>
        </Box>
      </Grid>


        <Box
            display='flex'
            alignContent='center'
        >
          <Button 
            variant="contained" 
            size="small" 
            startIcon={<AddCircleOutline />} 
            onClick={ startOpenModal }
            sx={{ 
              margin: 'auto 5px', 
              backgroundColor: 'info.main', 
              fontSize: '.6rem',
              // display: title.toLocaleLowerCase() !== 'stock' ? 'none' : ''
            }} >
              Agregar
          </Button>
          <Button 
            onClick={ () => startDownloadData() }
            variant="contained" 
            size="small" 
            startIcon={<FileDownload />}
            sx={{ 
              margin: 'auto 5px', 
              backgroundColor: 'success.main', 
              fontSize: '.6rem'
            }} >
              Descargar
          </Button>
        </Box>
      </Grid>

    {/* table   */}
      <Box
        mt='auto'
        width='100%'
        height='90%'
      >
        <TableViews products={ dataProcesada } />
      </Box>
      <AgregarModal/>

    </Grid>

  )
}
