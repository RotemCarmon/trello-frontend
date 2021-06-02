<template>
  <div class="fallback-container">
    <h1>Unknown path!!!</h1>
    <pre>
    {{ $route.params }}
  </pre
    >
  </div>
</template>

<script>
export default {
  name: 'fallback-page',
};
</script>

<style>
</style>