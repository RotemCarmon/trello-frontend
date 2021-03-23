<template>
  <popup-menu @close="close" class="due-date-menu-container">
    <template v-slot:header>
      <h3>Due Date</h3>
    </template>
    <template v-slot:main>
      <date-picker v-model="date" :inline="true" />
      <button @click="selectDate" class="save-btn flex center-center">
        Save
      </button>
    </template>
  </popup-menu>
</template>

<script>
import popupMenu from '../../../common/popup-menu';
import datePicker from 'vuejs-datepicker';
export default {
  name: 'due-date-menu',
  data() {
    return {
      date: '',
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    selectDate() {
      console.log(this.date);
      this.close();
    },
  },
  components: {
    datePicker,
    popupMenu,
  },
};
</script>