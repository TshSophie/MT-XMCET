<script>
  export default {
    name: 'Timeline',

    props: {
      reverse: {
        type: Boolean,
        default: false
      }
    },

    // provide() {
    //   return {
    //     timeline: this
    //   };
    // },

    render(h) {
      const reverse = this.reverse;
      const classes = {
        'xm-timeline': true,
        'is-reverse': reverse
      };
      let slots = this.$slots.default || [];
      if (reverse) {
        slots = slots.reverse();
      }
      // return (<ul class={ classes }>
      //   { slots }
      // </ul>);
      return h('ul', {
        class: classes
      }, slots)
    }
  };
</script>
<style lang="less" scoped>
.xm-timeline {
  margin: 0;
  font-size: 14px;
  list-style: none;
}
</style>