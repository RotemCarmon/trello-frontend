<template>
  <popup-menu @close="close" class="members-menu-container">
    <template v-slot:header>
      <h3>Members</h3>
    </template>
    <template v-slot:main>
      <ul v-if="members" class="memeber-list clean-list">
        <li
          v-for="member in members"
          :key="member.id"
          @click="addMemeber(member)"
          class="flex align-center"
        >
          <member-avatar :member="member" />
          <span>{{ member.name }}</span>
          <font-awesome-icon
            v-if="isMemberInBoard(member.id)"
            class="check-mark"
            :icon="['fal', 'check']"
          />
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
    existingMembers: Array,
  },
  methods: {
    close() {
      this.$emit('close');
    },
    update(copyMembers) {
      this.$emit('update', copyMembers);
    },
    addMemeber(member) {
      member.id = member._id;
      delete member._id;

      const copyMembers = JSON.parse(JSON.stringify(this.existingMembers));
      const memberIdx = copyMembers.findIndex((m) => member.id === m.id);
      if (memberIdx !== -1) {
        copyMembers.splice(memberIdx, 1);
      } else {
        copyMembers.push(member);
      }
      this.update(copyMembers);
      this.close();
    },
    isMemberInBoard(memberId) {
      if (!this.existingMembers) return;
      return this.existingMembers.find((member) => member.id === memberId);
    },
  },
  components: {
    memberAvatar,
    popupMenu,
  },
};
</script>
<style lang="scss" scoped>
.memeber-list .member-avatar {
  margin-inline-end: 8px;
}
</style>
