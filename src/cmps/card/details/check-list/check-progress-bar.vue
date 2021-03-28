<template>
  <section class="check-progress-bar-container flex align-center">
    <span> {{ donePresent.toFixed() }}% </span>
    <div class="progress-bar left-gap">
      <div :style="{ width: donePresent + '%' }" class="currnet-progress"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'check-progress-bar',
  props: {
    todos: {
      type: Array,
    },
  },
  computed: {
    donePresent() {
      if (this.todos.length === 0) return 0;
      const count = this.todos.reduce((count, todo) => {
        if (todo.isDone) count++;
        return count;
      }, 0);
      return (count / this.todos.length) * 100;
    },
  },
};
</script>
<style lang="scss" scoped>
.check-progress-bar-container {

  span {
    font-size: 11px;
    position: absolute;
  }
  .progress-bar {
    width: 100%;
  height: 8px;
  border-radius: 4px;
  background-color: #091e4214;
  position: relative;
  overflow: hidden;
  // margin-left: 30px;
  // background-color: blue;
}
.currnet-progress {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: #5ba4cf;
  transition-property: width, background-color;
  transition-duration: 0.14s;
  transition-timing-function: ease-in;
  }
}
</style>