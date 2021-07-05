<template>
  <section
    class="popup-menu-container popup-menu"
    ref="menu"
    :style="{ left: menuOffset + 'px' }"
  >
    <slot name="header"></slot>
    <font-awesome-icon
      :icon="['fal', 'times']"
      class="close-btn close-menu-btn"
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
    this.$nextTick(() => {
      const boundingClient = this.$refs.menu.getBoundingClientRect();
      const clientWidth = this.$refs.menu.clientWidth;
      if (boundingClient.left + clientWidth > windowWidth - 15) {
        const diff = windowWidth - (boundingClient.left + clientWidth);
        this.menuOffset = diff;
      }
    });
  },
};
</script>