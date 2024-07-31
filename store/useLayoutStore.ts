import { create } from "zustand"

type SidebarStore = {
  isOpen: boolean
  setIsOpen: (state?: boolean) => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  setIsOpen: (state) =>
    set((currentState) => ({ isOpen: state ?? !currentState.isOpen })),
}))
