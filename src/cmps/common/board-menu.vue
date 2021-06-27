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
      <button class="board-menu-sub">
        <font-awesome-icon class="icon" :icon="['fal', 'paint-roller']" />
        Change Background
      </button>
    </div>

    <h3 class="board-menu-sub">
      <font-awesome-icon class="icon" :icon="['fal', 'list']" />Activity Log
    </h3>
    <div class="activities-container custom-scroll">
      <activity-list :activities="activities" />
    </div>
  </section>
</template> 

<script>
import activityList from '../card/details/activity/activity-list';
export default {
  name: 'board-menu',
  props: {
    activities: Array,
  },
  // computed: {
  //   // Can get it as a prop
  //   activities() {
  //     return this.$store.getters.getActivities;
  //   },
  // },
  methods: {
    close() {
      this.$emit('close');
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
  },
  components: {
    activityList,
  },
};
</script>

<style lang="scss" scoped >
</style>