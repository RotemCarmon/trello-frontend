<template>
  <header class="header-container header-grid-container">
    <div class="btn-header square-btn" @click="goHome">
      <font-awesome-icon icon="home" />
    </div>
    <div class="logo">
      <img :src="require('../../assets/icon/collo.png')" />
    </div>
    <div class="header-btns">
      <div class="btn-header login-btn">Login</div>
      <router-link to="/board-list" class="btn-header boards-btn">
        <font-awesome-icon icon="th" />
        Boards
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'main-header',
  methods: {
    goHome() {
      this.$router.push('/');
    },
  },
};
</script>
