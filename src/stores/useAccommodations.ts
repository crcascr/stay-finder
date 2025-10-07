import { create } from "zustand";
import type { Accommodation } from "@/types/accommodation";

type State = {
  list: Accommodation[];
  loading: boolean;
  error: string | null;
  fetchList: () => Promise<void>;
};

export const useAccommodations = create<State>((set) => ({
  list: [],
  loading: false,
  error: null,

  fetchList: async () => {
    set({ loading: true, error: null });
    const { data, error } = await (await import("@/lib/supabase")).supabase
      .from("accommodations")
      .select("*");

    if (error) {
      set({ error: error.message, loading: false });
      return;
    }
    set({ list: data ?? [], loading: false });
  },
}));
