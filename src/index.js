import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter, RouterProvider, Link, Outlet} from "react-router-dom";
import ErrorPage from "./components/error";
import AdminMain from "./components/Admin-main";
import UserEdit from "./components/UserEdit";

//element do ustalanai ścieżek stron
const router=createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>
    },
    {path: 'admin', element: <AdminMain />},
    {path: 'admin/userAdd', element: <AdminMain />},
    {path: 'admin/userEdit', element: <UserEdit />},
    {path: 'admin/taskTypeAdd', element: <AdminMain />}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);
