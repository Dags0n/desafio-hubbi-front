import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Navbar from "./components/Navbar"
import VendasPage from "./pages/VendasPage"
import ProdutosPage from "./pages/ProdutosPage"
import ComprasPage from "./pages/ComprasPage"

const router = createBrowserRouter([
  {
    path: '/',
    element: 
      <Navbar>Home</Navbar>,
  },
  {
    path: '/produtos',
    element: <Navbar><ProdutosPage /></Navbar>,
  },
  {
    path: '/vendas',
    element: <Navbar><VendasPage /></Navbar>,
  },
  {
    path: '/compras',
    element: <Navbar><ComprasPage /></Navbar>,
  },
  {
    path: '*',
    element: <Navbar>Not Found</Navbar>,
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer 
        position="bottom-right"
        autoClose={2000}
        closeOnClick
        draggable
      />
    </>
  )
}

export default App
