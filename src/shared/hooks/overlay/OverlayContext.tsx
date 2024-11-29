import { create } from 'zustand'
import type { OverlayStore } from './Overlay.type'

const useOverlayStore = create<OverlayStore>((set) => ({
  overlay: new Map(),
  mount: (id, element) =>
    set((prevStore) => {
      const cloneOverlay = new Map(prevStore.overlay)
      cloneOverlay.set(id, element)
      return { overlay: cloneOverlay }
    }),
  unmount: (id) =>
    set((prevStore) => {
      const cloneOverlay = new Map(prevStore.overlay)
      cloneOverlay.delete(id)
      return { overlay: cloneOverlay }
    }),
}))

export function useOverlayMap() {
  return useOverlayStore((state) => state.overlay)
}

export function useOverlayMount() {
  return useOverlayStore((state) => state.mount)
}

export function useOverlayUnmount() {
  return useOverlayStore((state) => state.unmount)
}
