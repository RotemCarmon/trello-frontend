<template>
  <popup-menu @close="$emit('close')" class="members-menu-container">
    <template v-slot:header>
      <h3>Background</h3>
    </template>
    <template v-slot:main>
      <section class="background-menu">
        <div
          v-for="color in colors"
          class="color-circle"
          :key="color"
          :style="{ backgroundColor: color }"
          @click="setBgc(color)"
        >
          <font-awesome-icon
            v-if="bgc === color"
            class="mark-sign"
            :icon="['fal', 'check']"
          />
        </div>
      </section>
      <common-card-btn
        @click.native="setBgc(null)"
        class="remove-coor-btn text-center margin-center"
        title="Remove Color"
      />
    </template>
  </popup-menu>
</template>

<script>
import popupMenu from '../../../common/popup-menu';
import commonCardBtn from '../../../common/common-card-btn';
export default {
  name: 'background-menu',
  props: {
    bgc: String,
  },
  data() {
    return {
      colors: [
        '#e0ace5',
        '#75d8c3',
        '#b8b8eb',
        '#9ca3ea',
        '#ab98b1',
        '#d388a0',
        '#f4a45d',
        '#f6d79b',
      ],
    };
  },
  methods: {
    setBgc(color) {
      if (color && color === this.bgc) color = null;
      this.$emit('set', color);
    },
  },
  components: {
    popupMenu,
    commonCardBtn,
  },
};
</script>

<style>
.background-menu {
  display: flex;
  flex-wrap: wrap;
  max-width: 200px;
  border-bottom: 1px solid #091e4221;
}
.color-circle {
  position: relative;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  margin: 6px;
}
.mark-sign {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}
.remove-coor-btn {
  margin-top: 6px;
}
</style>