import { writable } from 'svelte/store';


// .env variables starting with VITE_ are accessible client and server side 
const base_url = import.meta.env.VITE_API_BASE_URL

// declare writable stores for products and categories
export let products = writable([]);
export let categories = writable([]);


//
// Used to Initialise  requests
// parameters: http method and body content note default values)
const initRequest = (http_method = 'GET', body_data = '') => {

    let request = {
        method: http_method,
        //credentials: 'include',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
            //,"Authorization": "Bearer " + getAccessToken()
        },
        mode: 'cors',
        cache: 'default',
    };

    if (body_data) {
        request.body = body_data;
    }

    return request;
};


// Function to fetch and return data from an API
// Full URI based on base_url + endpoint
const getAPIData = async (endpoint = '', request = initRequest()) => {
    try {
        // @ts-ignore
        const response = await fetch(`${base_url}${endpoint}`, request);
        const data = await response.json();
        return data;

    } catch (err) {
        console.log('API error (store) ', err.message);
    } finally {

    }
};

// Function to get all products from the api
// sets the products store
export const getAllProducts = async () => {

    const data = await getAPIData('/product');
    products.set(data);
};

// Function to get all categories from the api
// sets the categories store
export const getAllCategories= async () => {

    const data = await getAPIData('/category');
    categories.set(data);     

};

// Get product by id
export const GetProductById= async (id = '') => {
    // call api to get product by id

    // test product

    return {
        id: id
    }
}


// Function to get products in a category (by category id)
// sets the products store
export const getProductsByCat= async (cat_id = 0) => {

    // 
    if (cat_id > 0) {
        const data = await getAPIData(`/product/bycat/${cat_id}`);
        categories.set(data);
    } else {
        getAllProducts();
    }

};

export const addNewProduct= async (product = '') => {

    if (product) {
        const request = initRequest('POST', product);
        const result = await getAPIData('/product', request);
        getAllProducts();

        return result;
    } else {
        console.log('Store: Add new product failed: missing product');
    }


}

export const updateProduct = async (product = '') => {


}



  // fill the store
  //await getAllProducts();
  //await getAllCategories();
