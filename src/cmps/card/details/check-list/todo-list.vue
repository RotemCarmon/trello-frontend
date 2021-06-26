<template>
  <section class="todo-list-container">
    <header class="flex space-between align-center left-gap">
      <h3 class="details-section-header">{{ list.title }}</h3>
      <common-card-btn
        @click.native="$emit('remove', list.id)"
        title="Delete"
      />
    </header>
    <check-progress-bar :todos="list.todos" />
    <todo-preview
      v-for="todo in list.todos"
      :todo="todo"
      :key="todo.id"
      @updateTodo="updateTodos"
      @remove="removeTodo"
    />
    <section class="add-todo-container left-gap">
      <add-item
        v-if="isAdding"
        @close="toggleAddTodo"
        @save="addTodo"
        title="Add"
        placeholder="Add an item"
      />
      <common-card-btn
        v-else
        @click.native="toggleAddTodo"
        title="Add an item"
      />
    </section>
  </section>
</template>

<script>
import todoPreview from './todo-preview';
import checkProgressBar from './check-progress-bar';
import commonCardBtn from '../../../common/common-card-btn';
import addItem from '../../../common/add-item';
import { cardService } from '@/services/card-service.js';
export default {
  name: 'todo-list',
  props: {
    list: {
      type: Object,
    },
  },
  data() {
    return {
      isAdding: false,
      newTodoTxt: '',
      newTodo: cardService.getEmptyTodo(),
    };
  },
  methods: {
    removeTodo(todoId) {
      const todos = this.list.todos;
      const idx = todos.findIndex((t) => t.id === todoId);
      if (idx === -1) return console.log("Can't remove todo");
      todos.splice(idx, 1);
      this.$emit('update', 'Removed todo');
    },
    updateTodos({ todo, activity }) {
      const todos = this.list.todos;
      const idx = todos.findIndex((t) => t.id === todo.id);
      if (idx === -1) return console.log("Can't update todos");
      todos.splice(idx, 1, todo);
      this.$emit('update', activity);
    },
    addTodo(txt) {
      const todos = this.list.todos;
      this.newTodo.txt = txt;
      todos.push(this.newTodo);
      this.newTodo = cardService.getEmptyTodo();
      this.$emit('update', 'Added Todo');
      this.toggleAddTodo();
    },
    toggleAddTodo() {
      this.isAdding = !this.isAdding;
    },
  },
  components: {
    todoPreview,
    checkProgressBar,
    commonCardBtn,
    addItem,
  },
};
</script>

<style lang="scss">
.todo-list-container {
  margin: 0 0 24px;

  header {
    padding: 8px 0;
    margin-bottom: 4px;
  }
}
.add-todo-container {
  margin-top: 4px;
}
</style>