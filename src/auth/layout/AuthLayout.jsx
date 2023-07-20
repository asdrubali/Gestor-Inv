import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import { Loading } from "../../components/Loading";

export const AuthLayout = ({ children, tittle = '' }) => {
  const { statusSesion } = useSelector((state) => state.auth);


  const isAuthenticating = useMemo( () => statusSesion === 'checking', [ statusSesion ]  );


  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ 
              minHeight: '100vh', 
              backgroundColor: 'primary.main', 
              pb: 4,
            }}
      >
        <Grid
          item
          className='box-shadow'
          xs={3}
          sx={{
            width: { sm: 450 },
            backgroundColor: 'primary.contrastText',
            padding: 3,
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {isAuthenticating && <Loading />}
          <Typography variant="h5" sx={{ mb: 1 }}>{tittle}</Typography>
          {children}
        </Grid>
      </Grid>
    </>
  );
};
