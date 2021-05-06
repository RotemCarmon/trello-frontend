<template>
  <section class="add-item-container">
    <textarea
      type="text"
      v-model="txt"
      :placeholder="placeholder"
      ref="input"
    />
    <save-btn :txt="title" @close="$emit('close')" @save="save" ref="add" />
    <div class="dummy-el" ref="dummy"></div>
  </section>
</template>

<script>
import saveBtn from './save-btn';
export default {
  name: 'add-item',
  props: {
    placeholder: String,
    title: String,
    content: String,
  },
  data() {
    return {
      txt: '',
    };
  },
  methods: {
    save() {
      this.$emit('save', this.txt);
      this.txt = '';
    },
  },
  created() {
    if (this.content) this.txt = this.content;
  },
  mounted() {
    this.$refs.input.focus();
    this.$nextTick(() => {
      if (this.$refs.add._isMounted) {
        this.$refs.dummy.scrollIntoView(false);
      }
    });
  },
  components: {
    saveBtn,
  },
};
</script>

<style lang="scss" scoped>
.add-item-container {
  position: relative;

  .dummy-el {
    position: absolute;
    bottom: -8px;
  }
}
</style>