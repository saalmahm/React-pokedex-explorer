import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import PokemonDetailPage from './pages/PokemonDetailPage'
import AboutPage from './pages/AboutPage'

const theme = createTheme({
  palette: {
    primary: {
      main: '#EE1515',
    },
    secondary: {
      main: '#3B4CCA',
    },
    background: {
      default: '#f7f7f7',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}

export default App