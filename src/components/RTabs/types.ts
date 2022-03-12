import type { Ref } from "vue";

import type { Nullable } from "../helpers";

export type RTabPropModelValue = Nullable<string>;
export type RTabPropTabWidth = Nullable<string | number>;
export type RTabPropDisabled = Nullable<boolean>;

export interface RTabsProps {
  modelValue: RTabPropModelValue;
  disabled: RTabPropDisabled;
  type: String;
}

export interface RTabsProvider {
  currentName: Ref<RTabPropModelValue>;
  disabled: Ref<RTabPropDisabled>;
  type: Ref<String>;
  updateValue: (name: string) => void;
}

export type RTabsInstance = void;
