// import the products store
import  {getAllProducts, getAllCategories} from '../stores/productStore.js';

// Refresh the store when page loads (optional due to overhead but probably a good idea)
export const load = async ({ fetch }) => {

    // fill the store
    await getAllProducts();
    await getAllCategories();

    return {

    }
}