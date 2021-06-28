<template>
  <section v-if="card" class="card-modal">
    <div @click.self="closeCard" class="modal-screen flex justify-center">
      <div class="card-details-container" :class="{'cover-area': card.bgc }">
      <div class="card-cover" :style="{backgroundColor: card.bgc}"></div>
        <!-- CLOSE BUTTON -->
        <button
          @click="closeCard"
          class="close-menu-btn hover-bg-btn flex center-center sqare-btn"
        >
          <font-awesome-icon :icon="['fal', 'times']" />
        </button>
        <!-- CARD TITLE -->
        <div class="card-title left-gap">
          <h3 contenteditable @input="editTitle">{{ card.title }}</h3>
          <small
            >In list <span>{{ list.title }}</span></small
          >
        </div>
        <!-- ############ -->
        <!-- MAIN CONTENT -->
        <!-- ############ -->
        <main class="main-card-details flex">
          <section class="card-content-container grow-1">
            <!-- LABELS -->
            <section
              v-if="activeLabels && activeLabels.length"
              class="details-section-labels left-gap"
            >
              <h3 class="details-section-header">Labels</h3>
              <label-list :labels="activeLabels" />
            </section>
            <!--  DUE DATE -->
            <section
              v-if="dueDate"
              class="details-section detail-section-due-date left-gap"
            >
              <h3 class="details-section-header">Due Date</h3>
              <button class="details-btn due-date-btn">
                {{ dueDate }}

                <button class="remove-btn hide" @click="removeDueDate">
                  <font-awesome-icon :icon="['fal', 'times']" />
                </button>
              </button>
            </section>
            <!-- MEMBERS -->
            <section
              v-if="card.members && card.members.length"
              class="member-list-container left-gap"
            >
              <h3 class="details-section-header">Members</h3>
              <div class="member-list details-section flex">
                <member-avatar
                  v-for="member in card.members"
                  :key="member._id"
                  :member="member"
                />
              </div>
            </section>
            <!-- DESCRIPTION -->
            <card-description
              @save="updateDesc"
              :description="card.description"
            />
            <!-- CHECK LIST -->
            <check-main @update="updateCard" :checkLists="card.checkLists" />
            <!-- ACTIVITIES -->
            <!-- TODO: split to component -->
            <section class="details-section details-section-activity">
              <h3 class="details-section-header left-gap">Activity</h3>
              <activity-add />
              <activity-list :activities="activities" />
            </section>
          </section>
          <!-- ACTIONS -->
          <card-details-actions @update="updateCard" :labels="labels" />
          <!-- <<== Labels -->
        </main>
      </div>
    </div>
  </section>
</template>

<script>
import activityList from '../cmps/card/details/activity/activity-list';
import activityAdd from '../cmps/card/details/activity/activity-add';
import cardDescription from '../cmps/card/details/card-description';
import labelList from '../cmps/card/details/label-list';
import cardDetailsActions from '../cmps/card/details/card-details-actions';
import checkMain from '../cmps/card/details/check-list/check-main';
import memberAvatar from '../cmps/common/member-avatar';
import dateFormat from 'dateformat';

export default {
  name: 'card-details',
  created() {
    this.loadCard();
  },
  data() {
    return {
      listId: null,
    };
  },
  computed: {
    card() {
      return this.$store.getters.getCurrCard;
    },
    list() {
      return this.$store.getters.getCurrList(this.listId);
    },
    labels() {
      return this.$store.getters.getLabels.map((label, idx) => {
        label.isActive = this.card.labels.includes(idx);
        return label;
      });
    },
    activeLabels() {
      const labels = this.labels;
      return labels.filter((label) => label.isActive);
    },
    dueDate() {
      if (!this.card.dueDate) return '';
      return dateFormat(this.card.dueDate, 'mmmm dS, h:MM TT');
    },
    activities() {
      const activits = this.$store.getters.getActivities;
      return activits.filter(
        (activity) => activity?.card?._id === this.card._id
      );
    },
  },
  methods: {
    close() {
      console.log('Space has been pressed!');
    },
    loadCard() {
      const { listCardId } = this.$route.params;
      const [listId, cardId] = listCardId.split('-');
      this.listId = listId;
      this.$store.dispatch('getCard', { listId, cardId });
    },
    closeCard() {
      this.$router.go(-1);
    },
    updateDesc(desc) {
      this.card.description = desc;
      this.updateCard({ activity: 'Updated description' });
    },
    updateCard({ card = this.card, activity }) {
      // TODO: get action for activities
      this.$store.dispatch('updateCard', {
        card,
        listId: this.listId,
        activity,
      });
    },
    editTitle(ev) {
      console.log('Title Edit', ev.target.innerText);
      const txt = ev.target.innerText;
      this.card.title = txt;
      this.updateCard({ activity: 'Updated title' });
    },
    removeDueDate() {
      this.card.dueDate = null;
      this.updateCard({ activity: 'Removed Due date' });
    },
  },
  components: {
    activityList,
    labelList,
    cardDescription,
    cardDetailsActions,
    checkMain,
    memberAvatar,
    activityAdd,
  },
};
</script>
