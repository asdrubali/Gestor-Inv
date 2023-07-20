import { Box, Grid } from "@mui/material"

import './styleLoading.css'

export const Loading = () => {
  return (
    <Grid
        container   
        width='100%'
        height='100%'
        position='absolute'
        zIndex='10'
        top='0'
        left='0'
        sx={{
            backgroundColor: '#fff',
            opacity: '.5'
        }}

    >
        <Box
          className="loader"
          mt='20%'
          ml='50%'
        >
            <Box className="circle"></Box>
            <Box className="circle"></Box>
            <Box className="circle"></Box>
            <Box className="circle"></Box>
       </Box>

        
    </Grid>
  )
}

