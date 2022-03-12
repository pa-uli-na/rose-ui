import type { Ref } from "vue";

export interface RTabsProps {
  modelValue: string | null;
  disabled: boolean | null;
  type: string;
}

export interface RTabsProvider {
  currentName: Ref<string | number | null>;
  disabled: Ref<boolean | null>;
  type: Ref<string>;
  updateValue: (name: string) => void;
}

export type RTabsInstance = void;
