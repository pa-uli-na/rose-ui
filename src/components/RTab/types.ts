import type { ComputedRef } from "vue";

export interface RTabProps {
  name: string;
  title: string;
  description: string | null;
  width: string | number | null;
  disabled: boolean | null;
}

export interface RTabInstance {
  isDisabled: ComputedRef<boolean>;
  tabBtnClasses: ComputedRef<Record<string, boolean>>;
  handleTabClick: () => void;
}
