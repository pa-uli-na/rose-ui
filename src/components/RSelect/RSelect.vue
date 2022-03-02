<template>
  <div
    ref="refSelect"
    :class="[
      'relative block w-full px-1 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out',
      classes,
      $attrs.class,
    ]"
    :data-ref="'rselect-' + uid"
    indextab="-1">
    <div class="flex" @click="toggleShowOptions">
      <div class="px-1 flex w-full">
        <div
          :class="[
            'max-w-full flex-1 flex flex-wrap',
            { 'flex-col': inputShowing },
          ]">
          <div>
            <slot name="selected">
              <div class="h-full flex items-center text-primary">
                <template v-if="!multiple">
                  {{ getOptionLabel(modelValue) }}
                </template>
                <template v-if="multiple && modelValue">
                  {{ getMultipleOptionsLabel }}
                </template>
              </div>
            </slot>
          </div>
          <div
            v-if="inputShowing"
            class="flex-auto pl-1 flex items-center mt-1">
            <input
              ref="refInput"
              v-model="inputValue"
              class="w-full border-none outline-none focus:border-none focus:outline-none focus:ring-0 focus:ring-transparent h-6" />
          </div>
        </div>
        <div class="r-select__control-append pl-2 flex items-center h-8">
          <r-icon name="arrow_drop_down"></r-icon>
        </div>
      </div>
    </div>
    <teleport v-if="optionsShowing" to="body">
      <div
        ref="refOptions"
        :id="'selector-options-' + uid"
        class="fixed bg-white shadow-md focus:outline-none overflow-y-auto"
        :style="[{ ...optionsStyle }, 'z-index: 99999']"
        tabindex="-1">
        <template
          v-for="(option, index) in filteredOptions"
          :key="option + '-' + index">
          <slot name="option" :props="{ option, index, toggleOption }">
            <div
              tabindex="-1"
              :class="[
                'w-full flex justify-center text-center items-center px-2 py-1 cursor-pointer hover:bg-gray-100 hover:text-primary focus:bg-grey-light focus:text-black focus:outline-none',
                { ' text-primary': isOptionSelected(option) },
              ]"
              @click="toggleOption(option)">
              {{ getOptionLabel(option) }}
            </div>
          </slot>
        </template>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import {
  ComponentInternalInstance,
  computed,
  defineComponent,
  getCurrentInstance,
  nextTick,
  onUnmounted,
  PropType,
  ref,
  watch,
} from 'vue'

import RIcon from '../RIcon/RIcon.vue'

