<template>
  <section v-if="card" class="card-modal">
    <div class="modal-screen flex justify-center">
      <div class="card-details-container">
        <!-- CLOSE BUTTON -->
        <button
          @click="closeCard"
          class="close-card hover-bg-btn flex center-center sqare-btn"
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
        <main class="main-card-details custom-scroll flex">
          <section class="card-content-container grow-1">
            <!-- LABELS -->
            <section
              v-if="activeLabels && activeLabels.length"
              class="details-section-labels left-gap"
            >
              <h3 class="details-section-header">Labels</h3>
              <label-list :labels="activeLabels" />
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
              <div class="activity-add left-gap">
                <input type="text" placeholder="write a comment" />
              </div>
              <activity-list :activities="card.activities" />
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
import activityList from '../cmps/card/details/activity-list';
import cardDescription from '../cmps/card/details/card-description';
import labelList from '../cmps/card/details/label-list';
import cardDetailsActions from '../cmps/card/details/card-details-actions';
import checkMain from '../cmps/card/details/check-list/check-main';

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
      this.updateCard();
    },
    updateCard(card = this.card) {
      this.$store.dispatch('updateCard', { card, listId: this.listId });
    },
    editTitle(ev) {
      console.log('Title Edit', ev.target.innerText);
      const txt = ev.target.innerText;
      this.card.title = txt;
      this.updateCard();
    },
  },
  components: {
    activityList,
    labelList,
    cardDescription,
    cardDetailsActions,
    checkMain,
  },
};
</script>
