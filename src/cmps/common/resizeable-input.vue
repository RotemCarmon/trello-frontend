<template>
  <label class="input-sizer stacked">
    <textarea
      :value="content"
      @input="changeInput"
    />
  </label>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: () => 'Enter text here',
    },
    value: String,
  },
  data() {
    return {
      content: this.value,
    };
  },
  methods: {
    changeInput(ev) {
      console.log('ev:', ev)
      ev.target.parentNode.dataset.value = ev.target.value
      this.content = ev.target.value;
      this.$emit('input', this.content);
    },
  },
};
</script>

<style lang="scss">
.input-sizer {
  display: inline-grid;
  border-radius: 5px;
  align-items: center;
  position: relative;
  border: solid 1px;
  padding: 0.25em 0.5em;
  width: 100%;

  &.stacked {
    padding: 0.5em;
    align-items: stretch;

    &::after,
    input,
    textarea {
      grid-area: 2 / 1;
    }
  }
  &::after,
  input,
  textarea {
    width: auto;
    min-width: 1em;
    grid-area: 1 / 2;
    font: inherit;
    padding: 0.25em;
    margin: 0;
    resize: none;
    background: none;
    appearance: none;
    border: none;
    // word-break: keep-all;
  }
  span {
    padding: 0.25em;
  }
  &::after {
    content: attr(data-value) ' ';
    visibility: hidden;
    white-space: pre-wrap;
  }

  &:focus-within {
    outline: -webkit-focus-ring-color auto 1px;
    // border-color: blue;
    > span {
      color: blue;
    }
    textarea:focus,
    input:focus {
      outline: none;
    }
  }
}

.input-sizer {
  // box-shadow: 4px 4px 0px #000;

  > span {
    text-transform: uppercase;
    font-size: 0.8em;
    font-weight: bold;
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.15);
  }
}
</style>
