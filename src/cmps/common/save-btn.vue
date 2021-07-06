<template>
  <div class="save-btn-container flex">
    <button @click="save" class="save-btn flex center-center">{{txt}}</button>
    <button v-if="withClose" @click="close" class="close flex center-center square-btn">
      <!-- Change close to font-awesome -->
      <i class="close-btn"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'save-btn',
  props: {
    txt: {
      type: String,
      default: 'Save'
    },
    withClose: {
      type: Boolean,
      default: true
    }
  },
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
  margin-top: 12px;
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