import { supabase } from "@/lib/supabase";

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
