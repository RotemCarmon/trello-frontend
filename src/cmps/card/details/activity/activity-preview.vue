<template>
  <section class="activity-preview-container flex align-center">
    <memberAvatar :member="activity.byMember" />
    <div class="activity-preview">
      <div class="activity-info">
        <strong>
          {{ activity.byMember.name }}
        </strong>
        <span>{{ activity.txt }}</span>

        <span v-if="activity.type === 'card' && activity.card">
          in card
          <span class="card-name">
            {{ activity.card.title }}
          </span>
        </span>
        <span v-if="activity.type === 'list' && activity.list">
          in list
          <span class="list-name">
            {{ activity.list.title }}
          </span>
        </span>
      </div>
      <p class="createdAt">{{ date }}</p>
    </div>
  </section>
</template>

<script>
import memberAvatar from '../../../common/member-avatar';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
export default {
  props: {
    activity: Object,
  },
  computed: {
    date() {
      dayjs.extend(relativeTime);
      return dayjs(this.activity.createdAt).fromNow();
    },
  },
  components: {
    memberAvatar,
  },
};
</script>

<style lang="scss" scoped>
.activity-preview-container {
  margin-bottom: 5px;
  padding: 5px;
  padding-inline-start: 3px;
  .activity-info {
    max-width: 237px;
  }
  .member-avatar {
    margin-inline-end: 6px;
    align-self: start;
  }

  .card-name,
  .list-name {
    text-decoration: underline;
  }
  .createdAt {
    font-size: 12px;
  }
}
</style>