<template>
  <popup-menu @close="close" class="label-menu-container">
    <template v-slot:header>
      <h3>Labels</h3>
    </template>
    <template v-slot:main>
      <ul class="label-list clean-list">
        <label-menu-item
          v-for="(label, idx) in labels"
          :key="idx"
          :label="label"
          @setActive="setActive"
          @update="updateLabels"
        />
      </ul>
    </template>
  </popup-menu>
</template>

<script>
import popupMenu from '../../../common/popup-menu';
import labelMenuItem from './label-menu-item';
export default {
  name: 'label-menu',
  props: {
    labels: Array,
  },
  computed: {},
  methods: {
    close() {
      this.$emit('close');
    },
    // TODO: Edit all label in the component and only emit the edited label
    setActive(idx) {
      this.$emit('setActive', idx);
    },
    updateLabels() {
      const board = this.$store.getters.getCurrBoard;
      board.labels = this.labels;
      this.$store.dispatch('updateBoard', board);
    },
  },
  components: {
    popupMenu,
    labelMenuItem,
  },
};
</script>
