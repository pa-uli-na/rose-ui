import RRadioTile from '../../components/RRadioTile/RRadioTile.vue'
import '../../theme/index.css'

export default {
  title: 'components/RRadioTile',
  component: RRadioTile,
}

const TemplateDefault = (args) => ({
  components: { RRadioTile },
  setup() {
    return { args }
  },
  template: `<r-radio-tile v-bind="args" />`,
})

export const Default = TemplateDefault.bind({})
Default.args = {
  items: [
    { label: 'Pracownik sklepu', value: 'radio1', icon: 'fas fa-user' },
    { label: 'Pracownik ochrony', value: 'radio2', icon: 'fas fa-user-shield' },
    {
      label: 'Pracownik uczący się',
      value: 'radio3',
      icon: 'fas fa-user-graduate',
    },
    {
      label: 'Pracownik zewnętrzny',
      value: 'radio4',
      icon: 'fas fa-user-secret',
    },
    { label: 'Pracownik centrala', value: 'radio5', icon: 'fas fa-user-tie' },
  ],
}
