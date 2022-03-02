<template>
  <r-modal :title="title" :ok-button="{ text: 'Ok' }">
    <template #openButton="{ click }">
      <r-image :class="$attrs.class" :src="imgSrc" @click="click"></r-image>
    </template>
    <template #body>
      <r-image :src="imgSrc" max-height="350px" max-width="350px"></r-image>
    </template>
  </r-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RImage from '../RImage/RImage.vue'
import RModal from '../RModal/RModal.vue'

export default defineComponent({
  name: 'RImageModal',
  components: { RImage, RModal },
  props: {
    title: { type: String, required: true },
    imgSrc: { type: String, required: true },
  },
})
</script>
