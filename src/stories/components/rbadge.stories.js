import RBadge from "../../components/RBadge/RBadge.vue";
import "../../theme/index.css";
import { setThemeModeDark, setThemeModeLight } from "../../utils/themeToggle";

export default {
  title: "components/RBadge",
  component: RBadge,
};

const TemplateDefault = (args) => ({
  components: { RBadge },
  setup() {
    setThemeModeLight();
    return { args };
  },
  template: `<r-badge v-bind="args" />`,
});

export const LightMode = TemplateDefault.bind({});
LightMode.args = {
  label: "Badge",
  rounded: true,
};

const TemplateDark = (args) => ({
  components: { RBadge },
  setup() {
    setThemeModeDark();
    return { args };
  },
  template: `<div class="bg-white dark:bg-gray-800">
    <r-badge v-bind="args" />
  </div>`,
});

export const DarkMode = TemplateDark.bind({});
DarkMode.args = {
  label: "Badge",
  rounded: true,
};
