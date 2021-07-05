<template>
  <main class="main-app main-app-container" :style="bgStyle">
    <main-header />
    <router-view />
  </main>
</template>
<script>
import mainHeader from './cmps/common/main-header';
export default {
  computed: {
    board() {
      return this.$store.getters.getCurrBoard;
    },
    bgStyle() {
      if (!this.board) return { backgroundColor: '#fceddd' };
      if (this.board.bgType === 'bgc') {
        return { backgroundColor: this.board.bgc };
      } else if (this.board.bgType === 'imgUrl') {
        const imgUrl = this.board.imgUrl.toString().padStart(2, '0');
        return {
          backgroundImage:
            'url(' +
            require(`./assets/img/bg-imgs/original/${imgUrl}.jpg`) +
            ')',
          backgroundSize: 'cover'
        };
      }
      return {};
      // return this.board.bgc || '#fff';
    },
  },
  components: {
    mainHeader,
  },
};
</script>
