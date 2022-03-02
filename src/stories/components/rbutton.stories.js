import RButton from '../../components/RButton/RButton.vue'
import RIcon from '../../components/RIcon/RIcon.vue'
import '../../theme/index.css'

export default {
  title: 'components/RButton',
  component: RButton,
  subcomponents: { RIcon },
  argTypes: {
    onClick: { action: 'clicked' },
    size: {
      control: { type: 'radio', options: ['small', 'medium', 'large'] },
    },
    disabled: { control: { type: 'boolean' } },
    rounded: { control: { type: 'boolean' } },
    block: {
      table: {
        disable: true,
      },
    },
    type: {
      table: {
        disable: true,
      },
    },
    outlined: {
      table: {
        disable: true,
      },
    },
  },
}

const Template = (args) => ({
  components: { RButton },
  setup() {
    return { args }
  },
  template: `<div style="display: flex; justify-content: space-evenly">
    <r-button v-bind="args" type="primary">Primary</r-button>
    <r-button v-bind="args" type="secondary">Secondary</r-button>
    <r-button v-bind="args" type="success">Success</r-button>
    <r-button v-bind="args" type="warning">Warning</r-button>
    <r-button v-bind="args" type="danger">Danger</r-button>
    <r-button v-bind="args" type="black">Black</r-button>
    </div>`,
})

export const Default = Template.bind({})
Default.args = {
  size: 'medium',
}

export const Outlined = Template.bind({})
Outlined.args = {
  outlined: true,
  size: 'medium',
}

export const Flat = Template.bind({})
Flat.args = {
  flat: true,
  size: 'medium',
}

const TemplateBlock = (args) => ({
  components: { RButton },
  setup() {
    return { args }
  },
  template: `<r-button v-bind="args" type="primary">Primary</r-button>`,
})

export const Block = TemplateBlock.bind({})
Block.args = {
  size: 'medium',
  block: true,
}

const TemplateWithIcon = (args) => ({
  components: { RButton, RIcon },
  setup() {
    return { args }
  },
  template: `<div style="display: flex; justify-content: space-evenly">
  <r-button v-bind="args" type="primary">
    <r-icon name="fas fa-face-smile"></r-icon> Button
  </r-button> 
  <r-button v-bind="args" type="primary">
    <r-icon name="fas fa-face-smile"></r-icon>
  </r-button> 
  <r-button v-bind="args" type="primary" outlined>
    <r-icon name="fas fa-face-smile"></r-icon> Button
  </r-button>
  <r-button v-bind="args" type="primary" outlined>
    <r-icon name="fas fa-face-smile"></r-icon> 
  </r-button>
  </div>`,
})

export const WithIcon = TemplateWithIcon.bind({})
WithIcon.args = {
  size: 'medium',
}
