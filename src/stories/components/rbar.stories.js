import RBar from '../../components/RBar/RBar.vue'
import '../../theme/index.css'

export default {
  title: 'components/RBar',
  component: RBar,
}

const TemplateDefault = (args) => ({
  components: { RBar },
  setup() {
    return { args }
  },
  template: `<r-bar v-bind="args" />`,
})

const values = [{ color: 'red', value: 10 }]

export const Default = TemplateDefault.bind({})
Default.args = {
  values,
  totalValue: 40,
}

const multiValues = [
  { color: 'red', value: 10 },
  { color: 'darkred', value: 20 },
]

export const Multi = TemplateDefault.bind({})
Multi.args = {
  values: multiValues,
  totalValue: 200,
}
