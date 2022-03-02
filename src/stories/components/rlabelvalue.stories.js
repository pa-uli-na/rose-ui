import RLabelValue from '../../components/RLabelValue/RLabelValue.vue'

export default {
  title: 'components/RLabelValue',
  component: RLabelValue,
}

const TemplateDefault = (args) => ({
  components: { RLabelValue },
  setup() {
    return { args }
  },
  template: `<r-label-value v-bind="args" />`,
})

export const Default = TemplateDefault.bind({})
Default.args = {
  label: 'Dan',
  value: '12345678',
}
