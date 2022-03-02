<template>
  <div
    :class="[
      { 'flex-wrap': wrapTab },
      'flex w-full border-b border-secondary-light dark:border-secondary',
    ]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide, watch, toRef } from "vue";
import {
  RTabPropModelValue,
  RTabsProps,
  RTabsProvider,
  RTabsInstance,
  RTabPropType,
  RTabPropTypes,
} from "./types";

export default defineComponent({
  name: "RTabs",
  props: {
    modelValue: {
      type: String,
      default: null,
    },
    /**
     * whether RTabs is disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /** Typ przycisku: Primary, Secondary, Success, Warning, Danger */
    type: {
      type: String,
      default: RTabPropTypes.primary,
      validator: (value: RTabPropType) =>
        Object.values(RTabPropTypes).includes(value),
    },
    wrapTab: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "change"],
  setup(props: RTabsProps, { emit }): RTabsInstance {
    const currentName = ref<RTabPropModelValue>(props.modelValue);
    const type = ref<String>(props.type);
    const updateValue = (name: string): void => {
      emit("update:modelValue", name);
      emit("change", name);
      currentName.value = name;
    };

    watch(
      () => props.modelValue,
      (name) => {
        if (name) updateValue(name);
      },
      { immediate: true }
    );

    provide<RTabsProvider>("rTabs", {
      currentName,
      type,
      disabled: toRef(props, "disabled"),
      updateValue,
    });
  },
});
</script>
