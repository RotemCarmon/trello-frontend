<template>
  <section class="card-preview-container" @click="openCard" :style="color">
    <label-list :labels="labels" />
    <div class="card-preview">
      {{ card.title }}
    </div>
    <font-awesome-icon
      @click="removeCard"
      class="remove-card-preview"
      :icon="['fal', 'trash-alt']"
      size="lg"
    />
  </section>
</template>

<script>
import labelList from './details/label-list';
export default {
  name: 'card-preview',
  props: {
    card: Object,
  },
  methods: {
    removeCard(ev) {
      ev.stopPropagation();
      this.$emit('removeCard', this.card._id);
    },
    openCard() {
      const param = `${this.card.inList.listId}-${this.card._id}`;
      const currPath = this.$router.currentRoute.fullPath;
      this.$router.push({ path: `${currPath}/card/${param}` });
    },
  },
  computed: {
    color() {
      return { backgroundColor: this.card.color || '#fff' };
    },
    labels() {
      const labels = this.$store.getters.getLabels;
      return labels.filter((l, idx) => this.card.labels.includes(idx));
    },
  },
  components: {
    labelList,
  },
};
</script>
