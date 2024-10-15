
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react"
import Sideraia from "./Sideraia"
import Automator from "./modules/Automator/pages/Automator"
import Dynamic from "./modules/Dynamic/pages/Dynamic"
import DynamicNew from "./modules/Dynamic/pages/DynamicNew"

import { Toaster } from "sonner"

function App() {

  const endPoints = useSelector((state) => state.automator.endPoints)

  const [routes, setRoutes] = useState([
    {
      path: "/",
      element: <Sideraia />,
      children: [
        {
          path: "/",
          element: <Automator />,
        },
      ]
    },
  ])

  useEffect(() => {
    const newRoutes = endPoints.filter(endpoint => endpoint.method == "GET" && endpoint.url.split("/").length === 2)
    // Mapear los nuevos routes y agregarlos a las rutas existentes como hijos
    const updatedRoutes = routes.map(route => {
      if (route.element.type === Sideraia) {
        return {
          ...route,
          children: [
            ...route.children, // Mantenemos los hijos existentes
            ...newRoutes.map(endpoint => ({ // Agregamos las nuevas rutas como hijos
              path: endpoint.url,
              element: <Dynamic />,
            })),
            ...newRoutes.map(endpoint => ({ // Agregamos las nuevas rutas como hijos
              path: `${endpoint.url}/new` ,
              element: <DynamicNew />,
            })),
          ],
        }
      }
      return route
    })
    // Actualizar el estado de las rutas
    setRoutes(updatedRoutes)

  }, [endPoints])

  const router = createBrowserRouter(
    routes
  )

  return (
    <>
      <Toaster richColors position="top-center"/>
      <RouterProvider router={router} />
    </>
  )
}

export default App