import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter, RouterProvider, Link, Outlet} from "react-router-dom";
import ErrorPage from "./components/error";
import AdminMain from "./components/Admin-main";
import UserEditSelect from "./components/UserEditSelect";
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
    {path: 'admin/userEdit', element: <UserEditSelect />},
    {path: 'admin/taskTypeAdd', element: <AdminMain />},
    {path: `admin/userEdit/user/*`, element: <UserEdit />}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);
