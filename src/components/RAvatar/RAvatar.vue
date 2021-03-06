<template>
  <div class="text-center">
    <img
      :src="imgLink"
      :class="[shadowClasses, shapeClasses, sizeTypeClass]"
      alt="Avatar"
    />
    <h5 v-if="title" class="text-xl font-medium leading-tight mb-2">
      {{ title }}
    </h5>
    <p v-if="description" class="text-gray-500">{{ description }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { SizeType, SizeTypes } from "../global-types";

export default defineComponent({
  name: "RAvatar",
  props: {
    description: {
      type: String,
      default: "",
    },
    imgLink: {
      type: String,
      default: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
      required: true,
    },
    isSquare: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "medium",
      validator: (value: SizeType) => Object.values(SizeTypes).includes(value),
    },
    title: {
      type: String,
      default: "",
    },
    withShadow: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const shadowClasses = computed(() => (props.withShadow ? "shadow-lg" : ""));

    const shapeClasses = computed(() =>
      props.isSquare ? "rounded-lg" : "rounded-full "
    );

    const sizeTypeClass = computed(() => {
      switch (props.size) {
        case SizeTypes.small:
          return "w-7";
        case SizeTypes.large:
          return "w-32";
        default:
          return "w-20";
      }
    });

    return {
      shadowClasses,
      shapeClasses,
      sizeTypeClass,
    };
  },
});
</script>
