import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import NewClient, { action as newClienteAction } from './pages/NewClient';
import Index, { loader as clientesLoader } from './pages/Index';
import ErrorPage from './components/ErrorPage';
import EditClient, { loader as editClientLoader, action as editClientAction } from './pages/EditClient';
import { action as deleteClienteAction } from './components/Client';


const router = createBrowserRouter([
   {
      path: '/',
      element: <Layout />,
      children: [
         {
            index: true,
            element: <Index />,
            loader: clientesLoader,
            errorElement: <ErrorPage />
         },
         {
            path: '/clientes/nuevo',
            element: <NewClient />,
            action: newClienteAction,
            errorElement: <ErrorPage />
         },
         {
            path: '/clientes/:clientId/edit',
            element: <EditClient />,
            loader: editClientLoader,
            action: editClientAction,
            errorElement: <ErrorPage />
         },
         {
            path: '/clientes/:clientId/delete',
            action: deleteClienteAction
         }
      ]
   },
])

ReactDOM.createRoot(document.getElementById('root')).render(
   <RouterProvider
      router={router}
   >

   </RouterProvider>
);
