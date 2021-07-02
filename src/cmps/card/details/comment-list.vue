<template>
  <section class="comment-list">
    <h3 class="left-gap" v-if="!comments || !comments.length">No Comments</h3>
    <comment-preview
      v-for="comment in comments"
      :key="comment._id"
      :comment="comment"
      @remove="remove"
      @save="save"
    />
    <!-- @remove="$emit('remove')" -->
  </section>
</template>

<script>
import commentPreview from './comment-preview';
export default {
  name: 'comment-list',
  props: {
    comments: Array,
  },
  methods: {
    remove(commentId) {
      this.$emit('remove', commentId);
    },
    save(comment) {
      this.$emit('save', comment);
    },
  },
  components: {
    commentPreview,
  },
};
</script>

<style>
</style>