import RLoginPage from '../../pages/RLoginPage/RLoginPage.vue'
import RLink from '../../components/RLink/RLink.vue'
import '../../theme/index.css'

export default {
  title: 'templates/RLoginPage',
  component: RLoginPage,
  subcomponent: { RLink },
}

const TemplateDefault = (args) => ({
  components: { RLoginPage },
  setup() {
    return { args }
  },
  template: `<r-login-page v-bind="args"></r-login-page>`,
})

export const Base = TemplateDefault.bind({})
Base.args = {}
