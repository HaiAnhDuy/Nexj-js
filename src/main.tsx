import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UserPage from './screens/user.page.tsx';
// import './index.css'
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello world!</div>,
//   },
// ]);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/hello',
    element: <UserPage />
  }
]);
ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>
)
