import { create } from "zustand";

import { supabase } from "@/lib/supabase";

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  role: "admin" | "user";
};

type State = {
  profile: Profile | null;
  loading: boolean;
  checkSession: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const useSession = create<State>((set) => ({
  profile: null,
  loading: true,

  checkSession: async () => {
    set({ loading: true });
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      set({ profile: null, loading: false });
      return;
    }
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();
    set({ profile: (profile as Profile | null) ?? null, loading: false });
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ profile: null });
  },
}));
