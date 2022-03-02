import { RTable } from '../../components/RTable'
import { RInput } from '../../components/RInput'
import '../../theme/index.css'
import { data } from './rtable.stories.mock.json'

export default {
  title: 'components/RTable',
  component: RTable,
  subcomponents: { RInput },
}

const TemplateDefault = (args) => ({
  components: { RTable },
  setup() {
    return { args }
  },
  template: `<r-table v-bind="args" />`,
})

export const Default = TemplateDefault.bind({})
Default.args = {
  data,
}

const TemplateSearch = (args) => ({
  components: { RTable, RInput },
  setup() {
    return { args }
  },
  template: `
  <r-table v-bind="args" grid>
    <template #top>
      <r-input label="Szukaj"></r-input>
    </template>
  </r-table>`,
})

export const Search = TemplateSearch.bind({})
Search.args = {
  data,
}
