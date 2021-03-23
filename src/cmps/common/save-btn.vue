<template>
  <div class="save-btn-container flex">
    <button @click="save" class="save-btn flex center-center">Save</button>
    <button @click="close" class="close flex center-center sqare-btn">
      <i class="close-btn"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'save-btn',
  methods: {
    close() {
      this.$emit('close');
    },
    save() {
      this.$emit('save');
    },
  },
};
</script>

<style lang="scss" scoped >
.save-btn-container {
  .close-btn{
    font-style: normal;
    font-size: 1.2rem;
    &::before {
      content: '\2715';
      font-weight: 700;
    }
  }
}
</style>