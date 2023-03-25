import { useLoaderData } from 'react-router-dom'
import { getClient } from '../data/clientes';

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

const EditClient = () => {
   const loader = useLoaderData();
   // const params = useParams();

   console.log(loader);

   return (
      <div>EditClient</div>
   )
}

export default EditClient