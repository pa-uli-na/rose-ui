<template>
  <button
    :class="[
      'r-button theme-saler--m',
      classType,
      sizeType,
      roundRef,
      outlineRef,
      flatRef,
      blockRef,
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { RButtonProps, RButtonInstance } from "./types";
import { SizeType, SizeTypes, StateType, StateTypes } from "../global-types";

export default defineComponent({
  name: "RButton",
  props: {
    /** Tekst na przycisku. Opcjonalnie można wykorzystać "slot". */
    label: { type: String, default: false },
    /** Typ przycisku: Primary, Secondary, Success, Warning, Danger */
    type: {
      type: String,
      default: StateTypes.primary,
      validator: (value: StateType) =>
        Object.values(StateTypes).includes(value),
    },
    /** Rozmiar przycisku: small, medium, large. Domyślny rozmiar: medium */
    size: {
      type: String,
      default: "medium",
      validator: (value: SizeType) => Object.values(SizeTypes).includes(value),
    },
    /** Czy przycisk jest nieaktywny */
    disabled: { type: Boolean, default: false },
    /** Czy przycisk jest outline */
    outlined: { type: Boolean, default: false },
    /** Czy przycisk jest flat */
    flat: { type: Boolean, default: false },
    /** Czy przycisk jest zaokrąglony */
    rounded: { type: Boolean, default: true },
    /** Czy przycisk ma być rozciągnięty na pełną wysokość */
    block: { type: Boolean, default: false },
  },
  inheritAttrs: false,
  emits: ["click"],
  setup(props: RButtonProps, { emit }): RButtonInstance {
    const classType = computed(() => `r-button--${props.type}`);
    const sizeType = computed(() => `r-button--size-${props.size}`);
    const roundRef = computed(() => `r-button--round-${props.rounded}`);
    const outlineRef = computed(() => `r-button--outline-${props.outlined}`);
    const flatRef = computed(() => `r-button--flat-${props.flat}`);
    const blockRef = computed(() => `r-button--block-${props.block}`);

    function handleClick() {
      emit("click");
    }

    return {
      classType,
      outlineRef,
      flatRef,
      roundRef,
      sizeType,
      blockRef,
      handleClick,
    };
  },
});
</script>
