import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from '@chakra-ui/react'
import App from "./App.jsx";
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "@/pages/Login.tsx";
import ProtectedRoute from './ProtectedRoute.jsx';
import { Library } from "./pages/Library.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        element: <ProtectedRoute />,
        errorElement: <p>There was an error.</p>,
        children: [
          {
            path: "/",
            element: <Library />,
          },
          {
            path: "*",
            element: <p>Not Found</p>
          }
        ]
      },
    ],
  },
], {
  basename: import.meta.env.VITE_BASE_PATH
});

if (import.meta.env.DEV) {
  fetch('/api/method/library_management.www.library.get_context_for_dev', {
    method: 'POST',
  })
    .then(response => response.json())
    .then((values) => {
      const v = JSON.parse(values.message)
      //@ts-expect-error Adding Frappe to Window
      if (!window.frappe) window.frappe = {};
      //@ts-expect-error Adding Frappe to Window
      window.frappe.boot = v
    }
    )
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
