import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./components/error";
import AdminMain from "./components/Admin-main";
import UserEditSelect from "./components/UserEditSelect";
import UserEdit from "./components/UserEdit";
import TaskTypeAdd from "./components/TaskTypeAdd";
import UserAdd from "./components/UserAdd";
import Login from "./components/Login";
import ManagerMain from "./components/Manager-Main"
import TaskAdd from "./components/TaskAdd"

//element do ustalania ścieżek stron
const router=createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>
    },
    {path: 'admin', element: <AdminMain />},
    {path: 'admin/userAdd', element: <UserAdd />},
    {path: 'admin/userEdit', element: <UserEditSelect />},
    {path: 'admin/taskTypeAdd', element: <TaskTypeAdd />},
    {path: `admin/userEdit/user/*`, element: <UserEdit />},
    {path: `login`, element: <Login />},
    {path: 'manager', element: < ManagerMain/>},
    {path: 'manager/taskAdd', element: <TaskAdd />},
    {path: 'error', element: <ErrorPage />}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);
