<template>
  <div
    v-if="label"
    class="label-item"
    :style="{ backgroundColor: label.color }"
  >
    {{ isOpen ? label.txt : '' }}
  </div>
</template>

<script>
export default {
  name: 'label-item',
  props: {
    label: Object,
    isOpen: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
};
</script>

<style>
.label-item {
  user-select: none;
  width: 40px;
  margin: 5px 5px 5px 0;
  border-radius: 5px;
  height: 8px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-inline-start: 6px;
  color: white;
  transition: all 0.5s, background-color 0s;
  cursor: pointer;
}

.details-section .label-item {
  height: 12px;
}

.details-section .label-open .label-item {
  height: 24px;
  width: 80px;
}
.card-preview-container .label-item {
  font-size: 0;
}
.card-preview-container .label-open .label-item {
  width: 60px;
  height: 16px;
}
</style>