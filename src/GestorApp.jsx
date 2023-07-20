import React from 'react';
import es from 'date-fns/locale/es'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AppTheme } from './theme/AppTheme';
import { AppRouter } from './router';



export const GestorApp = () => {
  return (
    <AppTheme >
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es} >
        <AppRouter/>
      </LocalizationProvider>
    </AppTheme>
  )
}
