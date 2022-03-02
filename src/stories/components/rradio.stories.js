import RRadio from '../../components/RRadio/RRadio.vue'
import '../../theme/index.css'
import { setThemeModeDark, setThemeModeLight } from '../../utils/themeToggle'

export default {
  title: 'components/RRadio',
  component: RRadio,
}

const TemplateDefault = (args) => ({
  components: { RRadio },
  setup() {
    setThemeModeLight()
    return { args }
  },
  template: `<r-radio v-bind="args" />`,
})

const TemplateDark = (args) => ({
  components: { RRadio },
  setup() {
    setThemeModeDark()
    return { args }
  },
  template: `<div class="dark:bg-gray-800 h-20"><r-radio v-bind="args" /></div>`,
})

export const Default = TemplateDefault.bind({})
Default.args = {
  name: 'radioTest',
  items: [
    { label: 'Pracownik sklepu', value: 'radio1' },
    { label: 'Pracownik ochrony', value: 'radio2' },
    { label: 'Pracownik uczący się', value: 'radio3' },
    { label: 'Pracownik zewnętrzny', value: 'radio4' },
    { label: 'Pracownik centrala', value: 'radio5' },
  ],
}

export const Dark = TemplateDark.bind({})
Dark.args = {
  name: 'radioTest',
  items: [
    { label: 'Pracownik sklepu', value: 'radio1' },
    { label: 'Pracownik ochrony', value: 'radio2' },
    { label: 'Pracownik uczący się', value: 'radio3' },
    { label: 'Pracownik zewnętrzny', value: 'radio4' },
    { label: 'Pracownik centrala', value: 'radio5' },
  ],
}
