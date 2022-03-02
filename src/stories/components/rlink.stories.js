import RLink from "../../components/RLink/RLink.vue";
import "../../theme/index.css";

export default {
  title: "components/RLink",
  component: RLink,
  argTypes: {
    size: {
      control: { type: "radio", options: ["small", "medium", "large"] },
    },
  },
};

const TemplateDefault = (args) => ({
  components: { RLink },
  setup() {
    return { args };
  },
  template: `<r-link v-bind="args" />`,
});

export const LightMode = TemplateDefault.bind({});
LightMode.args = {
  text: "Link",
  size: "medium",
};
