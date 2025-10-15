import { create } from "zustand";

import { supabase } from "@/lib/supabase";

export type Booking = {
  id: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status: "confirmed" | "cancelled" | "pending";
  user: { id: string; full_name: string; email: string };
  accommodation: {
    id: string;
    title: string;
    images: string[];
    location: string;
  };
};

type State = {
  list: Booking[] | null;
  loading: boolean;
  fetchAll: () => Promise<{ ok: boolean; error?: string }>;
  cancelBooking: (id: string) => Promise<{ ok: boolean; error?: string }>;
};

export const useAdminBookings = create<State>((set, get) => ({
  list: null,
  loading: false,

  fetchAll: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from("bookings")
      .select(
        `
      id,
      check_in,
      check_out,
      guests,
      total_price,
      status,
      profile:profiles!user_id(id, full_name, email),
      accommodation:accommodations!accommodation_id(id, title, images, location)
    `,
      )
      .order("check_in", { ascending: false });

    if (error) return { ok: false, error: error.message };
    set({ list: data as Booking[] });
    return { ok: true };
  },

  cancelBooking: async (id) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("id", id);

    if (error) return { ok: false, error: error.message };
    // Refresco local (optimistic)
    set((s) => ({
      list:
        s.list?.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)) ??
        null,
    }));
    return { ok: true };
  },
}));
