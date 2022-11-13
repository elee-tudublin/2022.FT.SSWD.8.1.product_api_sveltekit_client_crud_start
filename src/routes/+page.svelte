<script>
// @ts-nocheck

	// Import the store etc.
	import { products, categories, getAllProducts } from '../stores/productStore.js';

	import { browser } from '$app/environment';

	// filtered is subscribed to the $products store
	// initially filtered is a copy of products (from the store)

	$: filtered = $products;

	// Object to store sort directions
	const table_sort = {
		id: false,
		product_name: false,
		product_description: false,
		product_stock: false,
		product_price: false
	};

	// Sort alpha values in a givren column (default to product_name)
	const sortAlpha = (col = 'product_name') => {

		// reverse current sort direction for this col
		// i.e. reverse the current order
		table_sort[col] = !table_sort[col];

		// output to the  browser console
		console.log(`${col} : ${table_sort[col]}`);

		// sort the filtered array based on column selected
		// sort takes a function parameter to indicate which column should be sorted (e.g. product_name) 
		filtered = filtered.sort((a, b) => {
			// sort asc
			if (table_sort[col] === true) {
				return a[col].toLowerCase() < b[col].toLowerCase();
			// sort desc
			} else {
				return a[col].toLowerCase() > b[col].toLowerCase();
			}
		});
	}

	// sort numeric values in a given column (default to product_price)
	const sortNumeric = (col = 'product_price') => {

		// reverse current sort direction for this col
		table_sort[col] = !table_sort[col];

		// check browser console for output
		// sort takes a function parameter to indicate which column should be sorted (e.g. product_price) 
		console.log(`${col} : ${table_sort[col]}`);

		// sort the filtered array based on column selected
		filtered = filtered.sort((a, b) => {
			if (table_sort[col] === true) {
				return a[col] - b[col];
			} else {
				return b[col] - a[col];
			}
		});
	}

	// This function will filter products by cat_id
	const filterByCat = async (cat_id = 0) => {
		// Refresh the store to ensure it is up to date (optional)
		await getAllProducts();

		// Filter if we have a cat_id value > 0
		// See https://javascript.info/array-methods#filter
		// Note this filters the existing $product store and does not replace it like getProductsByCat()
		if (cat_id > 0) {
			filtered = $products.filter((p) => {
				return p.category_id == cat_id;
			});
		}
	};

	// Function to delete a product by id
	// validate id
	// Ask user to confirm
	// then call API endpoint to delete
	// refresh the view
	const deleteProduct = async (id = 0) => {
		if (confirm(`Permenently deleting product with id= ${id}\n\nAre you sure?`)) {
			console.log(`delete product id: ${id}`);
		}
	};
</script>

<!-- Main Content - Products etc. -->
<div class="container">
	<div class="row">
		<!-- Page Header -->
		<h2 class="mt-5">Products List</h2>
	</div>
	<div class="row">
		<div class="col-sm-2">
			<!-- Page Body Left Column (menu) -->
			<div id="categoryList" class="list-group">
				<!-- placeholders - replace with real category links -->
				<button
					on:click={() => filterByCat()}
					class="category-link list-group-item list-group-item-action"
				>
					All Products
				</button>
				{#each $categories as cat}
					<button
						on:click={() => filterByCat(cat.id)}
						class="category-link list-group-item list-group-item-action"
					>
						{cat.category_name}
					</button>
				{/each}
			</div>
		</div>
		<!-- End category col -->
		<div class="col-sm-10">
			<!-- Page Body Right Side (Content goes here) -->
			<div id="products">
				<table class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
							<th><a on:click={() => sortNumeric('id')} href="/">id</a></th>
							<th><a on:click={() => sortAlpha('product_name')} href="/">name</a></th>
							<th><a on:click={() => sortAlpha('product_description')} href="/">description</a></th>
							<th><a on:click={() => sortNumeric('product_stock')} href="/">stock</a></th>
							<th><a on:click={() => sortNumeric('product_price')} href="/">price</a></th>
						</tr>
					</thead>
					<tbody id="productRows">
						<!-- Product Rows to be inserted here -->
						{#each filtered as product}
							<tr>
								<td>{product.id}</td>
								<td>{product.product_name}</td>
								<td>{product.product_description}</td>
								<td>{product.product_stock}</td>
								<td class="price">&euro;{Number(product.product_price).toFixed(2)}</td>
								<td
									><a
										class="btn btn-sm btn-outline-primary"
										href="/updateproduct/{product.id}"
										role="button"
									>
										<span class="bi bi-pencil-square" />
									</a>
								</td>
								<td
									><button
										on:click={() => deleteProduct(product.id)}
										class="btn btn-sm btn-outline-danger"
									>
										<span class="bi bi-trash" /></button
									>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<!-- Add product button goes here -->
			<a id="AddProductButton" class="btn btn-primary" href="/addproduct" role="button">New Product</a>
		</div>
		<!-- End Product col -->
	</div>
	<!-- End Row -->
</div>

<!-- End Main Content-->
<style>
</style>
