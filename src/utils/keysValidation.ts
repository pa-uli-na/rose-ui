type FunctionalKeyTypes = 'Alt' | 'Control' | 'CapsLock' | 'Backspace' | 'Shift'

export const FunctionalKeys: Record<FunctionalKeyTypes, string> = {
  Alt: 'Alt',
  CapsLock: 'CapsLock',
  Control: 'Control',
  Backspace: 'Backspace',
  Shift: 'Shift',
}

export const isFunctionalKey = (key: string): boolean =>
  Object.values(FunctionalKeys).includes(key)
