<template>
  <section class="borad-list-container flex">
    <router-link
      :to="`board/${board._id}`"
      class="board-preview"
      v-for="board in boards"
      :key="board._id"
      >{{ board.title }}</router-link
    >
    <div
      @click="createNewBoard"
      class="create-new-board board-preview flex center-center"
    >
      +
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      boards: [],
    };
  },
  async created() {
    this.boards = await this.$store.dispatch('getBoards');
  },
  methods: {
    async createNewBoard() {
      const newBoard = await this.$store.dispatch('addBoard');
      this.$router.push(`board/${newBoard._id}`)
    },
  },
};
</script>
<style lang="scss" scoped>
.borad-list-container {
  padding: 8px;
}
.board-preview {
  cursor: pointer;
  padding: 16px;
  box-shadow: 0 0 3px gray;
  &:hover {
    background-color: rgba(65, 65, 65, 0.109);
  }
  margin: 8px;
}
.create-new-board {
  font-size: 1.5em;
  line-height: 1;
  font-weight: 600;
}
</style>
