<template>
  <span>{{startVal}}</span>
</template>

<script>
import Countup from 'countup.js';

export default {
  name: 'countup',
  mounted () {
    this.$nextTick(() => {
      this.countup = new Countup(this.$el, this.startVal, this.endVal, this.decimals, this.duration, this.options);
      if (this.start) {
        this.countup.start(() => this.$emit('completed'));
      }
    });
  },
  props: {
    start: {
      type: Boolean,
      default: true,
    },
    startVal: {
      type: Number,
      default: 0,
    },
    endVal: {
      type: Number,
      required: true,
    },
    // number of decimal places in number
    decimals: {
      type: Number,
      default: 0,
    },
    // duration in seconds
    duration: {
      type: Number,
      default: 2,
    },
    options: {
      type: Object,
      default () {
        return {};
      },
    },
  },
  watch: {
    start (val) {
      if (val) {
        this.countup.start(() => this.$emit('completed'));
      }
    },
    endVal (val) {
      this.countup.update(val);
    },
  },
};
</script>
