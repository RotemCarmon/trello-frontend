<template>
  <div
    v-if="label"
    class="label-item"
    :style="{ backgroundColor: label.color }"
  >
    {{isOpen?label.title:'' }}
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
  margin-inline-end: 5px;
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
.card-preview-container .label-open .label-item {
  width: 60px;
  height: 16px;
  font-size: 13px;
}
</style>