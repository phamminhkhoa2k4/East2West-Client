import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

interface Car {
  carId: number;
  carName: string;
  model: { modelId: number; modelName: string };
  make: { makeId: number; makeName: string };
  type: { typeId: number; typeName: string };
  year: number;
  seatCapacity: number;
  airConditioned: boolean;
  pricePerDay: number;
  status: string;
  location: string;
}

interface Payment {
  paymentId: number;
  paymentMethod: string;
}

interface Rental {
  rentalid: number;
  userid: number;
  car: Car;
  payment: Payment;
  rentalDate: string;
  returnDate: string;
  totalAmount: number;
  status: string | null;
}

const BookingPage: React.FC = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/rental");
        if (!response.ok) {
          throw new Error("Failed to fetch rental data");
        }
        const data: Rental[] = await response.json();
        setRentals(data);
      } catch (error) {
        setError("Failed to load rental data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <DefaultLayout>
      <div className="p-6">
        <h2 className="text-lg font-semibold">Rental Bookings</h2>
        <table className="mt-4 w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Car Name</th>
              <th className="border p-2">Rental Date</th>
              <th className="border p-2">Return Date</th>
              <th className="border p-2">Total Amount</th>
              <th className="border p-2">Payment Method</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental) => (
              <tr key={rental.rentalid}>
                <td className="border p-2">{rental.car.carName}</td>
                <td className="border p-2">{rental.rentalDate}</td>
                <td className="border p-2">{rental.returnDate}</td>
                <td className="border p-2">${rental.totalAmount.toFixed(2)}</td>
                <td className="border p-2">{rental.payment.paymentMethod}</td>
                <td className="border p-2">{rental.status || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  );
};

export default BookingPage;