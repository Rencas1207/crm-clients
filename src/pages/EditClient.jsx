import { Form as FormPost, redirect, useActionData, useLoaderData, useNavigate } from 'react-router-dom'
import Error from '../components/Error';
import Form from '../components/Form';
import { getClient, updateClient } from '../data/clientes';

export async function loader({ params }) {
   const client = await getClient(params.clientId);
   if (Object.values(client).length === 0) {
      throw new Response('', {
         status: 404,
         statusText: 'El cliente no fue encontrado'
      })
   }
   return client;
}

export async function action({ request, params }) {
   const formData = await request.formData();

   const datos = Object.fromEntries(formData);

   const email = formData.get('email');

   // Validación 
   const errores = [];
   if (Object.values(datos).includes('')) {
      errores.push('Todos los campos son obligatorios');
   }

   let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

   if (!regex.test(email)) {
      errores.push('El email no es válido');
   }

   if (Object.keys(errores).length) {
      return errores;
   }

   // update client
   await updateClient(params.clientId, datos);
   return redirect('/')
}

const EditClient = () => {
   const cliente = useLoaderData();
   const navigate = useNavigate();
   const errores = useActionData();

   return (
      <>
         <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
         <p className="mt-3">A continuación podrás modificar los datos de un cliente</p>

         <div className="flex justify-end">
            <button
               className='bg-blue-800 text-white px-3 py-1 font-bold uppercase'
               onClick={() => navigate(-1)}
            >
               Volver
            </button>
         </div>

         <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
            {
               errores?.length && errores.map((error, i) => (
                  <Error key={i}>{error}</Error>
               ))
            }

            <FormPost
               method="post"
               noValidate
            >
               <Form cliente={cliente} />

               <input
                  type="submit"
                  className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg cursor-pointer"
                  value="Guardar cambios" />
            </FormPost>
         </div>
      </>
   )
}

export default EditClient