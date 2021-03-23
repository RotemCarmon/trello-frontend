<template>
  <header class="header-container">
    <div class="btn-header sqare-btn">
      <font-awesome-icon icon="home" />
    </div>
    <div class="logo">Trello</div>
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
export default {};
</script>
