import RRadioTile from "../../components/RRadioTile/RRadioTile.vue";
import "../../theme/index.css";
import { ref } from "vue";
export default {
  title: "components/RRadioTile",
  component: RRadioTile,
  argTypes: {},
};

const TemplateDefault = (args) => ({
  components: { RRadioTile },
  setup() {
    return { args };
  },
  template: `<r-radio-tile v-bind="args" />`,
});

export const Default = TemplateDefault.bind({});
Default.args = {
  items: [
    {
      label: "Pracownik sklepu",
      value: "storeEmployee",
      icon: "fas fa-user",
    },
    {
      label: "Pracownik ochrony",
      value: "securityEmployee",
      icon: "fas fa-user-shield",
    },
    {
      label: "Pracownik uczący się",
      value: "newbeeEmployee",
      icon: "fas fa-user-graduate",
    },
    {
      label: "Pracownik zewnętrzny",
      value: "externalEmployee",
      icon: "fas fa-user-secret",
    },
    {
      label: "Pracownik centrala",
      value: "centralEmployee",
      icon: "fas fa-user-tie",
    },
  ],
  name: "roles",
  modelValue: "storeEmployee",
};
