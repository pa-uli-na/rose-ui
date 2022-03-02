import RBreadcrumbs from '../../components/RBreadcrumbs/RBreadcrumbs.vue'
import '../../theme/index.css'
import '../../theme/icons.css'
import { setThemeModeDark, setThemeModeLight } from '../../utils/themeToggle'

export default {
  title: 'components/RBreadcrumbs',
  component: RBreadcrumbs,
}

const TemplateDefault = (args) => ({
  components: { RBreadcrumbs },
  setup() {
    setThemeModeLight()
    return { args }
  },
  template: `<r-breadcrumbs v-bind="args" />`,
})

const TemplateDark = (args) => ({
  components: { RBreadcrumbs },
  setup() {
    setThemeModeDark()
    return { args }
  },
  template: `<div class="dark:bg-gray-800 h-20"><r-breadcrumbs v-bind="args" /></div>`,
})

export const Default = TemplateDefault.bind({})
Default.args = {
  breadcrumbs: [
    { text: 'Home', link: '', icon: 'fas fa-house' },
    { text: 'Link 1', link: '', icon: 'fas fa-truck' },
    { text: 'Link 2', link: '', icon: 'fas fa-truck' },
    { text: 'Link 3', link: '', icon: 'fas fa-truck' },
    { text: 'Link 4', link: '', icon: 'fas fa-truck' },
    { text: 'Link 5', link: '', icon: 'fas fa-truck' },
  ],
}

export const Dark = TemplateDark.bind({})
Dark.args = {
  breadcrumbs: [
    { text: 'Home', link: '', icon: 'fas fa-house' },
    { text: 'Link 1', link: '', icon: 'fas fa-truck' },
    { text: 'Link 2', link: '', icon: 'fas fa-truck' },
    { text: 'Link 3', link: '', icon: 'fas fa-truck' },
    { text: 'Link 4', link: '', icon: 'fas fa-truck' },
    { text: 'Link 5', link: '', icon: 'fas fa-truck' },
  ],
}
