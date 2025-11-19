// lib/firestore.ts
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Booking interface representing one document from Firestore.
 */
export interface Booking {
  id: string;
  createdAt?: string | Timestamp;
  fullName?: string;
  email?: string;
  phone?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  distance?: number;
  total?: number;
  vehicleType?: string;
}

/**
 * Fetch all booking documents from Firestore
 * Converts Firestore Timestamps into normal ISO strings for safe rendering
 */
export const fetchBookings = async (): Promise<Booking[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "bookings"));
    const bookings: Booking[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      // Normalize Firestore Timestamp → ISO string
      if (data.createdAt && typeof data.createdAt.toDate === "function") {
        data.createdAt = data.createdAt.toDate().toISOString();
      } else if (!data.createdAt) {
        // fallback if missing
        data.createdAt = new Date().toISOString();
      }

      // Ensure total is numeric (Firestore might store it as string)
      if (data.total && typeof data.total === "string") {
        data.total = parseFloat(data.total);
      }

      return {
        id: doc.id,
        ...data,
      } as Booking;
    });

    return bookings;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
};
