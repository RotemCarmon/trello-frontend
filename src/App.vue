<template>
  <main class="main-app">
    <header-cmp />
    <router-view />
  </main>
</template>
<script>
import headerCmp from './cmps/common/header-cmp';
export default {
  components: {
    headerCmp,
  },
};
</script>
