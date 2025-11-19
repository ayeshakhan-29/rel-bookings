// lib/firestore.ts
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export interface Booking {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  pickupLocation: string;
  dropoffLocation: string;
  distance: number;
  vehicleType: string;
  total: number;
  gratuity: number;
  tax: number;
  tripType: string;
}

export const fetchBookings = async (): Promise<Booking[]> => {
  const querySnapshot = await getDocs(collection(db, "bookings"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Booking[];
};
