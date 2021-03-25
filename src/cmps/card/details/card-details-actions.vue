<template>
  <section class="card-controllers-container flex column">
    <h3 class="details-section-header">Actions</h3>
    <!-- Label -->
    <details-button
      @click.native.self="openMenu('label')"
      txt="labels"
      icon="tag"
      prefix="fal"
      ><template v-slot:menu>
        <label-menu
          v-on="$listeners"
          @close="onCloseMenu"
          :labels="labels"
          v-if="currMenu === 'label'"
        />
      </template>
    </details-button>
    <!-- Check List -->
    <details-button
      @click.native.self="openMenu('checklist')"
      txt="check list"
      icon="tasks"
      prefix="fal"
      ><template v-slot:menu
        ><check-list-menu
          @close="onCloseMenu"
          @add="addCheckList"
          v-if="currMenu === 'checklist'"
      /></template>
    </details-button>
    <!-- Due Date -->
    <details-button
      @click.native.self="openMenu('dueDate')"
      txt="due date"
      icon="clock"
      prefix="fal"
      ><template v-slot:menu
        ><due-date-menu @close="onCloseMenu" v-if="currMenu === 'dueDate'"
      /></template>
    </details-button>
    <!-- Members -->
    <details-button
      @click.native.self="openMenu('members')"
      txt="members"
      icon="user"
      prefix="fal"
      ><template v-slot:menu>
        <members-menu
          @close="onCloseMenu"
          v-if="currMenu === 'members'"
          :members="boardMembers"
      /></template>
    </details-button>
  </section>
</template>

<script>
import detailsButton from '@/cmps/card/details/details-button';
import labelMenu from '@/cmps/card/details/menu/label-menu';
import checkListMenu from '@/cmps/card/details/menu/check-list-menu';
import dueDateMenu from '@/cmps/card/details/menu/due-date-menu';
import membersMenu from '@/cmps/card/details/menu/members-menu';
export default {
  name: 'card-details-actions',
  props: {
    labels: Array,
  },
  data() {
    return {
      currMenu: '',
    };
  },
  computed: {
    boardMembers() {
      return this.$store.getters.getMembers;
    },
  },
  methods: {
    openMenu(menuName) {
      if (this.currMenu === menuName) this.onCloseMenu();
      else this.currMenu = menuName;
    },
    onCloseMenu() {
      this.currMenu = '';
    },
    addCheckList(title) {
      console.log('Adding ', title);
    },
  },
  components: {
    detailsButton,
    labelMenu,
    checkListMenu,
    dueDateMenu,
    membersMenu,
  },
};
</script>