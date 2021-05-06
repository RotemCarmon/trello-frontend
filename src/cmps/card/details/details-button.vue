<template>
  <div class="details-button-container details-btn">
    <slot name="menu"></slot>
    <font-awesome-icon v-if="icon" class="button-icon" :icon="[prefix, icon]" />
    <span v-else-if="!icon" class="button-icon"></span>
    {{ txt }}
  </div>
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
      default: 'fas',
    },
    txt: String,
  },
};
</script>

<style lang="scss" scoped>
.details-button-container {
  position: relative;
  padding-inline-start: 6px;
  margin-bottom: 8px;
  .button-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-inline-end: 4px;
  }
}
</style>