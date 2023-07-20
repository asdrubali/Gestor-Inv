import { Box, Grid } from "@mui/material"
import { AgregarModal, SideBar } from "../components"
import { Loading } from "../../components/Loading"
import { useGestorStore } from "../../hooks"




export const GestorLayout = ({ children }) => {

  const { gestorStatus } = useGestorStore();



  const darw = { 
    widthOpen1 : 220,
    widthClosed2: 60
  }

  return (
    <Box
      sx={{ display: 'flex', backgroundColor: 'secondary.main', height: '100vh' }}
    >
      <SideBar { ...darw } />

      <Grid 
        component='main'
        container
        height='500px'
        p={1}
        sx={{
          columnGap: '2%',
          rowGap: '2%', 
        }}
      >
          {
            (gestorStatus === 'checking') ? <Loading/> : children
          }
      </Grid>


    </Box>
  )
}
