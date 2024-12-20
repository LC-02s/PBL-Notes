import { create } from 'zustand'
import type { OverlayStore } from './Overlay.type'

const useOverlayStore = create<OverlayStore>((set) => ({
  overlay: new Map(),
  mount: (id, element) =>
    set((prev) => {
      const clonedOverlay = new Map(prev.overlay)

      clonedOverlay.set(id, element)

      return { overlay: clonedOverlay }
    }),
  unmount: (id) =>
    set((prev) => {
      const clonedOverlay = new Map(prev.overlay)
      const success = clonedOverlay.delete(id)

      if (!success) {
        return prev
      }

      return { overlay: clonedOverlay }
    }),
}))

export const useOverlayElementList = () => {
  const overlay = useOverlayStore((store) => store.overlay)

  return [...overlay.entries()]
}

export const useOverlayMount = () => useOverlayStore((store) => store.mount)

export const useOverlayUnmount = () => useOverlayStore((store) => store.unmount)
