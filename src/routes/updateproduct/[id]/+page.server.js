// Import sveltekit dependencies
import { invalid, redirect } from "@sveltejs/kit"

// Import the store etc.
import { GetProductById, updateProduct } from '../../../stores/productStore.js';


// Refresh the store when page loads (optional due to overhead but probably a good idea)
/** @type {import('./$types').PageServerLoad} */
export const load = async ({params}) => {

    // read id param 
    const id = params.id;

    console.log('id param value: ', id)

    const product = await GetProductById(id);

    return {
                product: product
    }
}


// The form action handler(s)
export const actions = {
    // To do: add action to handle form submit
    // product update etc.
}