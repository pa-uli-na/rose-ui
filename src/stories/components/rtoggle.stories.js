import RToggle from '../../components/RToggle/RToggle.vue'
import '../../theme/index.css'

export default {
  title: 'components/RToggle',
  component: RToggle,
}

const TemplateDefault = (args) => ({
  components: { RToggle },
  setup() {
    return { args }
  },
  template: `<r-toggle v-bind="args" />`,
})

export const Default = TemplateDefault.bind({})
Default.args = {
  options: ['Option 1', 'Option 2'],
  modelValue: 'Option 1',
}
