<template>
  <section
    class="todo-preview-container flex space-between align-center"
    :class="{ edit: isEdit }"
  >
    <!-- <input type="checkbox" :checked="isActive" @change="toggleTodoActive" /> -->
    <input
      type="checkbox"
      v-model="todo.isDone"
      @change="updateTodo(`Set todo as ${todo.isDone? 'done':'undone'}`)"
      class="card-check-box"
    />
    <div class="todo-preview">
      <add-item
        v-if="isEdit"
        @save="editTodo"
        @close="toggleEdit"
        :content="todo.txt"
      />
      <span v-else @click="toggleEdit" :class="{ done: todo.isDone }">{{
        todo.txt
      }}</span>
    </div>
    <!-- update todo txt -->
    <button
      v-if="!isEdit"
      @click="removeTodo"
      class="remove-todo flex center-center"
    >
      <font-awesome-icon :icon="['fal', 'times']" />
    </button>
  </section>
</template>

<script>
import addItem from '../../../common/add-item';
export default {
  name: 'todo-preview',
  props: {
    todo: {
      type: Object,
    },
  },
  data() {
    return {
      isEdit: false,
    };
  },
  methods: {
    updateTodo(activity) {
      this.$emit('updateTodo', { todo: this.todo, activity });
    },
    removeTodo() {
      this.$emit('remove', this.todo.id);
    },
    editTodo(txt) {
      this.todo.txt = txt;
      this.updateTodo('Edited Todo');
      this.toggleEdit();
    },
    toggleEdit() {
      this.isEdit = !this.isEdit;
    },
  },
  components: {
    addItem,
  },
};
</script>

<style lang="scss" scoped>
.todo-preview-container {
  .todo-preview {
    position: relative;
    padding: 8px 0 8px 40px;
  }
  .remove-todo {
    display: none;
    margin-inline-end: 5px;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    padding: 2px;
    &:hover {
      background-color: rgba(56, 56, 56, 0.1);
    }
  }
  &:hover {
    background-color: rgba(65, 65, 65, 0.109);
    .remove-todo {
      display: flex;
    }
  }
  &.edit {
    display: block;
  }
}
.done {
  text-decoration: line-through;
}
</style>