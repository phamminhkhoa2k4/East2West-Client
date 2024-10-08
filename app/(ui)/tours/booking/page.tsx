"use client";

import Loading from "@/components/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";

const BookingPage = () => {
  const router = useRouter();
  const [packageId, setPackageId] = useState<number | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const packageIdParam = searchParams.get("packageId");
    if (packageIdParam) {
      setPackageId(parseInt(packageIdParam));
    }
  }, []);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const [bookingData, setBookingData] = useState({
    userId: userInfo?.userId || 1,
    paymentId: 1,
    packageId: packageId || 1,
    bookingDate: new Date().toISOString(),
    tourDate: "",
    numberOfPeople: 1,
    totalPrice: 0.0,
    depositAmount: 0.0,
    status: "Confirmed",
    refundAmount: 0.0,
    refundDate: null,
    reason: "No reason",
    depositRefund: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      if (response.ok) {
        alert("Booking created successfully!");
        router.push("/tours");
      } else {
        alert("Failed to create booking.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="mt-36">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Book Tour</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium">Tour Date:</label>
              <input
                type="datetime-local"
                name="tourDate"
                value={bookingData.tourDate}
                onChange={handleChange}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Number of People:
              </label>
              <input
                type="number"
                name="numberOfPeople"
                value={bookingData.numberOfPeople}
                onChange={handleChange}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Total Price:</label>
              <input
                type="number"
                name="totalPrice"
                value={bookingData.totalPrice}
                onChange={handleChange}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Deposit Amount:
              </label>
              <input
                type="number"
                name="depositAmount"
                value={bookingData.depositAmount}
                onChange={handleChange}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Submit Booking
            </button>
          </form>
        </div>
      </div>
    </Suspense>
  );
};

export default BookingPage;
