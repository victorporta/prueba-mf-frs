import { create } from 'zustand'

type SearchStore = {
  isOpen: boolean
  draftQuery: string
  submittedQuery: string
  open: () => void
  close: () => void
  toggle: () => void
  setDraftQuery: (value: string) => void
  submitSearch: () => void
  clearSearch: () => void
}

function normalizeQuery(value: string) {
  return value.trim().toLowerCase()
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  isOpen: false,
  draftQuery: '',
  submittedQuery: '',
  open: () => set({ isOpen: true }),
  close: () =>
    set({
      isOpen: false,
      draftQuery: '',
      submittedQuery: '',
    }),
  toggle: () => {
    const { isOpen, close, open } = get()
    if (isOpen) {
      close()
      return
    }
    open()
  },
  setDraftQuery: (value) => set({ draftQuery: value }),
  submitSearch: () => {
    const submittedQuery = normalizeQuery(get().draftQuery)
    set({ submittedQuery })
  },
  clearSearch: () => set({ draftQuery: '', submittedQuery: '' }),
}))
