<template>
  <section class="popup-menu-container popup-menu">
    <slot name="header"></slot>
    <font-awesome-icon :icon="['fal','times']" class="close-btn" @click="close" />
    <slot name="main"></slot>
  </section>
</template>

<script>
export default {
  name: 'popup-menu',
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style>

</style>