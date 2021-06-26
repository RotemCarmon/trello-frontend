<template>
  <section
    class="details-section details-section-description left-gap"
  >
    <h3 class="details-section-header">Description</h3>
    <div v-if="!descToEdit || isEdit" class="save-description">
      <resizeable-input v-model="descToEdit" />
      <save-btn @save="updateDesc" @close="toggleEdit" />
    </div>
    <p @click="toggleEdit" v-else>{{ descToEdit }}</p>
  </section>
</template>

<script>
import resizeableInput from '../../common/resizeable-input';
import saveBtn from '../../common/save-btn';
export default {
  name: 'card-description',
  props: {
    description: String,
  },
  data() {
    return {
      isEdit: false,
      descToEdit: this.description,
    };
  },
  methods: {
    updateDesc() {
      this.toggleEdit();
      console.log('Desc', this.descToEdit);
      this.$emit('save', this.descToEdit);
    },
    toggleEdit() {
      this.isEdit = !this.isEdit;
    },
  },
  components: {
    resizeableInput,
    saveBtn,
  },
};
</script>

<style>
</style>