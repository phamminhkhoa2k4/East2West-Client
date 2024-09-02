
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

// Define interfaces for your data
interface TourPackage {
  title: string;
}

interface Booking {
  bookingtourid: number;
  tourpackage: TourPackage;
  tourdate: string;
  totalprice: number;
  status: string;
  refundAmount?: number;
}

interface Car {
  carName: string;
}

interface Rental {
  rentalid: number;
  car: Car;
  rentalDate: string;
  returnDate: string;
  totalAmount: number;
}

const MyBookingPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [showRefundField, setShowRefundField] = useState<{ [key: number]: boolean }>({});
  const [refundReason, setRefundReason] = useState<{ [key: number]: string }>({});
  const [refundMessages, setRefundMessages] = useState<{ [key: number]: string }>({});
  const userId = JSON.parse(localStorage.getItem("userInfo") || "{}")?.userId as string;

  useEffect(() => {
    if (userId) {
      axios.get<Booking[]>(`http://localhost:8080/api/bookings/user/${userId}`)
        .then(response => setBookings(response.data))
        .catch(error => console.error("Error fetching bookings:", error));

      axios.get<Rental[]>(`http://localhost:8080/api/rental/user/${userId}`)
        .then(response => setRentals(response.data))
        .catch(error => console.error("Error fetching rentals:", error));
    }
  }, [userId]);

  const handleRefundClick = (bookingId: number) => {
    setShowRefundField({ ...showRefundField, [bookingId]: true });
  };

  const handleRefundChange = (bookingId: number, value: string) => {
    setRefundReason({ ...refundReason, [bookingId]: value });
  };

  const handleRefundSubmit = (bookingId: number) => {
    const reason = refundReason[bookingId];
    if (reason) {
      axios.post("http://localhost:8080/api/bookings/cancel", {
        bookingTourId: bookingId,
        reasson: reason
      })
      .then(response => {
        setRefundMessages({ ...refundMessages, [bookingId]: response.data });
        // Optionally, refresh bookings data here
      })
      .catch(error => console.error("Error processing refund:", error));
    }
  };

  return (
    <div className="mt-36">
      <h1 className="text-2xl font-bold mb-4">My Booking</h1>
      
      <h2 className="text-xl font-semibold mb-2">Tour Bookings</h2>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking.bookingtourid} className="border p-4 mb-4">
            <h3 className="font-bold text-lg">{booking.tourpackage.title}</h3>
            <p>Date: {new Date(booking.tourdate).toLocaleDateString()}</p>
            <p>Total Price: ${booking.totalprice}</p>
            <p>Status: {booking.status}</p>

            {booking.status === "Cancelled" ? (
              <p className="text-red-500">Booking canceled successfully. Refund amount: {refundMessages[booking.bookingtourid] || booking.refundAmount}</p>
            ) : (
              <>
                <button 
                  className="bg-red-500 text-white p-2 mt-2" 
                  onClick={() => handleRefundClick(booking.bookingtourid)}
                >
                  Request Refund
                </button>
                {showRefundField[booking.bookingtourid] && (
                  <div className="mt-2">
                    <input 
                      type="text" 
                      placeholder="Enter refund reason" 
                      className="border p-2 w-full mb-2" 
                      value={refundReason[booking.bookingtourid] || ""}
                      onChange={(e) => handleRefundChange(booking.bookingtourid, e.target.value)}
                    />
                    <button 
                      className="bg-green-500 text-white p-2" 
                      onClick={() => handleRefundSubmit(booking.bookingtourid)}
                    >
                      Submit Refund
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))
      ) : (
        <p>No tour bookings found.</p>
      )}
      
      <h2 className="text-xl font-semibold mb-2">Rental Car Bookings</h2>
      {rentals.length > 0 ? (
        rentals.map((rental) => (
          <div key={rental.rentalid} className="border p-4 mb-4">
            <h3 className="font-bold text-lg">{rental.car.carName}</h3>
            <p>Rental Date: {new Date(rental.rentalDate).toLocaleDateString()}</p>
            <p>Return Date: {new Date(rental.returnDate).toLocaleDateString()}</p>
            <p>Total Amount: ${rental.totalAmount}</p>
          </div>
        ))
      ) : (
        <p>No car rental bookings found.</p>
      )}
    </div>
  );
};

export default MyBookingPage;
