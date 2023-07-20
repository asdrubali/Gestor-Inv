import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { useAuthStore } from "../hooks"
import { GestorRoutes } from "../gestor"
import { LoginPage } from "../auth/"




export const AppRouter = () => {

  const { statusSesion, checkAuthToken } = useAuthStore()


  useEffect(() => {
    checkAuthToken();
}, [])

  return (
    <>
        <Routes>
            {
                ( statusSesion === 'authenticated')  
                    ? (
                      <>
                        <Route path="/*" element={ <GestorRoutes /> } />
                      </>

                    )
                    : (
                      <>
                        <Route path="/auth/login" element={ <LoginPage /> } />
                        <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                      </>
                    )
            }

        </Routes>
    </>
  )
}
