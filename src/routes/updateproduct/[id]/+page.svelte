<script>
    import { page } from '$app/stores';

    // Sveltekit form enhancements
    import { enhance, applyAction } from '$app/forms';

    // Import the store etc.
    import { categories, getAllCategories } from '../../../stores/productStore';

    // Access data returned from +page.server.js
    // @ts-ignore
    export let data;
    // Access data returned from +page.server.js
    // @ts-ignore
    export let form;

    // Update list of categories (used in form)
    getAllCategories();

const { product } = data;

</script>
  
  <h1>Params</h1>
  <h3>id param from url: {$page.params?.id}</h3>
  <h3>To Do: Update Product with id {product?.id}</h3>