<template>
  <button class="common-card-btn details-btn">{{title}}</button>
</template>

<script>
export default {
  name: 'common-card-btn',
  props: {
    title: {
      type: String
    },
  },
}
</script>