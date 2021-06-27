<template>
  <section class="board-background-menu flex space-between">
    <div
      class="board-backgrounds-section-tile"
      @click="setContentType('photos')"
    >
      <div class="tile-container photos-img"></div>
      <div class="title">Photos</div>
    </div>
    <div
      class="board-backgrounds-section-tile"
      @click="setContentType('colors')"
    >
      <div class="tile-container colors-img"></div>
      <div class="title">Colors</div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      colorsImg: require('../../assets/img/colors.jpg'),
      photosImg: require('../../assets/img/photos-thumbnail.jpg'),
    };
  },
  methods: {
    setContentType(type) {
      this.$emit('setBgContent', type);
    },
  },
};
</script>

<style lang="scss" scoped >
.board-background-menu {
  width: 100%;
  padding-top: 6px;
}
.board-backgrounds-section-tile {
  width: calc(50% - 4px);
  text-align: center;
  cursor: pointer;
  .title {
    font-size: 0.8em;
  }
  & .photos-img {
    background-image: url('../../assets/img/photos-thumbnail.jpg');
  }
  & .colors-img {
    background-image: url('../../assets/img/colors.jpg');
  }
}
// .tile-container {
//   height: 96px;
//   background-size: cover;
//   border-radius: 0.8em;
//   margin-bottom: 6px;
//   &:hover {
//     opacity: 0.7;
//   }
//   &:first-child {
//     margin-inline-end: 6px;
//   }
// }
</style>