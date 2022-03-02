import { defineComponent, ref } from "vue";
import RTab from "../../components/RTab/RTab.vue";
import RTabs from "../../components/RTabs/RTabs.vue";
import RBadge from "../../components/RBadge/RBadge.vue";
// import type { RTabProps } from '../../components/RTab/types'

import "../../theme/index.css";

export default {
  title: "components/RTabs",
  component: RTabs,
  subcomponents: { RTab, RBadge },
};

const TemplateDefault = (args) =>
  defineComponent({
    components: { RTabs, RTab, RBadge },
    setup() {
      const activeTab = ref("first_tab");
      return { args, activeTab };
    },
    template: `
      <r-tabs v-model="activeTab">
        <r-tab name="first_tab">
          <template #title>
          Tab 1
          <r-badge>1</r-badge>
        </template>
        </r-tab>
        <r-tab
          name="second_tab"
          title="Second tab"
        />
        <r-tab name="third_tab">
          <template #title>
          Tab 3
          <r-badge>3</r-badge>
        </template>
        </r-tab>
      </r-tabs>
    `,
  });

export const Default = TemplateDefault.bind({});
Default.args = {
  name: "first_tab",
  title: "First tab",
};
