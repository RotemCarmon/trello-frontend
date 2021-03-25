<template>
  <section v-if="checkLists && checkLists.length" class="check-main-container details-section">
    <todo-list v-for="list in checkLists" :list="list" :key="list.id"  @update="updateTodos" />
  </section>
</template>

<script>
import todoList from './todo-list';
export default {
  name: 'check-main',
  props: {
    checkLists: {
      type: Array
    },
  },
  methods: {
    updateTodos() {
      this.$emit('update')
    }
  },
  components: {
    todoList,
  },
};
</script>

<style>
</style>