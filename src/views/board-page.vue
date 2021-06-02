<template>
  <section
    v-if="board"
    class="board-page-container"
    :style="{ backgroundColor: bgc }"
  >
    <board-header />
    <main class="board-container flex">
      <draggable
        class="flex"
        v-model="board.lists"
        animation="300"
        ghostClass="ghost"
        chosenClass="chosen"
        dragClass="drag"
        forceFallback="true"
        @end="updateBoard"
      >
        <card-list
          v-for="list in board.lists"
          :list="list"
          :key="list._id"
          @update="updateBoard"
        />
      </draggable>
      <add-list @add="addList" />
    </main>
    <transition name="fade">
      <router-view />
    </transition>
  </section>
</template>

<script>
import cardList from '../cmps/card/card-list';
import addList from '../cmps/list/add-list';
import boardHeader from '../cmps/board-header';
import draggable from 'vuedraggable';
export default {
  name: 'board-page',
  created() {
    console.log('board page!');
    this.loadBoard();
  },
  computed: {
    board() {
      return this.$store.getters.getCurrBoard;
    },
    bgc() {
      return this.board.bgc || '#fff';
    },
  },
  methods: {
    loadBoard() {
      const { boardId } = this.$route.params;
      this.$store.dispatch('getBoard', boardId);
    },
    updateBoard() {
      this.$store.dispatch('updateBoard');
    },
    addList(listTitle) {
      console.log('List Title', listTitle);
      this.$store.dispatch('addList', listTitle);
    },
  },
  components: {
    cardList,
    boardHeader,
    addList,
    draggable,
  },
};
</script>
