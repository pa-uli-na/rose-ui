import type { ComputedRef, Ref } from "vue";

export interface RRadioTileItem {
  label: string;
  value: unknown;
  icon: string;
}
export interface RRadioTileProps {
  modelValue?: string | number;
  disabled: boolean;
  items: RRadioTileItem[];
  name: string;
  outlined: boolean;
  size: string;
  type: string;
}

export interface RRadioTileInstance {
  selectedValue: Ref<string | number | undefined>;
  radioAttributes: ComputedRef<object>;
  outlinedRef: ComputedRef<string>;
  sizeType: ComputedRef<string>;
  colorType: ComputedRef<string>;
  handleChange: (value: string) => void;
}
