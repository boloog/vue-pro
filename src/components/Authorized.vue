<script>
import { check } from "../utils/auth";
export default {
  props: {
    authority: {
      type: Array,
      required: true
    }
  },
  // 函数式组件
  functional: true,
  render(h, context) {
    const { props, scopedSlots } = context;
    return check(props.authority) ? scopedSlots.default() : null;
  }
};
</script>
