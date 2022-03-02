import { PropType, ExtractPropTypes } from 'vue'
import { RBarValue, RBarWidth } from './types'

export const useRBarProps = {
  values: { type: Array as PropType<RBarValue[]>, default: [] },
  totalValue: { type: Number, default: 100 },
}

export function useRBar(props: ExtractPropTypes<typeof useRBarProps>): {
  widths: RBarWidth[]
} {
  const widths: RBarWidth[] = []
  props.values.forEach((value) => {
    const color = value.color
    const width = (value.value / props.totalValue) * 100
    widths.push({ color, width })
  })
  return { widths }
}
