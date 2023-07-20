import { ThemeProvider } from "@emotion/react"
import { lightTheme } from "./lightTheme"


export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={ lightTheme } >
        
        { children }

    </ThemeProvider>
  )
}
