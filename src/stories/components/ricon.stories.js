import RIcon from "../../components/RIcon/RIcon.vue";
import "../../theme/index.css";

export default {
  title: "components/RIcon",
  component: RIcon,
};

const TemplateDefault = (args) => ({
  components: { RIcon },
  setup() {
    return { args };
  },
  template: `<r-icon v-bind="args" />`,
});

export const Default = TemplateDefault.bind({});
Default.args = {
  name: "fas fa-face-smile",
  // className: "fa-5x",
  color: "black",
  background: false,
  // backgroundColor: 'blue',
};
