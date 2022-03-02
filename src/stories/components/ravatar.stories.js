import { RAvatar } from '../../components/RAvatar'
import '../../theme/index.css'

export default {
  title: 'components/RAvatar',
  component: RAvatar,
}

const TemplateDefault = (args) => ({
  components: { RAvatar },
  setup() {
    return { args }
  },
  template: `<r-avatar v-bind="args" />`,
})

export const Default = TemplateDefault.bind({})
Default.args = {}
