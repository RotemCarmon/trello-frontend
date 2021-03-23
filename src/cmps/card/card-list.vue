<template>
  <section class="card-list-container list-basic flex column space-between">
    <div class="list-header flex space-between align-center">
      <span class="list-title" contenteditable="true">{{ list.title }}</span>
      <font-awesome-icon
        :icon="['fal', 'ellipsis-h']"
        class="list-menu list-btn"
        @click="isOpenAction = !isOpenAction"
      />
    </div>
    <div class="card-list">
      <card-preview
        v-for="card in list.cards"
        :card="card"
        :key="card._id"
        @removeCard="removeCard"
      />
      <div class="add-card-title-input">
        <textarea
          v-if="isAddingCard"
          v-model="newCardTitle"
          rows="3"
          placeholder="Enter the title for this card"
        ></textarea>
      </div>
    </div>
    <div class="add-card-container">
      <button
        v-if="!isAddingCard"
        @click="isAddingCard = true"
        class="on-add-card-btn list-btn"
      >
        + Add another card
      </button>
      <div v-if="isAddingCard" class="save-card flex space-between">
        <save-btn @save="addCard" @close="closeAddCard" />
      </div>
    </div>
    <transition name="fade">
      <action-list
        v-if="isOpenAction"
        @close="closeActionList"
        @addCard="openAddCard"
        @remove="removeList"
      />
    </transition>
  </section>
</template>

<script>
import cardPreview from './card-preview';
import saveBtn from '../common/save-btn';
import actionList from '../list/action-list';
export default {
  props: {
    list: Object,
  },
  data() {
    return {
      isAddingCard: false,
      isOpenAction: false,
      newCardTitle: '',
    };
  },
  methods: {
    removeCard(cardId) {
      const payload = {
        cardId,
        listId: this.list._id,
      };
      this.$store.dispatch('removeCard', payload);
    },
    addCard() {
      if (!this.newCardTitle) return;
      const payLoad = {
        title: this.newCardTitle,
        listId: this.list._id,
      };
      this.$store.dispatch('addCard', payLoad);
      this.closeAddCard();
    },

    removeList() {
      console.log('Removing list');
      this.$store.dispatch('removeList', this.list._id);
    },
    openAddCard() {
      this.closeActionList();
      this.isAddingCard = true;
    },
    closeAddCard() {
      this.isAddingCard = false;
      this.newCardTitle = '';
    },
    openActionList() {
      this.isOpenAction = true;
    },
    closeActionList() {
      this.isOpenAction = false;
    },
  },
  components: {
    cardPreview,
    saveBtn,
    actionList,
  },
};
</script>
