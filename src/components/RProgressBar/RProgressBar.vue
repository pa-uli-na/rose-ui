<template>
  <div class="relative">
    <div class="flex items-center justify-between">
      <div v-if="title">
        <slot name="title">
          <span
            class="text-sm inline-block pb-1 px-2 rounded-full text-secondary"
          >
            {{ title }}
          </span>
        </slot>
      </div>
      <slot name="sumText">
        <div class="text-right text-black">
          <span v-if="!sumText"> {{ sumValues }}% </span>
          <span v-else> {{ sumText }} </span>
        </div>
      </slot>
    </div>
    <r-bar :totalValue="totalValue" :values="barValues"></r-bar>
  </div>
</template>

<script lang="ts">
import "../../theme/index.css";
import { computed, defineComponent, PropType } from "vue";
import {
  RProgressBarValue,
  RProgressBarProps,
  RProgressBarInstance,
} from "./types";

import RBar from "../RBar/RBar.vue";

export default defineComponent({
  name: "RProgressBar",
  components: { RBar },
  props: {
    legend: { type: Boolean, default: true },
    progressValues: {
      type: Array as PropType<RProgressBarValue[]>,
      default: [],
    },
    sumText: { type: String, default: "" },
    title: { type: String, default: "" },
    legendTitle: { type: String, default: "Legend" },
    totalValue: { type: Number, default: 100 },
  },
  setup(props: RProgressBarProps): RProgressBarInstance {
    const sumValues = computed(() => {
      let sum = 0;
      props.progressValues?.forEach((progressValue) => {
        sum += progressValue.value;
      });
      return (sum / props.totalValue) * 100;
    });

    const barValues = computed(() =>
      props.progressValues?.map((val) => {
        return { color: val.color, value: val.value };
      })
    );

    return { sumValues, barValues };
  },
});
</script>
