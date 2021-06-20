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
          v-if="currMenu === 'label'"
          @setActive="setActiveLabel"
          @close="onCloseMenu"
          :labels="labels"
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
          v-if="currMenu === 'checklist'"
          @close="onCloseMenu"
          @add="addCheckList"
      /></template>
    </details-button>
    <!-- Due Date -->
    <details-button
      @click.native.self="openMenu('dueDate')"
      txt="due date"
      icon="clock"
      prefix="fal"
      ><template v-slot:menu
        ><due-date-menu
          v-if="currMenu === 'dueDate'"
          @close="onCloseMenu"
          @setDate="setDueDate"
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
          v-if="currMenu === 'members'"
          @close="onCloseMenu"
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
    card() {
      return this.$store.getters.getCurrCard;
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
    setActiveLabel(idx) {
      const card = this.card;
      if (card.labels.includes(idx)) {
        const _idx = card.labels.findIndex((l) => l === idx);
        if (_idx !== -1) card.labels.splice(_idx, 1);
      } else card.labels.push(idx);
      this.$emit('update', card);
    },
    addCheckList(title) {
      console.log('Adding ', title);
      console.log('CARD ->>', this.card);
      if (!this.card.checkLists) this.card.checkLists = [];
      this.card.checkLists.push({
        title,
        todos: [],
      });
      this.$emit('update', this.card);
    },
    setDueDate(date) {
      this.card.dueDate = date;
      this.$emit('update', this.card);
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