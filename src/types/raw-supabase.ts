import type { Database } from "./supabase";

export type Booking = Database["public"]["Tables"]["bookings"]["Row"];

export type Accommodation =
  Database["public"]["Tables"]["accommodations"]["Row"];

export interface RawBooking extends Booking {
  accommodation: Accommodation;
}
