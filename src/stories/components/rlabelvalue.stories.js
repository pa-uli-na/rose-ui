import RLabelValue from "../../components/RLabelValue/RLabelValue.vue";
import { setThemeModeLight, setThemeModeDark } from "../../utils/themeToggle";
export default {
  title: "components/RLabelValue",
  component: RLabelValue,
};

const TemplateLight = (args) => ({
  components: { RLabelValue },
  setup() {
    setThemeModeLight();
    return { args };
  },
  template: `<r-label-value v-bind="args" />`,
});

export const LightMode = TemplateLight.bind({});
LightMode.args = {
  label: "Dan",
  value: "12345678",
};

const TemplateDark = (args) => ({
  components: { RLabelValue },
  setup() {
    setThemeModeDark();
    return { args };
  },
  template: `
  <div class="dark:bg-gray-800">
    <r-label-value v-bind="args" />
  </div>
  `,
});

export const DarkMode = TemplateDark.bind({});
DarkMode.args = {
  label: "Dan",
  value: "12345678",
};
