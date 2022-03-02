import { RAvatar } from "../../components/RAvatar";
import "../../theme/index.css";
import { setThemeModeDark, setThemeModeLight } from "../../utils/themeToggle";

export default {
  title: "components/RAvatar",
  component: RAvatar,
};

const TemplateDefault = (args) => ({
  components: { RAvatar },
  setup() {
    setThemeModeLight();
    return { args };
  },
  template: `<r-avatar v-bind="args" />`,
});

export const LightMode = TemplateDefault.bind({});
LightMode.args = {};

const TemplateDark = (args) => ({
  components: { RAvatar },
  setup() {
    setThemeModeDark();
    return { args };
  },
  template: `<div class="bg-white dark:bg-gray-800">
    <r-avatar v-bind="args" />
    </div>`,
});
export const DarkMode = TemplateDark.bind({});
DarkMode.args = {};
