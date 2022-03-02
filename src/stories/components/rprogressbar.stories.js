import RProgressBar from '../../components/RProgressBar/RProgressBar.vue'
import '../../theme/index.css'

export default {
  title: 'components/RProgressBar',
  component: RProgressBar,
}

const TemplateDefault = (args) => ({
  components: { RProgressBar },
  setup() {
    return { args }
  },
  template: `<r-progress-bar v-bind="args" />`,
})

const values = [{ name: 'Value', value: 10, color: '#c8102e' }]

export const Default = TemplateDefault.bind({})
Default.args = {
  title: 'Title of progress bar',
  progressValues: values,
  legend: false,
}

export const Legend = TemplateDefault.bind({})
Legend.args = {
  title: 'Title of progress bar',
  progressValues: values,
  legend: true,
}

export const CustomSumText = TemplateDefault.bind({})
CustomSumText.args = {
  title: 'Title of progress bar',
  progressValues: values,
  legend: false,
  sumText: '10 / 100 szt.',
}

const multiWidths = [
  { name: 'Value 1', value: 10, color: '#c8102e' },
  { name: 'Value 2', value: 20, color: 'darkred' },
]

export const Multi = TemplateDefault.bind({})
Multi.args = {
  title: 'Title of progress bar',
  progressValues: multiWidths,
}

const multiWidthsCustom = [
  { name: 'Value 1', value: 10, color: '#c8102e', valueText: '10 szt.' },
  { name: 'Value 2', value: 20, color: 'darkred', valueText: '20 szt.' },
]

export const MultiCustomText = TemplateDefault.bind({})
MultiCustomText.args = {
  title: 'Title of progress bar',
  sumText: '30 / 100 szt.',
  progressValues: multiWidthsCustom,
}
