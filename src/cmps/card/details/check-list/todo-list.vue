<template>
  <section class="todo-list-container">
    <header class="flex space-between">
    <h3 class="details-section-header">{{ list.title }}</h3>
    <common-card-btn title="Delete"/>
    </header>
    <check-progress-bar :todos="list.todos" />
    <todo-preview
      v-for="todo in list.todos"
      :todo="todo"
      :key="todo.id"
      @updateTodo="updateTodos"
    />
    <common-card-btn title="Add an item"/>
  </section>
</template>

<script>
import todoPreview from './todo-preview';
import checkProgressBar from './check-progress-bar';
import commonCardBtn from '../../../common/common-card-btn';
export default {
  name: 'todo-list',
  props: {
    list: {
      type: Object,
    },
  },
  methods: {
    updateTodos(todo) {
      const todos = this.list.todos;
      const idx = todos.findIndex((t) => t.id === todo.id);
      if (idx === -1) return console.log("Can't update todos");
      todos.splice(idx, 1, todo);
      this.$emit('update', this.list);
    },
  },
  components: {
    todoPreview,
    checkProgressBar,
    commonCardBtn 
  },
};
</script>

<style>
.todo-list-container {
  margin: 0 0 24px;
}
</style>