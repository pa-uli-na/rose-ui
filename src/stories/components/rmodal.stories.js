import RModal from '../../components/RModal/RModal.vue'
import RButton from '../../components/RButton/RButton.vue'
import RImage from '../../components/RImage/RImage.vue'

import '../../theme/index.css'

export default {
  title: 'components/RModal',
  component: RModal,
  subcomponents: { RButton },
}

const TemplateDefault = (args) => ({
  components: { RModal, RButton },
  setup() {
    return { args }
  },
  template: `
  <r-modal v-bind="args">
    <template #openButton="{ click }">
      <r-button @click="click">Open modal</r-button>
    </template>
    <template #body>
      Lorem ipsum...
    </template>
  </r-modal>`,
})

const okButton = {
  text: 'Ok',
}

const confirmButton = {
  text: 'Confirm',
  type: 'success',
}

const cancelButton = {
  type: 'secondary',
  text: 'Cancel',
}

export const Default = TemplateDefault.bind({})
Default.args = {
  title: 'Modal title',
  okButton,
}

export const OkAndCancel = TemplateDefault.bind({})
OkAndCancel.args = {
  title: 'Modal title',
  okButton,
  cancelButton,
}

export const ConfirmAndCancel = TemplateDefault.bind({})
ConfirmAndCancel.args = {
  title: 'Modal title',
  okButton: confirmButton,
  cancelButton,
}

import articleImg from '../../assets/article.png'
import articleImg2 from '../../assets/article2.png'
const TemplateImage = (args) => ({
  components: { RModal, RButton, RImage },
  setup() {
    return { args }
  },
  template: `
  <div class="flex">
  <r-modal v-bind="args">
    <template #openButton="{ click }">
      <r-image :src="'${articleImg}'" @click="click"></r-image>
    </template>
    <template #body>
      <r-image :src="'${articleImg}'" :maxWidth="" :maxHeight="'350px'"></r-image>
    </template>
  </r-modal>
  
  
  <r-modal v-bind="args">
    <template #openButton="{ click }">
      <r-image :src="'${articleImg2}'" @click="click"></r-image>
    </template>
    <template #body>
      <r-image :src="'${articleImg2}'" :maxWidth="" :maxHeight="'350px'"></r-image>
    </template>
  </r-modal>
  </div>`,
})

// export const Image = TemplateImage.bind({})
// Image.args = {
//   title: 'Article name',
//   okButton: { text: 'Ok' },
// }
