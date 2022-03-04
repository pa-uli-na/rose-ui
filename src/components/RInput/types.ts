import type { ComputedRef } from "vue";

export type RInputPropType = "text" | "number" | "password";

export const RInputPropTypes: Record<RInputPropType, string> = {
  text: "text",
  number: "number",
  password: "password",
};

export type RInputPropSize = "small" | "medium" | "large";
export const RInputPropSizes: Record<RInputPropSize, string> = {
  small: "small",
  medium: "medium",
  large: "large",
};
export interface RInputProps {
  modelInputValue?: String;
  autocomplete?: Boolean;
  autofocus?: Boolean;
  badge?: Boolean;
  disabled?: Boolean;
  filled?: Boolean;
  id?: String;
  label?: String;
  maxLength?: Number;
  maxValue?: Number;
  minValue?: Number;
  name?: String;
  placeholder?: String;
  required?: Boolean;
  rounded?: Boolean;
  size?: String;
  type?: String;
}

export interface RInputInstance {
  autocompleteRef: ComputedRef<string>;
  inputRoundRef: ComputedRef<string>;
  inputDisabledRef: ComputedRef<string>;
  inputSizeType: ComputedRef<string>;
  labelRef: ComputedRef<string>;
  labelSizeType: ComputedRef<string>;
  handleInput: (e: Event) => void;
}
