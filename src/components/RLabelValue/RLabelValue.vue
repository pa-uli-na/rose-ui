<template>
  <div class="w-full pb-0.5">
    <span
      v-if="alignLabel !== 'bottom'"
      :class="['r-label-value', sizeTypeLabel, alignType]"
    >
      {{ label }}
    </span>
    <span
      :class="[
        $attrs.class,
        sizeTypeValue,
        'font-normal tracking-wide text-black dark:text-white ',
      ]"
    >
      <slot>{{ value }}</slot>
    </span>
    <span
      v-if="alignLabel === 'bottom'"
      :class="['r-label-value', sizeTypeLabel, alignType]"
    >
      {{ label }}
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { SizeType, SizeTypes } from "../global-types";

export default defineComponent({
  name: "RLabelInfo",
  props: {
    alignLabel: { type: String, default: "bottom" },
    label: { type: String, default: "" },
    value: { type: [String, Number], default: "", required: true },
    size: {
      type: String,
      default: "medium",
      validator: (value: SizeType) => Object.values(SizeTypes).includes(value),
    },
  },
  setup(props) {
    const sizeTypeLabel = computed(() => {
      switch (props.size) {
        case SizeTypes.small:
          return "text-xs";
        case SizeTypes.large:
          return "text-base";
        default:
          return "text-sm";
      }
    });

    const sizeTypeValue = computed(() => {
      switch (props.size) {
        case SizeTypes.small:
          return "text-sm";
        case SizeTypes.large:
          return "text-lg";
        default:
          return "text-base";
      }
    });

    const alignType = computed(() => {
      switch (props.alignLabel) {
        case "left":
          return "mr-2";
        case "top":
          return "block -mb-2";
        default:
          return "block -mt-1";
      }
    });

    return { alignType, sizeTypeLabel, sizeTypeValue };
  },
});
</script>

<style>
.r-label-value {
  @apply text-secondary pb-1 pt-0.5 leading-tight text-sm;
}
</style>
