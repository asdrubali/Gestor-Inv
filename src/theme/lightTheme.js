import { createTheme } from "@mui/material";



export const lightTheme = createTheme({
    palette: {
        primary:{
            main: 'rgb(10, 25, 41)',
            light: 'rgba(204, 204, 204, .1)',
            dark: '#8a2be2',
            contrastText: '#ffffff' 
        },
        secondary: {
            main: '#ffffff',
          },    
          customColor: {
            hoverLight: '#45A899'
          },
    },
    typography: {
        fontFamily: [
          'arial',
        ].join(','),
    },
    breakpoints:{
      values:{
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1920,
      }
  }

})


