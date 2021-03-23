<template>
  <!-- <section class="members-menu-container popup-menu">
    <h3>Members</h3>
    <font-awesome-icon :icon="['fal','times']" class="close-btn" @click.stop="close" />
    <ul class="member-list clean-list">
      <li
        class="member-preview flex align-center"
        v-for="member in members"
        :key="member._id"
      >
        <member-avatar :member="member" />
        {{ member.name }}
      </li>
    </ul>
  </section> -->
  <popup-menu @close="close" class="members-menu-container">
    <template v-slot:header>
      <h3>Members</h3>
    </template>
    <template v-slot:main>
      <ul class="member-list clean-list">
        <li
          class="member-preview flex align-center"
          v-for="member in members"
          :key="member._id"
        >
          <member-avatar :member="member" />
          {{ member.name }}
        </li>
      </ul>
    </template>
  </popup-menu>
</template>

<script>
import popupMenu from '../../../common/popup-menu';
import memberAvatar from '../../../common/member-avatar';
export default {
  name: 'members-menu',
  props: {
    members: Array,
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
  components: {
    memberAvatar,
    popupMenu
  },
};
</script>
<style lang="scss" scoped>
.member-preview {
  background-color: #60606004;
  padding: 2px;
  &:hover {
    background-color: #6060601a;
    cursor: pointer;
  }
}
</style>
