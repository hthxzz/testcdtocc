<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];

    if (icon) {
      vnodes.push(<ImageIcon src={icon} />);
    }
    if (title) {
      vnodes.push(
        <span style="" class="menu-title" slot="title">
          {title}
        </span>
      );
      // vnodes.push(<span style="padding-left:20px;" slot='title'>{(title)}</span>)
    }
    return vnodes;
  }
};
</script>
