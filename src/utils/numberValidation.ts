/** Czy dany ciąg jest liczbą? */
export const isNumeric = (char: string | number): boolean =>
  /^\d+$/.test(String(char))

export const isLessThanMaxValue = (
  key: string,
  currentValueText: string,
  maxValue: Number
): boolean => {
  const newValueText = currentValueText + key
  const newValueNumber = Number(newValueText)
  return newValueNumber <= maxValue
}

export const isMoreThanMinValue = (
  key: string,
  currentValueText: string,
  minValue: Number
): boolean => {
  const newValueText = currentValueText + key
  const newValueNumber = Number(newValueText)
  return newValueNumber >= minValue
}

export const isLessThanMaxLength = (
  key: string,
  currentValueText: string,
  maxLength: Number
): boolean => {
  const newValueText = currentValueText + key
  return newValueText.length <= maxLength
}
