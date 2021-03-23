<template>
  <section class="details-section details-section-description">
    <h3 class="details-section-header">Description</h3>
    <div v-if="!editableDescription || isEditDesc" class="save-description">
      <resizeable-input v-model="editableDescription" />
      <save-btn @save="updateDesc" @close="closeDesc" />
    </div>
    <p @click="isEditDesc = true" v-else>{{ editableDescription }}</p>
  </section>
</template>

<script>
import resizeableInput from '../../common/resizeable-input';
import saveBtn from '../../common/save-btn';
export default {
  name: 'card-description',
  props: {
    description: String
  },
  data() {
    return {
      isEditDesc: false,
      editableDescription: this.description
    }
  },
  methods: {
    updateDesc() {
      this.closeDesc()
      console.log('Desc', this.editableDescription);
      this.$emit('save', this.editableDescription)
    },
    closeDesc() {
      this.isEditDesc = false
    }
  },
  components: {
    resizeableInput,
    saveBtn
  }
};
</script>

<style>
</style>