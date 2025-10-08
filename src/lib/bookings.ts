import { supabase } from "@/lib/supabase";
import type { RawBooking } from "@/types/raw-supabase";

export async function checkOverlap(
  accommodationId: string,
  checkIn: string, // ISO yyyy-MM-dd
  checkOut: string,
) {
  const { data } = await supabase
    .from("bookings")
    .select("id")
    .eq("accommodation_id", accommodationId)
    .eq("status", "confirmed")
    .or(`check_in.lte.${checkOut},check_out.gte.${checkIn}`);
  return data ?? [];
}

export async function createBooking(
  userId: string,
  accommodationId: string,
  checkIn: Date,
  checkOut: Date,
  guests: number,
  totalPrice: number,
) {
  const { data, error } = await supabase
    .from("bookings")
    .insert({
      accommodation_id: accommodationId,
      user_id: userId,
      check_in: checkIn.toISOString().slice(0, 10),
      check_out: checkOut.toISOString().slice(0, 10),
      guests,
      total_price: totalPrice,
      status: "confirmed",
    })
    .select()
    .single();
  return { data, error };
}

export async function getMyBookings(): Promise<{
  data: RawBooking[] | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}> {
  const { data, error } = await supabase
    .from("bookings")
    .select(`*, accommodation:accommodation_id!inner(*)`)
    .order("check_in", { ascending: false });

  // Confiamos en que la query devuelve exactamente RawBooking[]
  return { data: data as RawBooking[], error };
}

export async function updateBookingStatus(
  userId: string,
  id: string,
  status: "confirmed" | "cancelled",
) {
  const { data, error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();
  return { data, error };
}
