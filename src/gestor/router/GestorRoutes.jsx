import { Navigate, Route, Routes } from "react-router-dom"
import {  DashboardPage, InventarioPage,  } from "../pages"
import { GestorLayout } from "../layout/GestorLayout"


export const GestorRoutes = () => {
  return (
  <>
      <GestorLayout>
        <Routes>
          <Route path="/gestor/dashboard" element={ <DashboardPage /> } />
          <Route path="/gestor/inventario" element={ <InventarioPage /> } />
          <Route path="/*" element={ <Navigate to="/gestor/dashboard" /> } />
        </Routes>
      </GestorLayout>
    </>
  )
}