<template>
  <button class="details-button-container">
    <slot name="menu"></slot>
    <font-awesome-icon v-if="icon" class="button-icon" :icon="[prefix, icon]" />
    <span v-else-if="!icon" class="button-icon"></span>
    {{ txt }}
  </button>
</template>

<script>
export default {
  name: 'details-button',
  props: {
    icon: {
      type: String,
    },
    prefix: {
      type: String,
      default: 'fas'
    },
    txt: String,
  },
};
</script>

<style lang="scss" scoped>
.details-button-container {
  position: relative;
  width: 120px;
  padding: 6px 12px;
  padding-inline-start: 6px;
  border-radius: 3px;
  background-color: rgba(9, 30, 66, 0.04);
  margin-bottom: 8px;

  .button-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-inline-end: 4px;
  }
  transition: background-color 0.4s;
  &:hover {
    background-color: #091e421f;
  }
}
</style>