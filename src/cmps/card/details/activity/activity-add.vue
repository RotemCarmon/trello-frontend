<template>
  <div
    class="activity-add-container left-gap"
    :class="{ 'edit-activity': isEdit }"
  >
    <input type="text" placeholder="write a comment" @click="isEdit = true" />
    <save-btn @save="save" @close="toggleEdit" v-if="isEdit" />
  </div>
</template>

<script>
import saveBtn from '../../../common/save-btn.vue';
export default {
  name: 'activity-add',
  data() {
    return {
      isEdit: false,
    };
  },
  methods: {
    save() {
      // save
    },
    toggleEdit() {
      this.isEdit = !this.isEdit;
    },
  },
  components: {
    saveBtn,
  },
};
</script>

<style lang="scss" scoped>
.edit-activity {
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