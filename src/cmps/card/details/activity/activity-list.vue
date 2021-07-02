<template>
  <section class="activity-list">
    <h3 class="left-gap" v-if="!activities || !activities.length">No Activities</h3>
    <activity-preview
      v-for="activity in activities"
      :key="activity._id"
      :activity="activity"
    />
  </section>
</template>

<script>
import activityPreview from './activity-preview';
export default {
  name: 'activity-list',
  props: {
    activities: Array,
  },
  components: {
    activityPreview,
  },
};
</script>