<template>
  <section class="board-header-container header-container">
    <div class="board-header-left flex">
      <div class="boards-selection btn-header" @click="toggleMenu('boards')">
        <span>Boards</span>
        <font-awesome-icon
          :class="{ down: openMenu === 'boards' }"
          :icon="['fal', 'chevron-up']"
          size="xs"
        />
      </div>
      <transition name="fade">
        <popup-menu
          v-if="openMenu === 'boards'"
          @close="toggleMenu"
          class="board-menu-container"
        >
          <template v-slot:header>
            <h3>Boards</h3>
          </template>
          <template v-slot:main>
            <ul class="board-menu clean-list flex column">
              <router-link
                :to="`/board/${board._id}`"
                class="board-preview"
                v-for="board in boards"
                :key="board._id"
                @click.native="toggleMenu"
                >{{ board.title }}</router-link
              >
            </ul>
          </template>
        </popup-menu>
      </transition>
      <div class="board-title btn-header">{{ board.title }}</div>
    </div>

    <div class="board-header-center flex center-center">
      <div class="members-list flex">
        <member-avatar
          v-for="member in board.members"
          :member="member"
          :key="member._id"
        />
      </div>
      <div class="add-members-btn btn-header" @click="getMemebers()">
        Invite
      </div>
      <transition name="fade">
        <member-menu
         v-if="openMenu === 'invite'"
          :members="members"
          :existingMembers="this.board.members"
          @close="toggleMenu(null)"
          @update="updateMembers"
        />
        <!-- <popup-menu v-if="openMenu === 'invite'" @close="toggleMenu">
          <template v-slot:header>
            <h3>Invite Members</h3>
          </template>
          <template v-slot:main>
            <ul v-if="members" class="memeber-list clean-list">
              <li
                v-for="member in members"
                :key="member._id"
                @click="addMemeber(member)"
                class="flex align-center"
              >
                <member-avatar :member="member" />
                <span>{{ member.name }}</span>
                <font-awesome-icon
                  v-if="isMemberInBoard(member._id)"
                  class="check-mark"
                  :icon="['fal', 'check']"
                />
              </li>
            </ul>
          </template>
        </popup-menu> -->
      </transition>
    </div>

    <div class="board-header-right flex">
      <div class="board-controllers"></div>
    </div>
  </section>
</template>

<script>
import popupMenu from './common/popup-menu';
import memberAvatar from './common/member-avatar';
import memberMenu from './card/details/menu/members-menu.vue';
import { boardService } from '../services/board-service';
export default {
  data() {
    return {
      boards: [],
      openMenu: false,
      members: null,
    };
  },
  computed: {
    board() {
      return this.$store.getters.getCurrBoard;
    },
  },
  methods: {
    toggleMenu(menuName) {
      if (this.openMenu === menuName) this.openMenu = null;
      else this.openMenu = menuName;
    },
    async getMemebers() {
      this.members = await boardService.getMemebers();
      this.toggleMenu('invite');
    },
    updateMembers(members) {
      console.log('members', members);
      this.board.members = members
      this.$store.dispatch('updateBoard', this.board)
    }
  },
  async created() {
    this.boards = await this.$store.dispatch('getBoards');
  },
  components: {
    memberMenu,
    popupMenu,
    memberAvatar,
  },
};
</script>
