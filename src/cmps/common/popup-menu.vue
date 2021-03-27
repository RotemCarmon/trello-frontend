<template>
  <section
    class="popup-menu-container popup-menu"
    ref="menu"
    :style="{ left: menuOffset + 'px' }"
  >
    <slot name="header"></slot>
    <font-awesome-icon
      :icon="['fal', 'times']"
      class="close-btn"
      @click="close"
    />
    <slot name="main"></slot>
  </section>
</template>

<script>
export default {
  name: 'popup-menu',
  data() {
    return {
      menuOffset: null,
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
  mounted() {
    const windowWidth = window.innerWidth;
    const boundingClient = this.$refs.menu.getBoundingClientRect();
    const clientWidth = this.$refs.menu.clientWidth;
    // const scrollBarOffset = 18;
    if (boundingClient.left + clientWidth > windowWidth) {
      const diff = windowWidth - (boundingClient.left + clientWidth);
      this.menuOffset = diff;
    }
  },
};
</script>

<style>
</style>