import { defineComponent, ref } from "vue";
import RTab from "../../components/RTab/RTab.vue";
import RTabs from "../../components/RTabs/RTabs.vue";
// import type { RTabProps } from '../../components/RTab/types'

import "../../theme/index.css";

export default {
  title: "components/RTab",
  component: RTab,
  subcomponents: { RTabs },
};

const TemplateDefault = (args) =>
  defineComponent({
    components: { RTabs, RTab },
    setup() {
      const activeTab = ref("first_tab");
      return { args, activeTab };
    },
    template: `
      <r-tabs v-model="activeTab">
        <r-tab
          :name="args.name"
          :title="args.title"
          :description="args.description"
          :disabled="args.disabled"
        />
        <r-tab
          name="second_tab"
          title="Second tab"
        />
        <r-tab
          name="third_tab"
          title="Third tab"
        />
      </r-tabs>
    `,
  });

export const Default = TemplateDefault.bind({});
Default.args = {
  name: "first_tab",
  title: "First tab",
  description: "Description...",
};
