<template>
  <div v-if="member" class="member-avatar flex center-center">
    {{ avatarName }}
    <!-- {{ member.name }} -->
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
      return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
      // return 'RC'
    },
  },
};
</script>

<style lang="scss" scoped>
.member-avatar {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  color: #5d5d5d;
  background-color: #dadadb;
  font-weight: 700;
  margin-inline-end: 12px;
  font-size: .8em;
}
</style>