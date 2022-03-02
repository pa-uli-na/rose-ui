<template>
  <r-navbar
    logo-text="LOGO"
    :navbar-data="navData"
    :user-name="'Jan Kowalski'"
    :logout="
      () => {
        console.log('logout')
      }
    ">
    <r-link>
      <r-icon type="regular" name="fab fa-facebook-square"></r-icon>
      <span>Link 1</span>
    </r-link>
    <r-link>
      <r-icon type="regular" name="fab fa-twitter"></r-icon>
      <span>Link 2</span>
    </r-link>
    <r-link>
      <r-icon type="regular" name="fab fa-twitter"></r-icon>
      <span>Link 3</span>
    </r-link>
  </r-navbar>

  <div class="flex flex-wrap bg-white dark:bg-gray-800">
    <div class="relative px-2 pt-2 w-full">
      <r-input
        :autofocus="true"
        :badge="true"
        :filled="true"
        class="w-full"
        id="scannedcode-input"
        :size="'medium'"
        type="number"
        v-model="scannedCode"
        @enter="scan"
        @focus="focusInputListiner"
        @focusout="focusOutInputListiner"
        @input="keyDownListiner"
        label="ZESKANUJ KOD ARTYKUŁU">
      </r-input>
      <r-label-value
        class="-mt-2 mb-1"
        :label="'Last searched:'"
        :value="lastSearchedCodeRef"
        :align-label="'left'"
        :size="'small'"></r-label-value>
    </div>

    <div class="flex flex-wrap w-full border-t" v-if="articleData">
      <div class="w-full p-1">
        <m-article-information
          :dan="articleData.dan"
          :ean="articleData.ean"
          :layout-name="articleData.group"
          :name="articleData.name"
          :price="articleData.price"
          :total-stock="articleData.totalStock">
        </m-article-information>
        <m-article-flags :flags="articleData.flags"></m-article-flags>
      </div>
    </div>
    <r-tabs v-model="activeTabRef" v-if="articleData">
      <r-tab name="warehouse">
        <template #title>
          Magazyn
          <r-badge outlined>{{ articleData?.totalWms ?? 0 }} szt.</r-badge>
        </template>
      </r-tab>
      <r-tab name="saleroom">
        <template #title>
          Sala sprzedaży
          <r-badge outlined>{{ articleData?.totalSaleRoom ?? 0 }} szt.</r-badge>
        </template>
      </r-tab>
    </r-tabs>
  </div>
  <r-footer app-version="Application name 1.0.0"></r-footer>
</template>

<script lang="ts">
import { defineComponent, onMounted, onDeactivated, ref } from 'vue'
import {
  MArticleInformation,
  MArticleFlags,
  RBadge,
  RButton,
  RCard,
  RFooter,
  RIcon,
  RInput,
  RImageModal,
  RLabelValue,
  RLink,
  RModal,
  RNavbar,
  RProgressBar,
  RSwitch,
  RTab,
  RTabs,
} from '../../components/components'

import { data as navbarData } from '../../stories/components/rnavbar.mock.json'
import { data } from './mockArticleData.json'
export default defineComponent({
  name: 'RDashboardPage',
  components: {
    MArticleInformation,
    MArticleFlags,

    RBadge,
    RButton,
    RCard,
    RFooter,
    RIcon,
    RInput,
    RImageModal,
    RLabelValue,
    RLink,
    RModal,
    RNavbar,
    RProgressBar,
    RSwitch,
    RTab,
    RTabs,
  },
  setup() {
    const activeTabRef = ref('warehouse')
    const lastSearchedCodeRef = ref('')
    const scannedCode = ref('')

    const articleData = ref()
    const navData = ref(navbarData)

    function focusInputListiner() {
      scannedCode.value = ''
    }

    function focusOutInputListiner() {
      scannedCode.value = ''
    }

    function scan() {
      lastSearchedCodeRef.value = scannedCode.value
      articleData.value = data.find(
        (art) =>
          art.dan.toString() === scannedCode.value ||
          art.ean.toString() === scannedCode.value
      )
      scannedCode.value = ''
    }

    function keyDownListiner(event: KeyboardEvent) {
      const eventEl = event.target as Element
      // alert(eventEl.id)
      if (eventEl.id !== 'scannedcode-input') {
        // const element = document.activeElement as HTMLElement
        // element.blur()

        const key = event.key
        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key)) {
          scannedCode.value += key
        }

        if (key === 'Backspace')
          scannedCode.value = scannedCode.value.substring(
            0,
            scannedCode.value.length - 1
          )

        if (key === 'Enter') {
          event.preventDefault()
          scan()
        }
      }
    }

    function showLocalisationWeights(id: string): void {
      document.querySelector(`#${id}`)?.classList.toggle('hidden')
    }

    onMounted(() => startListenScan())
    onDeactivated(() => stopListenScan())

    function startListenScan() {
      document.addEventListener('keydown', keyDownListiner)
    }

    function stopListenScan() {
      document.removeEventListener('keydown', keyDownListiner)
    }

    return {
      articleData,
      activeTabRef,
      lastSearchedCodeRef,
      navData,
      scannedCode,
      focusInputListiner,
      focusOutInputListiner,
      keyDownListiner,
      scan,
      showLocalisationWeights,
    }
  },
})
</script>
