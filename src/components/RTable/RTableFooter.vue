<template>
  <div
    class="w-full flex flex-col md:flex-row text-center sm:text-left md:justify-between">
    <div class="w-full text-sm">
      Wyświetlono
      {{
        computedPagination.rowsPerPage > filteredSortedRowsNumber
          ? filteredSortedRowsNumber
          : computedPagination.rowsPerPage
      }}
      z {{ filteredSortedRowsNumber }} rekordów
      <span v-if="rowsSelectedNumber"
        >(zaznaczone {{ rowsSelectedNumber }})</span
      >
    </div>
    <div class="w-full">
      <r-button
        :disabled="isFirstPage"
        :class="[
          'text-xl border-transparent disabled:text-grey-light disabled:cursor-not-allowed',
          isFirstPage
            ? 'hover:border-transparent'
            : 'hover:border-grey dark:bg-gray-900',
        ]"
        @click="onPrevPage">
        <r-icon name="fas fa-angle-left"></r-icon>
      </r-button>
      <template v-for="(pag, index) in pagination" :key="`${pag.val}${index}`">
        <template v-if="pag.type === 'btn'">
          <r-button
            :class="[
              'py-0 px-2.5 my-2 mx-0.5 text-sm border-transparent hover:text-white',
              pag.active
                ? 'text-white bg-sts border-sts'
                : 'hover:bg-sts hover:border-sts',
            ]"
            @click="setPagination({ page: (pag.val as number) })">
            {{ pag.val }}
          </r-button>
        </template>
        <template v-else>
          <span class="p-1">{{ pag.val }}</span>
        </template>
      </template>
      <r-button
        :disabled="isLastPage"
        :class="[
          'text-xl border-transparent disabled:text-grey-light disabled:cursor-not-allowed',
          isLastPage
            ? 'hover:border-transparent'
            : 'hover:border-grey dark:bg-gray-900',
        ]"
        @click="onNextPage">
        <r-icon name="fas fa-angle-right"></r-icon>
      </r-button>
    </div>
    <div class="w-full ml-2 flex items-center text-xs">
      <div class="mr-2 w-1/3 sm:w-2/3 text-right">Wierszy na stronie</div>
      <r-select
        :modelValue="rowsPerPageModel"
        @update:modelValue="onChangeRowsPerPage"
        :options="computedRowsPerPageOptions"
        :optionLabel="(option) => option.label"
        :optionValue="(option) => option.value"
        class="border border-grey-light hover:border-grey w-2/3 sm:w-1/3"
        style="min-width: 55px"></r-select>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { SetPagination, TablePropsPagination } from './types'
import RButton from '../RButton/RButton.vue'
import RIcon from '../RIcon/RIcon.vue'
import RSelect from '../RSelect/RSelect.vue'

type Pagination = {
  type: 'btn' | 'span'
  val: string | number
  active: boolean
}

export default defineComponent({
  name: 'RTableBottom',
  components: { RButton, RSelect, RIcon },
  props: {
    rowsSelectedNumber: {
      type: Number,
      required: true,
    },
    computedPagination: {
      type: Object as PropType<TablePropsPagination>,
      required: true,
    },
    filteredSortedRowsNumber: {
      type: Number,
      required: true,
    },
    setPagination: {
      type: Function as PropType<SetPagination>,
      required: true,
    },
    pagesNumber: {
      type: Number,
      required: true,
    },
    nextPage: {
      type: Function,
      required: true,
    },
    prevPage: {
      type: Function,
      required: true,
    },
    isFirstPage: {
      type: Boolean,
      required: true,
    },
    isLastPage: {
      type: Boolean,
      required: true,
    },
    computedRowsPerPageOptions: {
      type: Array as PropType<{ label: string; value: number }[]>,
      required: true,
    },
  },
  setup(props) {
    const text = ref<string>('')
    const pagination = computed<Pagination[]>(() => {
      if (props.pagesNumber > 1) {
        if (props.pagesNumber < 5) {
          const paginationData: Pagination[] = []
          for (let page = 1; page <= props.pagesNumber; page++) {
            paginationData.push({
              type: 'btn',
              val: page,
              active: props.computedPagination.page === page,
            })
          }
          return paginationData
        }

        if (
          props.computedPagination.page - 1 === 0 ||
          props.computedPagination.page === props.pagesNumber
        ) {
          return [1, 2, '...', props.pagesNumber - 1, props.pagesNumber].map(
            (page) => ({
              type: typeof page === 'string' ? 'span' : 'btn',
              val: page,
              active:
                typeof page === 'string'
                  ? false
                  : props.computedPagination.page === page,
            })
          )
        }

        const paginationData: Pagination[] = [
          {
            type: 'btn',
            val: props.computedPagination.page - 1,
            active: false,
          },
          { type: 'btn', val: props.computedPagination.page, active: true },
          {
            type: 'btn',
            val: props.computedPagination.page + 1,
            active: false,
          },
        ]

        if ((paginationData[0].val as number) - 1 > 2) {
          ;['...', 2, 1].forEach((page) =>
            paginationData.unshift({
              type: typeof page === 'string' ? 'span' : 'btn',
              val: page,
              active: false,
            })
          )
        } else {
          for (let i = (paginationData[0].val as number) - 1; i > 0; i--) {
            paginationData.unshift({
              type: 'btn',
              val: i,
              active: false,
            })
          }
        }

        if (
          (paginationData[paginationData.length - 1].val as number) <
          props.pagesNumber - 1
        ) {
          if (
            props.pagesNumber -
              (paginationData[paginationData.length - 1].val as number) >
            2
          ) {
            paginationData.push({
              type: 'span',
              val: '...',
              active: false,
            })
          }
          ;[props.pagesNumber - 1, props.pagesNumber].forEach((page) =>
            paginationData.push({
              type: 'btn',
              val: page,
              active: false,
            })
          )
        } else {
          for (
            let i =
              (paginationData[paginationData.length - 1].val as number) + 1;
            i <= props.pagesNumber;
            i++
          ) {
            paginationData.push({
              type: 'btn',
              val: i,
              active: false,
            })
          }
        }

        return paginationData
      } else {
        return [{ type: 'btn', val: 1, active: true }]
      }
    })

    const rowsPerPageModel = ref(props.computedRowsPerPageOptions[0])

    function onChangeRowsPerPage(newVal: { label: string; value: number }) {
      props.setPagination({ rowsPerPage: newVal.value })
      rowsPerPageModel.value = newVal
    }

    function onPrevPage() {
      props.prevPage()
    }

    function onNextPage() {
      props.nextPage()
    }

    return {
      text,
      pagination,
      rowsPerPageModel,
      onChangeRowsPerPage,
      onPrevPage,
      onNextPage,
    }
  },
})
</script>
