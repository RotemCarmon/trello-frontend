<template>
  <section class="borad-list-container flex">
    <router-link
      :to="`board/${board._id}`"
      class="board-preview"
      v-for="board in boards"
      :key="board._id"
      :style="getBgStyle(board)"
    >
      <span>
        {{ board.title }}
      </span>
    </router-link>
    <div
      @click="createNewBoard"
      class="create-new-board board-preview flex center-center"
    >
      <font-awesome-icon :icon="['fal', 'plus']" size="2x" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'board-list',
  data() {
    return {
      boards: [],
    };
  },
  async created() {
    this.boards = await this.$store.dispatch('getBoards');
  },
  computed: {},
  methods: {
    async createNewBoard() {
      const newBoard = await this.$store.dispatch('addBoard');
      this.$router.push(`board/${newBoard._id}`);
    },
    getBgStyle(board) {
      if (!board) return { backgroundColor: '#e3a1ff' };
      if (board.bgType === 'imgUrl') {
        const imgUrl = board.imgUrl.toString().padStart(2, '0');
        return {
          backgroundImage:
            'url(' +
            require(`../assets/img/bg-imgs/original/${imgUrl}.jpg`) +
            ')',
        };
      } else {
        return { backgroundColor: board.bgc };
      }
    },
  },
};
</script>
