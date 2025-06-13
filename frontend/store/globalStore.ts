import { create } from 'zustand';
import { User,Account,Transaction } from '@/types/index';

type GlobalStore = {
  user: User | null;
  accounts: Account[];
  transactions: Transaction[];
  selectedAccountId: string;
  page: number;

  // Actions
  setUser: (user: User) => void;
  logout: () => void;

  setSelectedAccountId: (id: string) => void;
  setPage: (page: number) => void;
  setAccounts: (accounts: Account[]) => void;
  setTransactions: (transactions: Transaction[]) => void;

  setAllData: (payload: {
    user: User | null;
    accounts: Account[];
    transactions: Transaction[];
  }) => void;
};

export const useGlobalStore = create<GlobalStore>((set) => ({
  user: null,
  accounts: [],
  transactions: [],
  selectedAccountId: "",   // 🔸 Track which bank account is selected
  page: 1,                 // 🔸 Track current page in paginated views

  setUser: (user) => set({ user }),
  logout: () => set({ user: null, accounts: [], transactions: [], selectedAccountId: "", page: 1 }),

  setSelectedAccountId: (id) => set({ selectedAccountId: id }),
  setPage: (page) => set({ page }),

  setAccounts: (accounts) => set({ accounts }),
  setTransactions: (transactions) => set({ transactions }),

  setAllData: ({ user, accounts, transactions }) =>
    set({ user, accounts, transactions }),
}));