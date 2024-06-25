import { create } from "zustand";

type UsarTelaLoad = {
  isLoading: boolean;
  setLoading: (bool?: boolean) => void;
};

export const usarTelaLoad = create<UsarTelaLoad>()((set) => ({
  isLoading: false,
  setLoading: (bool) => {
    set((state) => ({
      isLoading: bool ?? !state.isLoading,
    }));
  },
}));
