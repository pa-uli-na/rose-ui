export type StateType =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "black";

export const StateTypes: Record<StateType, string> = {
  primary: "primary",
  secondary: "secondary",
  success: "success",
  warning: "warning",
  danger: "danger",
  black: "black",
};

export type SizeType = "small" | "medium" | "large";
export const SizeTypes: Record<SizeType, string> = {
  small: "small",
  medium: "medium",
  large: "large",
};
