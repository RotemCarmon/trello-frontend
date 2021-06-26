<template>
  <div v-if="member" class="member-avatar flex center-center">
    <img v-if="member.imgUrl" :src="member.imgUrl" />
    <span v-else >{{ avatarName }}</span>
  </div>
</template>

<script>
export default {
  name: 'member-avatar',
  props: {
    member: {
      type: Object,
      default() {
        return { name: 'Guest' };
      },
    },
  },
  computed: {
    avatarName() {
      const names = this.member.name.split(' ');
      console.log('names:', names)
      return (
        names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase()
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.member-avatar {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  color: #5d5d5d;
  background-color: #dadadb;
  font-weight: 700;
  // margin-inline-end: 12px;
  font-size: 0.8em;
   img {
    border-radius: 50%;
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
}
</style>