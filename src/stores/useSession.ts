import { create } from "zustand";

import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

type State = {
  profile: Profile | null;
  loading: boolean;
  checkSession: () => Promise<{ ok: boolean; error?: string }>;
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
      return { ok: false }; // <-- sin error
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (!profile || !profile.is_active) {
      await supabase.auth.signOut();
      set({ profile: null, loading: false });
      return {
        ok: false,
        error: "Cuenta desactivada. Contacta al administrador.",
      };
    }

    set({ profile: profile as Profile, loading: false });
    return { ok: true };
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ profile: null });
  },
}));
