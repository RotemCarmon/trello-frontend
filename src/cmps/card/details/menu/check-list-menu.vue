<template>
  <popup-menu @close="close" class="check-list-menu-container">
    <template v-slot:header>
      <h3>Add Checklist</h3>
    </template>
    <template v-slot:main>
      <h5>Title</h5>
      <input type="text" v-model="checklistTitle" />
      <button @click="save" class="save-btn flex center-center">Add</button>
    </template>
  </popup-menu>
</template>

<script>
import popupMenu from '../../../common/popup-menu';
export default {
  name: 'check-list-menu',
  data() {
    return {
      checklistTitle: '',
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    save() {
      this.$emit('addChecklist', this.checklistTitle);
    },
  },
  components: {
    popupMenu,
  },
};
</script>

<style>
</style>