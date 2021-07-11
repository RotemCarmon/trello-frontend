<template>
  <section class="comment-preview-container flex align-center">
    <memberAvatar :member="comment.byMember" />
    <div class="comment-preview">
      <strong>
        {{ comment.byMember.name }}
      </strong>
      <span class="createdAt">{{ date }}</span>
      <comment-add
        v-if="isEdit"
        @toggleEdit="toggleEdit"
        @save="save"
        :comment="comment"
        :isEditFromParent="isEdit"
      />
      <div v-else class="comment">
        <div class="comment-info">
          <p class="badge">{{ comment.txt }}</p>
        </div>
        <div class="comment-options">
          <button class="secondary-btn" @click="$emit('remove', comment.id)">
            Delete
          </button>
          |
          <button
            class="secondary-btn"
            @click="toggleEdit"
            @toggleEdit="toggleEdit"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import memberAvatar from '@/cmps/common/member-avatar';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import commentAdd from './comment-add.vue';
export default {
  name: 'comment-preview',
  props: {
    comment: Object,
  },
  data() {
    return {
      isEdit: false,
    };
  },
  methods: {
    toggleEdit() {
      this.isEdit = !this.isEdit;
    },
    save(txt) {
      this.toggleEdit();
      const copyComment = JSON.parse(JSON.stringify(this.comment));
      copyComment.txt = txt 
      this.$emit('save', copyComment);
    },
  },
  computed: {
    date() {
      dayjs.extend(relativeTime);
      return dayjs(this.comment.createdAt).fromNow();
    },
  },
  components: {
    memberAvatar,
    commentAdd,
  },
};
</script>

<style lang="scss" scoped>
.comment-preview-container {
  margin-bottom: 5px;
  padding: 5px;
  padding-inline-start: 3px;
  .comment-preview {
    width: 100%;
  }
  .comment-info {
    max-width: 237px;
  }
  .member-avatar {
    margin-inline-end: 6px;
    align-self: start;
  }
  .badge {
    padding: 6px;
    background-color: white;
    border: 1px solid #091e4221;
    max-width: fit-content;
  }
  .createdAt {
    font-size: 12px;
  }
}
</style>