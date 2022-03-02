import { defineComponent } from 'vue'
import RBadge from '../../components/RBadge/RBadge.vue'
import RTabs from '../../components/RTabs/RTabs.vue'
import RTab from '../../components/RTab/RTab.vue'
import { setThemeModeDark, setThemeModeLight } from '../../utils/themeToggle'

export default {
  title: 'components/RTabs',
  component: RTabs,
  subcomponents: { RTab, RBadge },
}

const RTabsStory = (args) =>
  defineComponent({
    components: { RTabs, RTab, RBadge },
    setup() {
      setThemeModeDark()
      // setThemeModeLight()
      return { args }
    },
    template: `
    <div class="bg-transparent dark:bg-gray-800">
    <div class="h-28">
      <r-tabs 
        v-bind="args" 
        :tab-width="args.tabWidth"
        :disabled="args.disabled"
      >
        <r-tab name="first_tab">
          <template #title>
          Tab 1
          <r-badge>tab</r-badge>
        </template>
        </r-tab>
        <r-tab name="second_tab">
          <template #title>
            Tab 2
            <r-badge>tab</r-badge>
        </r-tab>
        <r-tab name="third_tab">
          <template #title>
          Tab 3
          <r-badge>tab</r-badge>
        </template>
        </r-tab>
        <r-tab name="fourth_tab">
          <template #title>
            Tab 4
            <r-badge>tab</r-badge>
        </r-tab>
       <r-tab name="fifth_tab">
          <template #title>
            Tab 5
            <r-badge>tab</r-badge>
        </r-tab>
        <r-tab name="sixth_tab">
          <template #title>
            Tab 6
            <r-badge>tab</r-badge>
        </r-tab>
      </r-tabs>
      </div>
      </div>
    `,
  })

export const Default = RTabsStory.bind({})
Default.args = {
  modelValue: 'first_tab',
}
