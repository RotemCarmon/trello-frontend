<template>
  <section class="activity-list">
    <activity-preview
      v-for="(activity) in activities"
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