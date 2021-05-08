<template>
  <popup-menu @close="close" class="check-list-menu-container">
    <template v-slot:header>
      <h3>Add Checklist</h3>
    </template>
    <template v-slot:main>
      <h5>Title</h5>
      <input type="text" v-model="title" @keyup.enter="save" ref="input" />
      <save-btn @save="save" :withClose="false" txt="Add" />
    </template>
  </popup-menu>
</template>

<script>
import saveBtn from '../../../common/save-btn';
import popupMenu from '../../../common/popup-menu';
export default {
  name: 'check-list-menu',
  data() {
    return {
      title: '',
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    save() {
      if (!this.title) return console.log('Must have a title'); // TODO: Show warning user msg
      this.$emit('add', this.title);
      this.title = '';
      this.close();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.input.focus();
    });
  },
  components: {
    popupMenu,
    saveBtn,
  },
};
</script>