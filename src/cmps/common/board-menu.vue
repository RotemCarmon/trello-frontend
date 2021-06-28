<template>
  <section class="board-menu-container flex column">
    <div class="menu-header text-center">
      <h3>Menu</h3>
      <button
        @click="close"
        class="close-menu-btn hover-bg-btn flex center-center sqare-btn"
      >
        <font-awesome-icon :icon="['fal', 'times']" />
      </button>
    </div>
    <div class="board-menu-controllers flex column">
      <button @click="removeBoard" class="board-menu-sub">
        <font-awesome-icon class="icon" :icon="['fal', 'trash-alt']" />
        Delete Board
      </button>
      <button class="board-menu-sub" @click="toggleBgMenu">
        <font-awesome-icon class="icon" :icon="['fal', 'paint-roller']" />
        Change Background
      </button>
    </div>
    <template v-if="isShowBgMenu">
      <board-bg-menu v-if="!bgContentType" @setBgContent="setBgContent" />
      <background-list
        v-else
        :bgType="bgContentType"
        @set="setBg"
        @close="closeBgList"
      />
    </template>
    <template v-else>
      <h3 class="board-menu-sub">
        <font-awesome-icon class="icon" :icon="['fal', 'list']" />Activity Log
      </h3>
      <div class="activities-container custom-scroll">
        <activity-list :activities="activities" />
      </div>
    </template>
  </section>
</template> 

<script>
import activityList from '../card/details/activity/activity-list';
import boardBgMenu from './board-background-menu';
import backgroundList from './background-list';
export default {
  name: 'board-menu',
  props: {
    activities: Array,
  },
  data() {
    return {
      isShowBgMenu: false,
      bgContentType: null,
    };
  },
  computed: {
    bgType() {
      return this.bgContentType;
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    closeBgList() {
      this.bgContentType = null;
    },
    removeBoard() {
      // TODO: use user-msg
      const isConfirmed = confirm(
        "Are you sure you want to delete the board?\nThis action can't be undone"
      );
      if (!isConfirmed) return;
      console.log('Deleting!!!!');
      this.$emit('remove');
    },
    setBgContent(type) {
      console.log('BG Type:', type);
      this.bgContentType = type;
    },
    setBg({ content, type }) {
      console.log('type:', type);
      console.log('content:', content);
      this.$emit('setBg', { content, type });
    },
    toggleBgMenu() {
      this.bgContentType = null;
      this.isShowBgMenu = !this.isShowBgMenu;
    },
  },
  components: {
    activityList,
    boardBgMenu,
    backgroundList,
  },
};
</script>

<style lang="scss" scoped >
</style>