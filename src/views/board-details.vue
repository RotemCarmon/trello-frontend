<template>
  <section
    v-if="board"
    class="board-details-container"
    :style="{ backgroundColor: bgc }"
  >
    <board-header @openMenu="toggleMenu" />
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
    <board-menu
      :class="{ 'open-menu': isMenuOpen }"
      :activities="board.activities"
      @close="toggleMenu"
      @remove="removeBoard"
    />
    <transition name="fade">
      <router-view />
    </transition>
  </section>
</template>

<script>
import cardList from '../cmps/card/card-list';
import addList from '../cmps/list/add-list';
import boardHeader from '../cmps/board-header';
import boardMenu from '../cmps/common/board-menu';
import draggable from 'vuedraggable';
export default {
  name: 'board-details',
  created() {
    this.loadBoard();
  },
  data() {
    return {
      isMenuOpen: false,
    };
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
    removeBoard() {
      this.$store.dispatch('removeBoard', this.board._id);
      this.$router.push('/board-list')
    },
    addList(listTitle) {
      console.log('List Title', listTitle);
      this.$store.dispatch('addList', listTitle);
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
  watch: {
    '$route.params.boardId'() {
      this.loadBoard();
    },
  },
  components: {
    cardList,
    boardHeader,
    addList,
    draggable,
    boardMenu,
  },
};
</script>
