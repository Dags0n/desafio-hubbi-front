import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./components/Navbar"
import VendasPage from "./pages/VendasPage"

const router = createBrowserRouter([
  {
    path: '/',
    element: 
      <Navbar>Home</Navbar>,
  },
  {
    path: '/produtos',
    element: <Navbar>Produtos</Navbar>,
  },
  {
    path: '/vendas',
    element: <Navbar><VendasPage /></Navbar>,
  },
  {
    path: '/compras',
    element: <Navbar>Compras</Navbar>,
  },
  {
    path: '*',
    element: <Navbar>Not Found</Navbar>,
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
