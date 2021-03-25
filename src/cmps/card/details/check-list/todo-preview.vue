<template>
  <section class="todo-preview-container">
    <!-- <input type="checkbox" :checked="isActive" @change="toggleTodoActive" /> -->
    <input type="checkbox" v-model="todo.isDone" @change="updateTodo" />
    <span :class="{done: todo.isDone}" >{{ todo.txt }}</span>
    <!-- update todo txt -->
  </section>
</template>

<script>
export default {
  name: 'todo-preview',
  props: {
    todo: {
      type: Object,
    },
  },
  methods: {
    updateTodo() {
      this.$emit('updateTodo', this.todo)
    },
  }
};
</script>

<style lang="scss" scoped>
.done {
  text-decoration: line-through;
}
</style>