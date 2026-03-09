import { create } from 'zustand';
import { User, Account, Transaction } from '@/types/index';

type GlobalStore = {
  user: User | null;
  selectedAccountId: string;
  page: number;

  // Actions
  setUser: (user: User) => void;
  logout: () => void;

  setSelectedAccountId: (id: string) => void;
  setPage: (page: number) => void;
};

export const useGlobalStore = create<GlobalStore>((set) => ({
  user: null,
  selectedAccountId: "",   // 🔸 Track which bank account is selected
  page: 1,                 // 🔸 Track current page in paginated views

  setUser: (user) => set({ user }),
  logout: () => set({ user: null, selectedAccountId: "", page: 1 }),

  setSelectedAccountId: (id) => set({ selectedAccountId: id }),
  setPage: (page) => set({ page }),
}));