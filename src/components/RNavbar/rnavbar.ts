import {
  App,
  inject,
  InjectionKey,
  Plugin,
  ref,
  readonly,
  Ref,
  DeepReadonly,
  computed,
  ComputedRef,
} from 'vue'

import { Group, Func, Module } from './types'

type navbarUtil = {
  pickGroup: (groupID: number) => void
  pickedGroup: ComputedRef<Group>
  pickedGroupId: DeepReadonly<Ref<number>>
}

export function navbarUtil(navbarData: Group[]): navbarUtil {
  const pickedGroupId = ref<number>(1)
  const mappedGroups = computed<Record<number, Group>>(() =>
    Array.isArray(navbarData)
      ? navbarData.reduce<Record<number, Group>>((acc, group) => {
          acc[group.id] = group
          return acc
        }, {})
      : {}
  )

  const pickedGroup = computed<Group>(
    () => mappedGroups.value[pickedGroupId.value]
  )

  function pickGroup(groupID: number): void {
    if (mappedGroups.value[groupID] === void 0) {
      throw Error('Brak grupy z groupID: ' + groupID)
    }
    pickedGroupId.value = groupID
  }

  return {
    pickGroup,
    pickedGroup,
    pickedGroupId: readonly<Ref<number>>(pickedGroupId),
  }
}

// export const key: InjectionKey<{ navbarData: readonly Group[] } & navbarUtil> =
//   Symbol()

// export const navbar: Plugin = {
//   install: (app: App, data: Group[]) => {
//     const navbarData = Object.freeze(data)
//     app.provide(key, { navbarData, ...navbarUtil(navbarData) })
//   },
// }
