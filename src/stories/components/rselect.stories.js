import RSelect from '../../components/RSelect/RSelect.vue'
import '../../theme/index.css'

export default {
  title: 'components/RSelect',
  component: RSelect,
}

const TemplateDefault = (args) => ({
  components: { RSelect },
  setup() {
    return { args }
  },
  template: `<r-select v-bind="args" />`,
})

export const Default = TemplateDefault.bind({})
Default.args = {
  outlined: true,
  modelValue: 'AAA',
  options: ['AAA', 'BBB'],
  //   optionLabel: 'label',
  //   optionValue: 'value',
}
