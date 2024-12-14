import MenuLeft from './MenuLeft'
import MenuRight from './MenuRight'

export default function Menu() {
  return (
    <div className="flex size-full items-center justify-between border-b border-gray200 bg-gray000 transition-colors">
      <MenuLeft />
      <div className="block h-5 w-px bg-gray200 transition-colors" />
      <MenuRight />
    </div>
  )
}
