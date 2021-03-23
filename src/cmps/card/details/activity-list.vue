<template>
  <section class="activity-list">
    <activity-preview
      v-for="(activity, idx) in activities"
      :key="idx"
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