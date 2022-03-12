<template>
  <div :class="['r-radio', colorType]">
    <div
      :class="['r-radio__container', sizeType, outlinedRef]"
      v-for="(item, index) in items"
      :key="index"
    >
      <input
        class="r-radio__input"
        type="radio"
        :name="name"
        :disabled="disabled"
        :id="`${item.value}Radio`"
        :value="item.value"
        @change="handleChange(item.value)"
      />
      <label class="r-radio__label" :for="`${item.value}Radio`">{{
        item.label
      }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from "vue";
import { RRadioItem, RRadioInstance, RRadioProps } from "./types";
import { SizeType, SizeTypes, StateType, StateTypes } from "../global-types";

export default defineComponent({
  name: "RRadio",
  props: {
    modelValue: {
      type: String,
      required: false,
      default: undefined,
    },
    name: {
      type: String,
      required: true,
    },
    items: {
      type: Array as PropType<RRadioItem[]>,
      required: true,
      validator: (items: RRadioItem[]) => {
        let isValid = true;
        items.forEach((item: RRadioItem) => {
          isValid = isValid && "label" in item && "value" in item;
        });
        return isValid;
      },
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "medium",
      validator: (value: SizeType) => Object.values(SizeTypes).includes(value),
    },
    type: {
      type: String,
      default: StateTypes.primary,
      validator: (value: StateType) =>
        Object.values(StateTypes).includes(value),
    },
  },
  emits: ["update:modelValue"],
  setup(props: RRadioProps, { emit }): RRadioInstance {
    const outlinedRef = computed(() =>
      props.outlined ? "r-radio--outlined" : ""
    );

    const sizeType = computed(() => {
      switch (props.size) {
        case SizeTypes.small:
          return "r-radio--small";
        case SizeTypes.large:
          return "r-radio--large";
        default:
          return "r-radio--medium";
      }
    });

    const colorType = computed(() => {
      if (props.disabled) return "r-radio--disabled";

      switch (props.type) {
        case StateTypes.secondary:
          return "r-radio--type-secondary";
        case StateTypes.success:
          return "r-radio--type-success";
        case StateTypes.warning:
          return "r-radio--type-warning";
        case StateTypes.danger:
          return "r-radio--type-danger";
        case StateTypes.black:
          return "r-radio--type-black";
        default:
          return "r-radio--type-primary";
      }
    });

    const selectedValue = ref(props.modelValue);
    watch(selectedValue, (newValue, prevValue) => {
      selectedValue.value = newValue;
    });

    function handleChange(value: string) {
      emit(`update:modelValue`, value);
    }

    return {
      colorType,
      outlinedRef,
      selectedValue,
      sizeType,
      handleChange,
    };
  },
});
</script>

<style>
.r-radio {
  @apply flex flex-wrap justify-center;
}

.r-radio__container {
  @apply inline-block p-1 m-1;
}

.r-radio__input {
  @apply appearance-none rounded-full border focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer;
}

.r-radio__label {
  @apply inline-block text-gray-800 dark:text-white;
}

.r-radio__input:checked[type="radio"]:disabled {
  @apply pointer-events-none filter-none;
}

/* OUTLINED */
.r-radio--type-primary .r-radio--outlined {
  @apply border border-primary-light rounded-lg bg-primary-lighter dark:bg-transparent;
}
.r-radio--type-success .r-radio--outlined {
  @apply border border-success-light rounded-lg bg-success-lighter;
}
.r-radio--type-danger .r-radio--outlined {
  @apply border border-danger-light rounded-lg bg-danger-lighter;
}
.r-radio--type-warning .r-radio--outlined {
  @apply border border-warning-light rounded-lg bg-warning-lighter;
}
.r-radio--type-secondary .r-radio--outlined {
  @apply border border-secondary-light rounded-lg bg-white;
}
.r-radio--type-black .r-radio--outlined {
  @apply border border-black rounded-lg bg-secondary-light;
}

/* TYPES */
.r-radio--type-primary .r-radio__label:not(:disabled) {
  @apply hover:text-primary dark:hover:text-primary-light;
}
.r-radio--type-primary .r-radio__input {
  @apply border-primary dark:border-primary-light;
}
.r-radio--type-primary .r-radio__input:checked {
  @apply border-primary dark:border-primary-light;
}

.r-radio--type-success .r-radio__label {
  @apply hover:text-success;
}
.r-radio--type-success .r-radio__input {
  @apply border-success;
}
.r-radio--type-success .r-radio__input:checked {
  @apply border-4 border-success;
}

.r-radio--type-danger .r-radio__label {
  @apply hover:text-danger;
}
.r-radio--type-danger .r-radio__input {
  @apply border-danger;
}
.r-radio--type-danger .r-radio__input:checked {
  @apply border-4 border-danger;
}

.r-radio--type-warning .r-radio__label {
  @apply hover:text-warning;
}
.r-radio--type-warning .r-radio__input {
  @apply border-warning;
}
.r-radio--type-warning .r-radio__input:checked {
  @apply border-4 border-warning;
}

.r-radio--type-secondary .r-radio__label {
  @apply hover:text-secondary;
}
.r-radio--type-secondary .r-radio__input {
  @apply border-secondary;
}
.r-radio--type-secondary .r-radio__input:checked {
  @apply border-4 border-secondary;
}

.r-radio--type-black .r-radio__label {
  @apply hover:text-gray-600;
}
.r-radio--type-black .r-radio__input {
  @apply border-black;
}
.r-radio--type-black .r-radio__input:checked {
  @apply border-4 border-black;
}

/* SIZES */

/* small */
.r-radio--small .r-radio__input {
  @apply h-4 w-4 mt-1 mr-1;
}
.r-radio--large .r-radio__input:checked {
  @apply border-4;
}
.r-radio--small .r-radio__label {
  @apply text-sm;
}
.r-radio--small .r-radio--outlined {
  @apply p-0.5;
}

/* large */
.r-radio--large .r-radio__input {
  @apply h-6 w-6 mt-0.5 mr-1;
}
.r-radio--large .r-radio__input:checked {
  @apply border-8;
}
.r-radio--large .r-radio__label {
  @apply text-xl;
}
.r-radio--large .r-radio--outlined {
  @apply p-1;
}

/* medium */
.r-radio--medium .r-radio__input {
  @apply h-4 w-4 mt-1 mr-1;
}
.r-radio--medium .r-radio__input:checked {
  @apply border-4;
}
.r-radio--medium .r-radio__label {
  @apply text-base;
}
.r-radio--medium .r-radio--outlined {
  @apply p-1;
}

/* Disabled */
</style>
