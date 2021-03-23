<template>
  <div
    class="label-list flex align-end"
    :class="{ 'label-open': isOpenLabel }"
    @click.stop="isOpenLabel = !isOpenLabel"
  >
    <label-item
      v-for="(label, idx) in labels"
      :key="idx"
      :label="label"
      :isOpen="isOpenLabel"
    />
  </div>
</template>

<script>
import labelItem from './label-item';
export default {
  name: 'label-list',
  props: {
    labels: Array,
  },
  data() {
    return {
      isOpenLabel: false,
    };
  },
  components: {
    labelItem,
  },
};
</script>