<template>
  <section v-if="board" class="board-details-container" :style="bgStyle">
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
          :data-id="list._id"
          :key="list._id"
          @update="updateBoard"
          @moveCard="moveCard"
        />
      </draggable>
      <add-list @add="addList" />
    </main>
    <board-menu
      :class="{ 'open-menu': isMenuOpen }"
      :activities="board.activities"
      @close="toggleMenu"
      @remove="removeBoard"
      @setBg="setBg"
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
    bgStyle() {
      if (this.board.bgType === 'bgc') {
        return { backgroundColor: this.board.bgc };
      } else if (this.board.bgType === 'imgUrl') {
        const imgUrl = this.board.imgUrl.toString().padStart(2, '0');
        return {
          backgroundImage:
            'url(' +
            require(`../assets/img/bg-imgs/original/${imgUrl}.jpg`) +
            ')',
        };
      }
      return {};
      // return this.board.bgc || '#fff';
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
      this.$router.push('/board-list');
    },
    addList(listTitle) {
      console.log('List Title', listTitle);
      this.$store.dispatch('addList', listTitle);
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    setBg({ content, type }) {
      this.board[type] = content;
      this.board.bgType = type;
      this.updateBoard();
    },
    getImage(idx) {
      idx = idx + '';
      return require(`../assets/img/bg-imgs/thumbnail/${idx.padStart(
        2,
        '0'
      )}.jpg`);
    },
    moveCard(payload) {
      this.$store.dispatch('moveCard', payload);
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
