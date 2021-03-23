<template>
  <li
    v-if="!isEdited"
    class="label-preview label-preview-layout flex align-center"
    :style="{ backgroundColor: label.color }"
    @click.stop="$emit('setActive', $vnode.key)"
  >
    {{ label.txt }}
    <span class="check-mark" v-if="label.isActive"
      ><font-awesome-icon :icon="['fal', 'check']" size="xs"
    /></span>
    <span @click.stop="toggleEdit" class="icon flex center-center"
      ><font-awesome-icon :icon="['fal', 'pencil']" size="xs"
    /></span>
  </li>
  <li v-else class="label-preview-layout flex">
    <input type="text" @click.stop="" v-model="txt" />
    <span class="save-label icon flex center-center">
      <font-awesome-icon @click.stop="saveLabel" :icon="['fal', 'check']" />
    </span>
  </li>
</template>

<script>
export default {
  name: 'label-menu-item',
  props: {
    label: Object,
  },
  data() {
    return {
      isEdited: false,
      txt: this.label.txt,
    };
  },
  methods: {
    toggleEdit() {
      this.isEdited = !this.isEdited;
    },
    saveLabel() {
      this.label.txt = this.txt;
      this.$emit('update');
      this.toggleEdit()
    },
  },
};
</script>

<style lang="scss" scoped>
.label-preview-layout {
  position: relative;
  width: 100%;
  height: 32px;
  border-radius: 3px;
  &:not(:last-child) {
    margin-bottom: 4px;
  }
}
.label-preview {
  color: #fff;
  line-height: 1.2;
  padding-inline-start: 8px;
  cursor: pointer;

  .check-mark {
    position: absolute;
    right: 5px;
    font-weight: 400;
    line-height: 1px;
  }
}
.icon {
  position: absolute;
  color: initial;
  right: -36px;
  font-weight: 400;
  line-height: 1px;
  z-index: 5;
  width: 32px;
  height: 32px;
  &:hover {
    background-color: rgba(65, 65, 65, 0.109);
  }
}
</style>
