<template>
  <section class="activity-preview-container">
    <strong>
      {{ activity.name }}
    </strong>
    <p class="description">
      {{ activity.description }}
    </p>
    <p class="createdAt">{{date}}</p>
  </section>
</template>

<script>
export default {
  props: {
    activity: Object,
  },
  computed: {
    date() {
      return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(this.activity.createdAt)
    },
  },
};
</script>

<style lang="scss" scoped>
.activity-preview-container {
  margin-bottom: 5px;
  padding: 5px;
  padding-inline-start: 0;
  p.description {
    display: inline-block;
  }
  p.createdAt{
    font-size: 12px;
  }
}
</style>