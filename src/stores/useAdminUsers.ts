import { create } from "zustand";

import { supabase } from "@/lib/supabase";
import type { Profile } from "@/stores/useSession";

type State = {
  list: Profile[] | null;
  loading: boolean;
  fetchAll: () => Promise<{ ok: boolean; error?: string }>;
  toggleRole: (
    id: string,
    newRole: "admin" | "user",
  ) => Promise<{ ok: boolean; error?: string }>;
  toggleStatus: (
    id: string,
    active: boolean,
  ) => Promise<{ ok: boolean; error?: string }>;
  sendPasswordReset: (
    email: string,
  ) => Promise<{ ok: boolean; error?: string }>;
};

export const useAdminUsers = create<State>((set, get) => ({
  list: null,
  loading: false,

  fetchAll: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("full_name", { ascending: true });

    if (error) return { ok: false, error: error.message };
    set({ list: data ?? [], loading: false });
    return { ok: true };
  },

  toggleRole: async (id, newRole) => {
    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", id);
    if (error) return { ok: false, error: error.message };
    await get().fetchAll(); // refresca
    return { ok: true };
  },

  toggleStatus: async (id, active) => {
    const { error } = await supabase
      .from("profiles")
      .update({ is_active: active })
      .eq("id", id);
    if (error) return { ok: false, error: error.message };
    await get().fetchAll();
    return { ok: true };
  },

  sendPasswordReset: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  },
}));
