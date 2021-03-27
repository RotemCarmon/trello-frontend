<template>
  <section
    v-if="checkLists && checkLists.length"
    class="check-main-container details-section"
  >
    <todo-list
      v-for="list in checkLists"
      :list="list"
      :key="list.id"
      @update="updateTodos"
      @remove="removeList"
    />
  </section>
</template>

<script>
import todoList from './todo-list';
export default {
  name: 'check-main',
  props: {
    checkLists: {
      type: Array,
    },
  },
  methods: {
    updateTodos() {
      this.$emit('update');
    },
    removeList(id) {
      const idx = this.checkLists.findIndex((list) => list.id === id);
      if (idx === -1) return console.log("Can't remove list");
      this.checkLists.splice(idx, 1);
      this.updateTodos()
    },
  },
  components: {
    todoList,
  },
};
</script>

<style>
</style>