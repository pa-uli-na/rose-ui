import RSwitch from '../../components/RSwitch/RSwitch.vue'
import '../../theme/index.css'
import { setThemeModeDark, setThemeModeLight } from '../../utils/themeToggle'

export default {
  title: 'components/RSwitch',
  component: RSwitch,
}

const TemplateDefault = (args) => ({
  components: { RSwitch },
  setup() {
    setThemeModeLight()
    return { args }
  },
  template: `<r-switch v-bind="args" />`,
})
export const Default = TemplateDefault.bind({})
Default.args = {}

const TemplateDark = (args) => ({
  components: { RSwitch },
  setup() {
    setThemeModeDark()
    return { args }
  },
  template: `
  <div class="bg-white dark:bg-gray-800 h-20 ">
      <r-switch v-bind="args" />
  </div>`,
})

export const Dark = TemplateDark.bind({})
Dark.args = {}
