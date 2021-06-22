<template>
  <popup-menu @close="close" class="due-date-menu-container">
    <template v-slot:header>
      <h3>Due Date</h3>
    </template>
    <template v-slot:main>
      <date-picker v-model="date" :inline="true" :use12h="true" :show-second="false" type="datetime" />
      <save-btn @save="selectDate" :withClose="false" />
    </template>
  </popup-menu>
</template>

<script>
import saveBtn from '../../../common/save-btn';
import popupMenu from '../../../common/popup-menu';
// import datePicker from 'vuejs-datepicker';
import datePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

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
      this.$emit('setDate', this.date);
      this.close();
    },
  },
  components: {
    datePicker,
    popupMenu,
    saveBtn,
  },
};
</script>

<style lang="scss">
.vdp-datepicker__calendar {
  border: none;
}
</style>