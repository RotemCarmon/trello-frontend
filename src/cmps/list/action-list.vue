<template>
<popup-menu @close="close" class="action-list-container flex column">
  <template v-slot:header>
    <h3>List Actions</h3>
  </template>
  <template  v-slot:main>
    <button @click="removeList">Delete List</button>
    <button @click="addCard">Add Card</button>
  </template>
</popup-menu>
</template>

<script>
import popupMenu from '../common/popup-menu';
export default {
  name: 'action-list',
  methods: {
    removeList() {
      this.$emit('remove');
    },
    addCard() {
      this.$emit('addCard');
    },
    close() {
      this.$emit('close');
    },
  },
  components: {
    popupMenu,
  },
};
</script>
