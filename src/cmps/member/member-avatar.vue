<template>
  <section v-if="member" class="member-avatar-container">
    <img :src="member.imgUrl" />
  </section>
</template>

<script>
export default {
  name: 'member-avatar',
  props: {
    member: Object,
  },
  created() {
  },
};
</script>

<style lang="scss" scoped>
.member-avatar-container {
  height: 35px;
  width: 35px;
  img {
    border-radius: 50%;
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
}
</style>