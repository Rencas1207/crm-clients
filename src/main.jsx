import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import NewClient, { action as newClienteAction } from './pages/NewClient';
import Index, { loader as clientesLoader } from './pages/Index';


const router = createBrowserRouter([
   {
      path: '/',
      element: <Layout />,
      children: [
         {
            index: true,
            element: <Index />,
            loader: clientesLoader
         },
         {
            path: '/clientes/nuevo',
            element: <NewClient />,
            action: newClienteAction
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
