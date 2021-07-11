<template>
  <!-- @mouseup.stop="isEditTitle = false" -->
  <section class="card-list-container list-basic flex column space-between">
    <div class="list-header flex space-between align-center">
      <span
        class="list-title"
        ref="title"
        contenteditable="false"
        v-click-outside="endEdit"
        @click="setEdit"
        >{{ list.title }}</span
      >
      <font-awesome-icon
        :icon="['fal', 'ellipsis-h']"
        class="list-menu list-btn"
        @click="isOpenAction = !isOpenAction"
      />
    </div>
    <!-- List -->
    <div class="card-list custom-scroll" :class="{ 'add-open': isAddingCard }">
      <draggable
        v-model="list.cards"
        group="list"
        animation="300"
        ghostClass="ghost"
        chosenClass="chosen"
        dragClass="drag"
        forceFallback="true"
        @end="moveCard($event, list)"
      >
        <transition-group type="transition" name="flip-list">
          <card-preview
            v-for="card in list.cards"
            :card="card"
            :key="card.id"
            :data-id="card.id"
            @open="openCard"
            @removeCard="removeCard"
          />
        </transition-group>
      </draggable>
      <div class="add-card-container">
        <div v-if="isAddingCard" ref="add" class="add-card-title-input">
          <textarea
            ref="input"
            v-model="newCardTitle"
            rows="3"
            placeholder="Enter the title for this card"
          ></textarea>
          <save-btn @save="addCard" @close="closeAddCard" />
        </div>
      </div>
    </div>
    <!-- Add Card -->
    <button
      v-if="!isAddingCard"
      @click="isAddingCard = true"
      class="open-add-card-btn list-btn"
    >
      + Add another card
    </button>
    <!-- Menu -->
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
import draggable from 'vuedraggable';
export default {
  props: {
    list: Object,
  },
  data() {
    return {
      isAddingCard: false,
      isOpenAction: false,
      newCardTitle: '',
      isEditTitle: false,
    };
  },
  methods: {
    removeCard(cardId) {
      const payload = {
        cardId,
        listId: this.list.id,
      };
      this.$store.dispatch('removeCard', payload);
    },
    addCard() {
      if (!this.newCardTitle) return;
      const payLoad = {
        title: this.newCardTitle,
        listId: this.list.id,
      };
      this.$store.dispatch('addCard', payLoad);
      this.closeAddCard();
    },
    openCard(cardId) {
      const param = `${this.list.id}-${cardId}`;
      const currPath = this.$router.currentRoute.fullPath;
      this.$router.push({ path: `${currPath}/card/${param}` });
    },

    removeList() {
      this.$store.dispatch('removeList', this.list.id);
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
    moveCard(e, from) {
      if (e.pullMode) {
        const cardId = e.item.dataset.id;
        const fromTitle = from.title;
        const toListId = e.to.offsetParent.dataset.id;
        const payload = { cardId, fromTitle, toListId };
        this.$emit('moveCard', payload);
        return;
      }
      this.$emit('update');
    },
    setEdit() {
      this.isEditTitle = true;
      this.$refs.title.contentEditable = this.isEditTitle;
      this.$refs.title.focus();
    },
    endEdit(ev) {
      if (!this.isEditTitle) return;
      console.log('End Edit');
      this.isEditTitle = false;
      const elTitle = this.$refs.title;
      elTitle.contentEditable = this.isEditTitle;
      this.list.title = elTitle.innerText;
      this.$emit('update');
    },
  },
  // TODO: move in to the add-item component
  watch: {
    isAddingCard(val) {
      this.$nextTick(() => {
        if (val) {
          this.$refs.input.focus();
          this.$refs.add.scrollIntoView({ block: 'end' });
        }
      });
    },
  },
  components: {
    cardPreview,
    saveBtn,
    actionList,
    draggable,
  },
};
</script>
