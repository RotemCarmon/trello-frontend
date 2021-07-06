<template>
  <section v-if="card" class="card-modal">
    <div @click.self="closeCard" class="modal-screen flex justify-center">
      <div class="card-details-container" :class="{ 'cover-area': card.bgc || cardImgCover }">
        <div
          class="card-cover flex center-center"
          :style="{ backgroundColor: card.bgc }"
        >
          <template v-if="cardImgCover">
            <img :src="cardImgCover" alt="Cover" />
            <span
              
              @click="removeCover"
              class="details-btn remove-cover-btn"
            >
              <font-awesome-icon :icon="['fal', 'trash-alt']" />
              Remove
            </span>
          </template>
        </div>
        <!-- CLOSE BUTTON -->
        <button
          @click="closeCard"
          class="close-menu-btn hover-bg-btn flex center-center square-btn"
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
              class="details-section-labels details-section left-gap"
            >
              <h3 class="details-section-header">Labels</h3>
              <label-list :labels="activeLabels" />
            </section>
            <!--  DUE DATE -->
            <section
              v-if="dueDate"
              class="details-section detail-section-due-date"
            >
              <h3 class="details-section-header left-gap">Due Date</h3>
              <div class="due-date-btn flex align-center">
                <input
                  type="checkbox"
                  class="card-check-box"
                  @change="toggleCardDone"
                  v-model="isCardDone"
                />
                <button class="details-btn" :class="{ done: card.isDone }">
                  {{ dueDate }}
                </button>
              </div>
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
            <!-- ATTACHMENT -->
            <section
              v-if="card.attachments && card.attachments.length"
              class="details-section-attachments left-gap"
            >
              <h3 class="details-section-header">Attachments</h3>
              <div class="attachment-list flex wrap">
                <div
                  v-for="attch in this.card.attachments"
                  :key="attch._id"
                  class="attachment-preview"
                >
                  <div class="img-container">
                    <img :src="attch.imgUrl" />
                  </div>
                  <div class="attachment-hover-btn attachment-remove">
                    <font-awesome-icon
                      title="Delete image"
                      :icon="['fal', 'trash-alt']"
                      @click="removeAttachment(attch)"
                    />
                  </div>
                  <div class="attachment-hover-btn attachment-cover">
                    <font-awesome-icon
                      title="Set as cover"
                      :icon="['fal', 'image-polaroid']"
                      @click="setCover(attch)"
                    />
                  </div>
                </div>
              </div>
            </section>
            <!-- CHECK LIST -->
            <check-main @update="updateCard" :checkLists="card.checkLists" />
            <!-- ACTIVITIES -->
            <!-- TODO: split to component -->
            <section class="details-section details-section-activity">
              <h3
                class="details-section-header inline pointer left-gap"
                :class="{ selected: listToShow === 'activities' }"
                @click="setList('activities')"
              >
                Activity
              </h3>
              |
              <h3
                class="details-section-header inline pointer"
                :class="{ selected: listToShow === 'comments' }"
                @click="setList('comments')"
              >
                Comments
              </h3>
              <template v-if="listToShow === 'activities'">
                <activity-list :activities="activities" />
              </template>
              <template v-else>
                <comment-add class="left-gap" @save="addComment" />
                <comment-list
                  @save="editComment"
                  @remove="removeComment"
                  :comments="comments"
                />
              </template>
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
import commentList from '../cmps/card/details/comment-list';
import commentAdd from '../cmps/card/details/comment-add';
import cardDescription from '../cmps/card/details/card-description';
import labelList from '../cmps/card/details/label-list';
import cardDetailsActions from '../cmps/card/details/card-details-actions';
import checkMain from '../cmps/card/details/check-list/check-main';
import memberAvatar from '../cmps/common/member-avatar';
import dateFormat from 'dateformat';
import { boardService } from '../services/board-service';

export default {
  name: 'card-details',
  created() {
    this.loadCard();
    this.isCardDone = this.card?.isDone;
  },
  data() {
    return {
      listId: null,
      listToShow: 'activities',
      isCardDone: false,
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
    comments() {
      return this.card?.comments;
    },
    cardImgCover() {
      if (!this.card.cover) return '';
      const imgUrl = this.card.cover.imgUrl;
      return imgUrl;
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
      this.updateCard({ activity: 'updated title' });
    },
    removeDueDate() {
      this.card.dueDate = null;
      this.updateCard({ activity: 'removed Due date' });
    },
    removeAttachment(attachment) {
      const { attachments } = this.card;
      const idx = attachments.findIndex(
        (attch) => attch._id === attachment._id
      );
      if (idx === -1) {
        console.log('Attachment dont exist!');
        return;
      }
      attachments.splice(idx, 1);
      this.updateCard({ activity: 'removed attachment' });
    },
    setCover(attch) {
      this.card.cover = attch;
      this.updateCard({ card: this.card, activity: 'added cover photo' });
    },
    removeCover() {
      this.card.cover = null;
      this.updateCard({ card: this.card, activity: 'removed cover photo' });
    },
    addComment(txt) {
      const comment = boardService.createComment({
        txt,
        cardId: this.card._id,
      });
      if (!this.card.comments) this.card.comments = [];
      this.card.comments.unshift(comment);
      this.updateCard({ card: this.card });
    },
    removeComment(commentId) {
      const commentIdx = this.card.comments.findIndex(
        (comment) => comment._id === commentId
      );
      if (commentIdx === -1) {
        console.log("Can't remove Comment");
        return;
      }
      this.card.comments.splice(commentIdx, 1);
      this.updateCard({ card: this.card });
    },
    editComment(comment) {
      const commentIdx = this.card.comments.findIndex(
        (c) => c._id === comment._id
      );
      if (commentIdx === -1) {
        console.log("Can't edit Comment");
        return;
      }
      this.card.comments.splice(commentIdx, 1, comment);
      this.updateCard({ card: this.card });
    },
    setList(listName) {
      this.listToShow = listName;
    },
    toggleCardDone() {
      this.card.isDone = this.isCardDone;
      this.updateCard({ card: this.card });
    },
  },
  components: {
    activityList,
    labelList,
    cardDescription,
    cardDetailsActions,
    checkMain,
    memberAvatar,
    commentAdd,
    commentList,
  },
};
</script>
