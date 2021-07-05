<template>
  <section class="card-preview-container" @click="openCard" :style="color">
    <label-list :labels="labels" />
    <div class="card-preview">
      {{ card.title }}
    </div>
    <div
      ref="symbols"
      class="card-preview-symbols flex wrap"
    >
      <div
        v-if="dueDate"
        class="due-date due-date-badge symbol"
        :style="dueDateStyle"
      >
        <font-awesome-icon class="symbol-icon" :icon="['fal', 'clock']" />
        <span>{{ dueDate }}</span>
        <!-- {{dueDateStyle}} -->
      </div>
      <div v-if="card.description" class="desc symbol">
        <font-awesome-icon :icon="['fal', 'align-justify']" />
      </div>
      <div v-if="commentsLength" class="comments symbol">
        <font-awesome-icon class="symbol-icon" :icon="['fal', 'comment']" />
        <span>{{ commentsLength }}</span>
      </div>
      <div v-if="attachLength" class="attch symbol">
        <font-awesome-icon class="symbol-icon" :icon="['fal', 'paperclip']" />
        <span>{{ attachLength }}</span>
      </div>
      <div
        v-if="card.checkLists && card.checkLists.length"
        class="todos symbol"
      >
        <font-awesome-icon
          class="symbol-icon"
          :icon="['fal', 'check-square']"
        />
        <span>{{ doneTodos }}</span>
      </div>
    </div>
    <div
      class="card-preview-members flex justify-end"
      v-if="card.members && card.members.length"
    >
      <member-avatar
        v-for="member in card.members"
        :member="member"
        :key="member._id"
      />
    </div>
    <font-awesome-icon
      @click="removeCard"
      class="remove-card-preview"
      :icon="['fal', 'trash-alt']"
    />
  </section>
</template>

<script>
import labelList from './details/label-list';
import dayjs from 'dayjs';
import memberAvatar from '../common/member-avatar';
export default {
  name: 'card-preview',
  props: {
    card: Object,
  },
  methods: {
    removeCard(ev) {
      ev.stopPropagation();
      this.$emit('removeCard', this.card._id);
    },
    openCard() {
      this.$emit('open', this.card._id);
    },
  },
  computed: {
    color() {
      return { backgroundColor: this.card.bgc || '#fff' };
    },
    labels() {
      const labels = this.$store.getters.getLabels;
      return labels.filter((l, idx) => this.card.labels.includes(idx));
    },
    dueDate() {
      if (!this.card.dueDate) return '';
      return dayjs(this.card.dueDate).format('MMM DD');
    },
    dueDateStyle() {
      if (this.card.isDone) {
        return { backgroundColor: '#61BD4F', color: 'white' };
      }
      const dueDateTimestamp = new Date(this.card.dueDate).getTime();
      if (Date.now() > dueDateTimestamp) {
        return { backgroundColor: '#ec9488', color: 'white' };
      } else return '';
    },
    commentsLength() {
      return this.card.comments?.length;
    },
    attachLength() {
      return this.card.attachments?.length;
    },
    doneTodos() {
      let doneTodos = 0;
      const todosLength = this.card.checkLists.reduce((count, list) => {
        doneTodos += list?.todos?.reduce((doneCount, todo) => {
          return doneCount + todo.isDone;
        }, 0);
        return count + list?.todos?.length;
      }, 0);
      return `${doneTodos}/${todosLength}`;
    },
  },
  components: {
    labelList,
    memberAvatar,
  },
};
</script>