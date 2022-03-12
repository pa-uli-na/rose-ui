<template>
  <a
    :class="[
      'cursor-pointer uppercase leading-snug text-black hover:text-primary dark:text-white hover:dark:text-primary-light px-1',
      sizeType,
    ]"
    :disabled="disabled"
    :href="link"
    :style="colorRef"
    type="button"
    @click="handleClick"
  >
    <slot />
  </a>
</template>

<script lang="ts">
import "../../theme/index.css";
import { computed, defineComponent } from "vue";
import { RLinkInstance, RLinkProps } from "./types";
import { SizeTypes, SizeType } from "../global-types";

export default defineComponent({
  name: "RLink",
  props: {
    color: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    link: { type: String },
    size: {
      type: String,
      default: "medium",
      validator: (value: SizeType) => Object.values(SizeTypes).includes(value),
    },
  },
  emits: ["click"],
  setup(props: RLinkProps, { emit }): RLinkInstance {
    function handleClick() {
      emit("click");
    }

    const disabledRef = computed(() =>
      props.disabled ? "bg-secondary-light text-secondary" : ""
    );

    const sizeType = computed(() => {
      switch (props.size) {
        case SizeTypes.small:
          return "py-1 text-xs";
        case SizeTypes.large:
          return "py-3 text-lg";
        default:
          return "py-2 text-sm";
      }
    });

    const colorRef = computed(() => {
      return { color: props.color };
    });

    return { colorRef, disabledRef, sizeType, handleClick };
  },
});
</script>
