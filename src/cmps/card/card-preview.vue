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
      this.$emit('open', this.card._id)
    },
  },
  computed: {
    color() {
      return { backgroundColor: this.card.bgc || '#fff' };
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
