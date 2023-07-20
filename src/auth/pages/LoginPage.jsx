import { Button, Grid, TextField, Typography } from "@mui/material";
import { useAuthStore, useForm } from "../../hooks";
import { AuthLayout } from "../layout/AuthLayout";


const initialForm = {
  email: '',
  password: ''
};

export const LoginPage = () => {
  const { startLogin } = useAuthStore();
  const { email, password, onInputChange, formState } = useForm(initialForm);

  const onLogin = async (event) => {
    event.preventDefault();
    await startLogin(formState);
  };

  return (
    <>
      <AuthLayout tittle="Login">
        <form onSubmit={onLogin}>
          <Grid container >
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Correo"
                type="email"
                placeholder="Correo@google.com"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Contraseña"
                type="password"
                placeholder="Password"
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
              />
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

              <Grid item xs={12} sm={6}>
                <Button variant="contained" fullWidth type="submit">
                  LogIn
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button variant="contained" fullWidth>
                  <Typography sx={{ ml: 1 }}>Soporte</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>
    </>
  );
};
