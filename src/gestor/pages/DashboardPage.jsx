
import { useState } from 'react'
import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import { Cached } from '@mui/icons-material'
import { Gbarra, Gline, Gpies } from '../components'
import { useGestorStore } from '../../hooks'
import { contarObjetos } from '../../helpers/contarObjetos'



const indicadoresStyles = { 
  rowGap: '2%', 
  boxShadow: '0 0 3px #ccc' 
}

export const DashboardPage = () => {

  const { products = [], StartDataGestor } = useGestorStore();

  const [refresh, setRefresh] = useState(false);


  const handleRefresh = () => {
    setRefresh(!refresh);
    StartDataGestor();
  };


  const indicadoresData = [
    {
      name: 'Activos',
      values: contarObjetos(products, 'status', 'Activo' )
    },
    {
      name: 'Inactivos',
      values: contarObjetos(products, 'status', 'Inactivo' )
    },
    {
      name: 'No disponibles',
      values: contarObjetos(products, 'status', 'No Disponible' )
    },
    {
      name: 'Vencidos',
      values: contarObjetos(products, 'status', 'Vencido' )
    },
    {
      name: 'Por Vencer',
      values: contarObjetos(products, 'status', 'Por Vencer' )
    }
  ]
  

  return (
    <>
      <Grid
        width='100%'
        container
        direction='row'
        wrap='nowrap'
        justifyContent='space-between'
        overflow= 'hidden'
      >
        <Box direction="row" sx={{padding: '0px !important', overflow: 'hidden', margin: 'auto 0' }} >
          <Button variant="outlined" size='small' onClick={handleRefresh}  startIcon={<Cached />}>
            Refresh
          </Button>
        </Box>
        <Typography
          component='h4'
          variant='h4'
          color='primary.main'
          fontWeight='600'
          fontStyle='oblique'
          align='end'
          pr={2}
        >
          Dashboard
        </Typography>
      </Grid>

      <Grid 
        container
        m='0 auto'
        height='13%'
        width='90%'
        directio='row'
        justifyContent='center'
        wrap='nowrap'
        sx={{
          columnGap: '2%',
        }}
      >
        {
          indicadoresData.map( indicador => (
            <Box 
              flexGrow={1} 
              flexShrink={1} 
              height='100%' 
              textAlign='center'
              sx={ indicadoresStyles } 
            >
              <Typography fontSize='1rem'>{ indicador.name }</Typography>
              <Typography fontSize='1.8rem' fontWeight='600' color='primary.dark' >{ indicador.values }</Typography>
            </Box>
          ))

        }
      </Grid>

      <Grid
        container
        direction='row'
        wrap='wrap'
        width='100%'
        justifyContent='center'
        height='90%'
        sx={{
          columnGap: '2%', 
          rowGap: '2%', 
        }}
      >
        <Grid
        container
        width='93%'
        flexBasis='45%'
        direction='column'
        alignContent='center'
        sx={{
          rowGap: '2%', 
          boxShadow: '0 0 3px #ccc'
        }}
      >
        <Grid
          item
          width='93%'
          height='50%'
        >
            <Gbarra indicadoresData = { indicadoresData } />
        </Grid>

        <Divider sx={{ padding: '0 !important', backgroundColor: '#1e1e1e'}} />

        <Grid
          item
          width='93%'
          height='40%'
        >
          <Gpies indicadoresData = { indicadoresData } />
        </Grid>

        </Grid>

        <Grid 
        container
        height='100%'
        flexBasis='45%'
        direction='column'
        alignContent='center'
        sx={{
          rowGap: '2%', 
          boxShadow: '0 0 3px #ccc'
        }}
      >
        <Box
          width='95%'
          flexBasis='90%'
        >
          <Box
            p={1}
            height='90%'
          >
            <Gline/>
            
          </Box>
        </Box>

        </Grid>
      </Grid>
      
    </>
  )
}
