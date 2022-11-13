<script>
    import { page } from '$app/stores';

</script>
  
  <h1>Params</h1>
  {#if ($page.params.id)}
    <h3>To Do: Update Product with id: {$page.params.id}</h3>
  {/if}