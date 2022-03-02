import { Ref } from 'vue'

export interface RModalButton {
  type?: string
  text?: string
  size?: string
  outlined?: boolean
  flat?: boolean
  disabled?: boolean
}

export interface RModalProps {
  openButton?: RModalButton
  okButton?: RModalButton
  cancelButton?: RModalButton
  title?: string
}

export interface RModalInstance {
  showModal: Ref<boolean>
  toggleModal: () => void
}