export default defineComponent({
  name: 'RSelect',

  inheritAttrs: false,

  components: { RIcon },

  props: {
    modelValue: { type: [Number, String, Array, Object], required: true },
    useInput: { type: Boolean, default: false },
    options: {
      /** TODO: make it work with objects https://next.quasar.dev/vue-components/select#introduction */
      type: Array as PropType<(number | string | Record<string, unknown>)[]>,
      required: true,
    },
    /** required if options are objects */
    optionLabel: { type: Function as PropType<(option: any) => string> },
    /** required if options are objects */
    optionValue: {
      type: Function as PropType<(option: any) => unknown>,
    },
    multiple: { type: Boolean, required: false },
    clearable: { type: Boolean, default: false },
    outlined: { type: Boolean, default: false },
    filled: { type: Boolean, default: false },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const { uid } = getCurrentInstance() as ComponentInternalInstance
    const refSelect = ref<HTMLElement | null>(null)
    const refOptions = ref<HTMLElement | null>(null)
    const refInput = ref<HTMLElement | null>(null)

    const optionsShowing = ref<boolean>(false)
    const inputShowing = computed<boolean>(
      () => optionsShowing.value && props.useInput
    )

    const inputValue = ref<string>('')

    watch(inputValue, (val) => {
      if (!optionsShowing.value && val !== '') {
        processShow()
      }
    })

    const classes = computed(() => ({
      'r-select--filled': props.filled,
      'r-select--outlined': !props.filled && props.outlined,
      'r-select--focused': optionsShowing.value,
    }))

    const optionsStyle = computed(() => {
      if (!refSelect.value || !refOptions.value) {
        return {}
      } else {
        const { top, left, width, height } =
          refSelect.value.getBoundingClientRect()
        const { height: optionsHeight } =
          refOptions.value.getBoundingClientRect()

        const maxOptionsHeight =
          window.innerHeight / 2 -
          height +
          /** Additional padding to top/bottom */ 25

        const newOptionsHeight =
          optionsHeight > maxOptionsHeight ? maxOptionsHeight : optionsHeight

        const styles = {
          width: width + 'px',
          left: left + 'px',
          height: newOptionsHeight + 'px',
        }

        if (window.innerHeight < height + top + newOptionsHeight) {
          Object.assign(styles, { top: top - newOptionsHeight + 'px' })
        } else {
          Object.assign(styles, { top: height + top + 'px' })
        }

        return styles
      }
    })

    const isOptionObject: boolean =
      Object(props.options[0]) === props.options[0]

    function getOptionValue(option: unknown) {
      if (props.optionValue !== void 0) {
        return props.optionValue(option)
      }

      if (isOptionObject) {
        throw Error('option is an object! optionValue - required')
      }

      return option
    }

    function getOptionLabel(option: unknown) {
      if (props.optionLabel !== void 0) {
        return props.optionLabel(option)
      }

      if (isOptionObject) {
        throw Error('option is an object! optionLabel - required')
      }

      return option
    }

    const selectedOptions = computed<Record<string, boolean>>(() => {
      if (props.modelValue === null || props.modelValue === '') return {}

      if (Array.isArray(props.modelValue)) {
        if (props.modelValue.length === 0) return {}

        return props.modelValue.reduce<Record<string, boolean>>(
          (acc, option) => {
            acc[String(getOptionValue(option))] = true
            return acc
          },
          {}
        )
      }

      return { [String(props.modelValue)]: true }
    })

    const filteredOptions = computed(() => {
      return props.useInput && inputValue.value !== ''
        ? props.options.filter(
            (option) =>
              String(getOptionLabel(option)).indexOf(inputValue.value) !== -1
          )
        : props.options
    })

    function onKeydown(e: KeyboardEvent): void {
      const key = e.key
      if (key === 'Escape') {
        e.preventDefault() // leave focus on input
        processHide()
      } else {
        // TODO : ArrowDown, ArrowUp, Enter
      }
    }

    function onClickOutside(e: MouseEvent) {
      if (
        !refSelect.value?.contains(e.target as Node) &&
        !refOptions.value?.contains(e.target as Node)
      ) {
        processHide()
      }
    }

    function processShow(): void {
      optionsShowing.value = true
      document.addEventListener('keydown', onKeydown)
      document.addEventListener('click', onClickOutside)
      nextTick(() => {
        if (props.useInput) {
          refInput.value?.focus()
        } else {
          ;(refOptions.value?.firstElementChild as HTMLElement)?.focus()
        }
      })
    }

    function processHide(clearInput = true): void {
      optionsShowing.value = false
      if (clearInput) {
        inputValue.value = ''
      }
      document.removeEventListener('keydown', onKeydown)
      document.removeEventListener('click', onClickOutside)
    }

    function toggleShowOptions(e: Event): void {
      if (optionsShowing.value) {
        processHide(false)
      } else {
        processShow()
      }
    }

    function toggleOption(option: unknown): void {
      refOptions.value?.focus()
      const optionValue = getOptionValue(option)
      if (props.multiple) {
        if (props.modelValue === null) {
          emit('update:modelValue', [option])
        } else {
          const modelValue = props.modelValue as unknown[]
          let newModelValue = []

          if (selectedOptions.value[String(optionValue)] !== void 0) {
            newModelValue = modelValue.filter(
              (modelOption) => getOptionValue(modelOption) !== optionValue
            )
          } else {
            newModelValue = [...modelValue, option]
          }

          emit('update:modelValue', newModelValue)
        }
      } else {
        const newModelValue =
          selectedOptions.value[String(optionValue)] !== void 0 ? null : option

        processHide()
        emit('update:modelValue', newModelValue)
      }
    }

    function isOptionSelected(option: unknown) {
      return selectedOptions.value[String(option)] !== void 0
    }

    const getMultipleOptionsLabel = computed(() => {
      if (
        typeof props.modelValue !== 'string' &&
        typeof props.modelValue !== 'number'
      ) {
        props.modelValue.map((mv: unknown) => getOptionLabel(mv)).join(', ')
      }
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', onKeydown)
      document.removeEventListener('click', onClickOutside)
    })

    return {
      refInput,
      refSelect,
      refOptions,
      filteredOptions,
      optionsShowing,
      getOptionLabel,
      inputValue,
      inputShowing,
      classes,
      optionsStyle,
      toggleShowOptions,
      toggleOption,
      selectedOptions,
      isOptionSelected,
      uid,
      getMultipleOptionsLabel,
    }
  },
})
</script>
