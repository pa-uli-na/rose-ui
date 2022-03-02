import RImage from '../../components/RImage/RImage.vue'
import '../../theme/index.css'

export default {
  title: 'components/RImage',
  component: RImage,
}

const TemplateDefault = (args) => ({
  components: { RImage },
  setup() {
    return { args }
  },
  template: `<r-image v-bind="args" />`,
})

import articleImg from '../../assets/article.png'
import articleImg2 from '../../assets/article2.png'
export const Default = TemplateDefault.bind({})
Default.args = {
  src: articleImg,
}

export const Horizontal = TemplateDefault.bind({})
Horizontal.args = {
  src: articleImg2,
}
