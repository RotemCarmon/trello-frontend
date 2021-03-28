<template>
  <section class="todo-preview-container flex sapce-between align-center">
    <!-- <input type="checkbox" :checked="isActive" @change="toggleTodoActive" /> -->
    <input type="checkbox" v-model="todo.isDone" @change="updateTodo" class="check-box" />
    <div class="todo-preview">
      <span :class="{ done: todo.isDone }">{{ todo.txt }}</span>
    </div>
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
      this.$emit('updateTodo', this.todo);
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-preview-container {
  .todo-preview {
    position: relative;
    padding: 8px 0 8px 40px;
  }
  .check-box {
    position: absolute;
    z-index: 10;
    cursor: pointer;
  }
  &:hover {
    background-color: rgba(65, 65, 65, 0.109);
  }
}
.done {
  text-decoration: line-through;
}
</style>