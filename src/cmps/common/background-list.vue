<template>
  <section class="background-list-container">
    <h3 class="bg-type-header menu-header text-center">{{ bgType }}</h3>
    <!-- <span @click="$emit('close')">">"</span> -->
    <button
      @click="$emit('close')"
      class="back-menu-btn hover-bg-btn flex center-center sqare-btn"
    >
      <font-awesome-icon :icon="['fal', 'chevron-left']" />
    </button>
    <div
      v-if="bgType === 'colors'"
      class="colors-container flex wrap space-between"
    >
      <div
        v-for="(color, idx) in colors"
        :key="idx"
        class="tile-container half-width"
        :style="{ backgroundColor: color }"
        @click="setBgColor(color)"
      ></div>
    </div>
    <div
      v-else-if="bgType === 'photos'"
      class="photos-container flex wrap space-between"
    >
      <div
        v-for="img in 20"
        :key="img"
        class="tile-container half-width img-placeholder"
        :style="{ 'background-image': 'url(' + getImage(img) + ')' }"
        @click="setBgImg(img)"
      ></div>
      <!-- :style="{backgroundImage: url(`../../assets/img/bg-imgs/${idx + 1 < 10 ? '0' + idx : idx}.jpg`)}" -->
    </div>
  </section>
</template>

<script>
export default {
  name: 'background-list',
  props: {
    bgType: String,
  },
  data() {
    return {
      // image: require('../../assets/img/bg-imgs/01.jpg'),
      colors: [
        '#0079bf',
        '#d29034',
        '#519839',
        '#b04632',
        '#89609e',
        '#4bbf6b',
        '#00aecc',
        '#838c91',
      ],
    };
  },
  methods: {
    getImage(idx) {
      idx = idx + '';
      return require(`../../assets/img/bg-imgs/thumbnail/${idx.padStart(
        2,
        '0'
      )}.jpg`);
    },
    setBgColor(color) {
      this.$emit('set', { content: color, type: 'bgc' });
    },
    setBgImg(imgUrl) {
      this.$emit('set', { content: imgUrl, type: 'imgUrl' });
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped >
.background-list-container {
  position: relative;
  overflow-y: auto;
  height: 100%;
  padding-inline-end: 6px;
}
.half-width {
  width: calc(50% - 4px);
}
.img-placeholder {
  background-color: #d8d8d8;
}
</style>