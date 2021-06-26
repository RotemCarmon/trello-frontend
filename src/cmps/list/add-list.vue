<template>
  <!-- <section class="add-list-container" :class="{ 'list-basic': isAddingList }"> -->
  <section class="add-list-container list-basic" :class="{ 'is-idle': !isAddingList }">
      <div class="add-text">
        <input
          type="text"
          v-if="isAddingList"
          v-model="newListTitle"
          placeholder="Enter the title for this list"
        />
      </div>

      <div class="add-card-container">
        <button
          v-if="!isAddingList"
          @click="isAddingList = true"
          class="open-add-list-btn list-btn"
        >
          + Add another list
        </button>
        <div v-else class="save-card flex space-between">
          <save-btn @save="addList" @close="closeAddList" />
        </div>
      </div>
  </section>
</template>

<script>
import saveBtn from '../common/save-btn';
export default {
  name: 'add-list',
  data() {
    return {
      isAddingList: false,
      newListTitle: '',
    };
  },
  methods: {
    addList() {
      this.$emit('add', this.newListTitle);
      this.closeAddList();
    },
    closeAddList() {
      this.isAddingList = false;
      this.newListTitle = '';
    },
  },
  components: {
    saveBtn,
  },
};
</script>

<style>
.is-idle {
  background-color: #ffffff3d !important;
}
</style>