<template>
  <slot name="openButton" :click="toggleModal"></slot>

  <div
    v-if="showModal"
    class="px-2 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
    <div class="relative w-full my-3 mx-auto max-w-sm">
      <div
        class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        <div
          class="flex justify-between items-center p-2 border-b border-solid border-gray-200 rounded-t">
          <span class="text-xl font-bold">
            <slot name="title">{{ title }}</slot>
          </span>
          <r-button :flat="true" @click="toggleModal">X</r-button>
        </div>

        <div class="relative py-2 px-2 flex-auto">
          <slot name="body" />
        </div>

        <div
          class="flex items-center justify-end p-2 border-t border-solid border-gray-200 rounded-b">
          <r-button
            v-if="okButton"
            @click="toggleModal"
            :outlined="okButton.outlined"
            :flat="okButton.flat"
            :type="okButton.type"
            :size="okButton.size"
            :disabled="okButton.disabled"
            >{{ okButton.text ?? 'Ok' }}</r-button
          >
          <r-button
            v-if="cancelButton"
            @click="toggleModal"
            :outlined="cancelButton.outlined"
            :flat="cancelButton.flat"
            :type="cancelButton.type"
            :size="cancelButton.size"
            :disabled="cancelButton.disabled"
            >{{ cancelButton.text ?? 'Cancel' }}</r-button
          >
        </div>
      </div>
    </div>
  </div>

  <div v-if="showModal" class="opacity-50 fixed inset-0 z-40 bg-black"></div>
</template>

<script lang="ts">
import '../../theme/index.css'
import { defineComponent, PropType, ref } from 'vue'
import RButton from '../../components/RButton/RButton.vue'
import RImage from '../../components/RImage/RImage.vue'
import { RModalButton, RModalInstance, RModalProps } from './types'

export default defineComponent({
  name: 'RModal',
  components: {
    RButton,
    RImage,
  },
  props: {
    okButton: { type: Object as PropType<RModalButton>, default: null },
    cancelButton: { type: Object as PropType<RModalButton>, default: null },
    title: { type: String, default: '' },
  },
  setup(props: RModalProps): RModalInstance {
    const showModal = ref(false)
    function toggleModal() {
      showModal.value = !showModal.value
    }
    return { showModal, toggleModal }
  },
})
</script>
