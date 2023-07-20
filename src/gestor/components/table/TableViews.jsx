import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Box, Button, Grid, IconButton, Menu, MenuItem, TablePagination } from '@mui/material';
import { AddCircleOutline, DeleteForever, EditOutlined, FileDownload } from '@mui/icons-material';
import { useGestorStore } from '../../../hooks';

export const TableViews = ({ products }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const { startEditProduct, startDeleteData, startCheckingData } = useGestorStore()
    

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const reversedProducts = [...products].reverse()


  return (

    <Box
      width='100%'
      height='90%'
      overflow='hidden'
    >

      <Paper sx={{ width: '100%', height: '100%'}}>
      <TableContainer sx={{ height: '92%' }} >
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: 'center' }}>Codigo</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Name</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Price</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Ingreso</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Vencimiento</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>categoria</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>stok</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>status</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>accion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reversedProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ p: '.4rem', textAlign: 'center', minWidth: '5%', maxWidth: '5%', overflow: 'hidden' }}>{row.id}</TableCell>
                  <TableCell sx={{ p: '.4rem', textIndent: '1%', minWidth: '30%', maxWidth: '30%', overflow: 'hidden' }}>{row.name}</TableCell>
                  <TableCell sx={{ p: '.4rem', textAlign: 'center', minWidth: '10%', maxWidth: '10%' }}>{row.price}</TableCell>
                  <TableCell sx={{ p: '.4rem', textAlign: 'center', minWidth: '15%', maxWidth: '15%' }}>{format(new Date(row.fecha_ingreso), 'dd/MM/yyyy')}</TableCell>
                  <TableCell sx={{ p: '.4rem', textAlign: 'center', minWidth: '15%', maxWidth: '15%' }}>{format(new Date(row.fecha_vencimiento), 'dd/MM/yyyy')}</TableCell>
                  <TableCell sx={{ p: '.4rem', textAlign: 'center', minWidth: '15%', maxWidth: '15%' }}>{row.category.name}</TableCell>
                  <TableCell sx={{ p: '.4rem', textAlign: 'center', minWidth: '5%', maxWidth: '5%' }}>{row.stock}</TableCell>
                  <TableCell sx={{ p: '.4rem', textAlign: 'center', minWidth: '10%', maxWidth: '10%' }}>{row.status}</TableCell>
                  <TableCell sx={{ p: '.4rem', textAlign: 'center', padding: 0 }}>
                    <IconButton size="small" onClick={() => startEditProduct(row)}>
                      <EditOutlined sx={{ fontSize: '1.5rem' }} />
                    </IconButton>

                    <IconButton size="small" onClick={() => startDeleteData(row)}>
                      <DeleteForever color="error" sx={{ fontSize: '1.5rem' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
        sx={{ flexBasis: '20%', height: '35px', overflow: 'hidden' }}
      />
      </Paper>
    </Box>
  );
};
