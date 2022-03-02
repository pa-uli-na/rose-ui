<template>
  <div class="flex flex-col sm:flex-row text-black">
    <div class="flex flex-col w-full sm:w-10/12">
      <div class="flex w-full mb-3">
        <div class="leading-snug" style="width: 80%">
          <span
            class="font-bold text-lg leading-tight tracking-tight text-black dark:text-white"
            >{{ name }}</span
          >
        </div>
        <div v-if="imageLink" style="width: 20%">
          <r-image-modal
            class="w-full"
            :title="name"
            :img-src="imageLink"></r-image-modal>
        </div>
      </div>
      <div class="flex flex-row flex-wrap">
        <div class="w-1/2">
          <r-label-value :label="'Dan'" :value="dan"></r-label-value>
        </div>
        <div class="w-1/2">
          <r-label-value :label="'Ean'" :value="ean"></r-label-value>
        </div>
        <div v-if="expirationDate" class="w-1/2">
          <r-label-value
            :label="'Data ważności'"
            :value="`${expirationDate}`"></r-label-value>
        </div>
        <div v-if="price" class="w-1/2">
          <r-label-value :label="'Cena'" :value="`${price} zł`"></r-label-value>
        </div>
        <div v-if="totalStock" class="w-1/2">
          <r-label-value
            :label="'Stok całkowity'"
            :value="`${totalStock ?? 0} szt.`">
            <r-badge>{{ `${totalStock ?? 0} szt.` }}</r-badge>
          </r-label-value>
        </div>
        <div v-if="layoutName" class="w-full">
          <r-label-value
            :label="'Nazwa layoutu'"
            :value="layoutName"></r-label-value>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RImageModal } from '../RImageModal'
import { RLabelValue } from '../RLabelValue'
import { RBadge } from '../RBadge'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MArticleInformation',
  components: { RBadge, RImageModal, RLabelValue },
  props: {
    dan: { type: [String, Number], default: '', required: true },
    ean: { type: [String, Number], default: '', required: true },
    expirationDate: { type: String, default: '' },
    imageLink: { type: String, default: '' },
    layoutName: { type: String, default: '' },
    name: { type: String, default: '', required: true },
    price: { type: [String, Number], default: '' },
    totalStock: { type: [String, Number], default: '' },
  },
})
</script>
