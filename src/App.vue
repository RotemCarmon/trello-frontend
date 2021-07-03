<template>
  <main class="main-app">
    <main-header />
    <router-view />
  </main>
</template>
<script>
import mainHeader from './cmps/common/main-header';
export default {
  components: {
    mainHeader,
  },
};
</script>
