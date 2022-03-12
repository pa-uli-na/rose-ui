<template>
  <div
    :class="[
      inputRoundRef,
      inputDisabledRef,
      'relative my-2 text-primary border-2 focus-within:border-primary focus-within:text-primary transition-all duration-500 dark:text-primary-light dark:focus-within:border-primary-light',
    ]"
  >
    <div :class="['absolute px-1 uppercase w-full', labelSizeType]">
      <label for="name" :class="['ml-1 font-semibold', labelRef]">
        <slot>{{ label }}</slot>
      </label>
    </div>
    <input
      :id="id"
      ref="input"
      :aria-label="label"
      :autocomplete="autocompleteRef"
      :autofocus="autofocus"
      :class="[
        inputRoundRef,
        'w-full h-full outline-none text-black dark:text-white pl-3',
        ,
        inputSizeType,
      ]"
      :disabled="disabled"
      :max="maxValue"
      :min="minValue"
      :maxLength="maxLength"
      :name="name"
      :placeholder="placeholder"
      :type="type"
      :value="modelValue"
      @input="handleInput"
      @keydown="() => $emit('keydown')"
      @focus="() => $emit('focus')"
      @focusout="() => $emit('focusout')"
      @keydown.enter="() => $emit('enter')"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { RInputInstance, RInputProps } from "./types";
import { SizeType, SizeTypes, StateType, StateTypes } from "../global-types";

export default defineComponent({
  name: "RInput",
  props: {
    modelValue: {
      type: String,
      required: false,
      default: undefined,
    },
    autocomplete: {
      type: Boolean,
      required: false,
      default: false,
    },
    autofocus: {
      type: Boolean,
      required: false,
      default: false,
    },
    badge: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    id: {
      type: String,
      required: false,
      default: "sampleID",
    },
    label: {
      type: String,
      required: false,
      default: undefined,
    },
    maxLength: {
      type: Number,
      required: false,
      default: 50,
    },
    maxValue: {
      type: Number,
      required: false,
      default: 9999999999999,
    },
    minValue: {
      type: Number,
      required: false,
      default: undefined,
    },
    name: {
      type: String,
      required: false,
      default: undefined,
    },
    placeholder: {
      type: String,
      required: false,
      default: undefined,
    },
    // required: {
    //   type: Boolean,
    //   required: false,
    //   default: false,
    // },
    rounded: {
      type: Boolean,
      required: false,
      default: true,
    },
    size: {
      type: String,
      required: false,
      default: "medium",
    },
    type: {
      type: String,
      required: false,
      default: "text",
    },
  },
  emits: [
    "enter",
    "focus",
    "focusout",
    "input",
    "keydown",
    "update:modelValue",
  ],
  setup(props: RInputProps, { emit }): RInputInstance {
    const inputRoundRef = computed(() =>
      props.rounded === true ? `rounded-lg` : ""
    );
    const inputDisabledRef = computed(() =>
      props.disabled ? "bg-secondary-light text-secondary" : ""
    );
    const autocompleteRef = computed(() =>
      props.autocomplete === true ? "on" : "off"
    );

    const labelRef = computed(() =>
      props.disabled
        ? "bg-white text-secondary px-1"
        : props.badge === true
        ? "bg-primary text-white rounded-md px-2"
        : "bg-white dark:bg-gray-800 px-1 font-normal"
    );

    const labelSizeType = computed(() => {
      switch (props.size) {
        case SizeTypes.small:
          return "text-xs -mt-2";
        case SizeTypes.large:
          return "text-xl -mt-4";
        default:
          return "-mt-3";
      }
    });

    const inputSizeType = computed(() => {
      switch (props.size) {
        case SizeTypes.small:
          return "h-5 mt-2 text-xs";
        case SizeTypes.large:
          return "h-8 mt-3 text-lg";
        default:
          return "h-8 mt-3";
      }
    });

    function handleInput(e: Event) {
      const element = e.target as HTMLInputElement;
      const value = element?.value;
      emit(`update:modelValue`, value);
    }

    return {
      autocompleteRef,
      inputDisabledRef,
      inputRoundRef,
      inputSizeType,
      labelRef,
      labelSizeType,
      handleInput,
    };
  },
});
</script>

<style scoped>
/* HIDE ARROWS */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
</style>
