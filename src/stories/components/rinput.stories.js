import RInput from "../../components/RInput/RInput.vue";
import "../../theme/index.css";
import { setThemeModeDark, setThemeModeLight } from "../../utils/themeToggle";

export default {
  title: "components/RInput",
  component: RInput,
  argTypes: {
    onkeydown: { action: "keydown" },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
  },
};

const TemplateDefault = (args) => ({
  components: { RInput },
  setup() {
    setThemeModeLight();
    return { args };
  },
  template: `<div class="dark:bg-gray-800 h-20" style="padding: 5px">
    <r-input v-bind="args" />
  </div>`,
});

export const Default = TemplateDefault.bind({});
Default.args = {
  label: "Default",
  size: "medium",
};

const TemplateDark = (args) => ({
  components: { RInput },
  setup() {
    setThemeModeDark();
    return { args };
  },
  template: `<div class="dark:bg-gray-800 h-20" style="padding: 5px">
    <r-input v-bind="args" />
  </div>`,
});

export const Dark = TemplateDark.bind({});
Dark.args = {
  label: "Default",
  size: "medium",
};
