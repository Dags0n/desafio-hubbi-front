import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Home</div>,
  },
  {
    path: '/produtos',
    element: <div>Produtos</div>,
  },
  {
    path: '/vendas',
    element: <div>Vendas</div>,
  },
  {
    path: '/compras',
    element: <div>Compras</div>,
  },
  {
    path: '*',
    element: <div>Not Found</div>,
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
