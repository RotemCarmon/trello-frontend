<template>
  <div
    class="comment-add-container"
    :class="{ 'edit-comment': isEdit }"
  >
    <input
      type="text"
      placeholder="write a comment"
      v-model="txt"
      @click="isEdit = true"
    />
    <save-btn @save="save" @close="toggleEdit" v-if="isEdit" />
  </div>
</template>

<script>
import saveBtn from '@/cmps/common/save-btn.vue';
export default {
  name: 'comment-add',
  props: {
    comment: Object,
    isEditFromParent: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isEdit: false,
      txt: '',
    };
  },
  created() {
    this.isEdit = this.isEditFromParent;
    if (this.comment) {
      this.txt = this.comment.txt;
    }
  },
  methods: {
    save() {
      this.$emit('save', this.txt);
      this.txt = '';
      this.isEdit = false;
    },
    toggleEdit() {
      this.isEdit = !this.isEdit;
      this.$emit('toggleEdit', this.isEdit);
    },
  },
  components: {
    saveBtn,
  },
};
</script>

<style lang="scss" scoped>
.edit-comment {
  box-shadow: 0 4px 8px -2px rgba(9, 30, 66, 0.25),
    0 0 0 1px rgba(9, 30, 66, 0.08);
  background-color: #fff;
  input {
    border: none;
    outline: none;
  }
  .save-btn-container {
    padding-inline-start: 8px;
    padding-block-end: 6px;
  }
}
</style>