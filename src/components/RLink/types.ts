import type { ComputedRef } from "vue";
export interface RLinkProps {
  color?: String;
  disabled?: Boolean;
  text?: String;
  size?: String;
}

export interface RLinkInstance {
  colorRef?: ComputedRef<Object>;
  disabledRef?: ComputedRef<string>;
  sizeType: ComputedRef<string>;
  handleClick: () => void;
}
