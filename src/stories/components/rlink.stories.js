import RLink from '../../components/RLink/RLink.vue'
import '../../theme/index.css'

export default {
  title: 'components/RLink',
  component: RLink,
  argTypes: {
    size: {
      control: { type: 'radio', options: ['small', 'medium', 'large'] },
    },
  },
}

const TemplateDefault = (args) => ({
  components: { RLink },
  setup() {
    return { args }
  },
  template: `<r-link v-bind="args" />`,
})

export const Text = TemplateDefault.bind({})
Text.args = {
  text: 'Link',
  size: 'medium',
}

export const TextWithIcon = TemplateDefault.bind({})
TextWithIcon.args = {
  iconName: 'fas fa-heart',
  text: 'Link',
  size: 'medium',
}

export const Icon = TemplateDefault.bind({})
Icon.args = {
  iconName: 'fas fa-heart',
  text: '',
  size: 'medium',
}
