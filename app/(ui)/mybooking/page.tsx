"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { createData, getData } from "@/utils/axios";

// Define interfaces for your data
interface TourPackage {
  title: string;
}

interface Booking {
  bookingtourid: number;
  tourpackage: TourPackage;
  tourdate: string;
  totalprice: number;
  status: string; // This can hold values like 'Confirmed', 'Cancelled', 'Waiting Refund', etc.
  refundAmount?: number;
  refundStatus?: string; // 'Pending', 'Cancelled', etc.
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
  const [activeTab, setActiveTab] = useState<'tour' | 'rental'>('tour');
  const [showRefundField, setShowRefundField] = useState<{ [key: number]: boolean }>({});
  const [refundReason, setRefundReason] = useState<{ [key: number]: string }>({});
  const [refundMessages, setRefundMessages] = useState<{ [key: number]: string }>({});
  const userId = JSON.parse(localStorage.getItem("userInfo") || "{}")?.userId as string;

  useEffect(() => {
    if (userId) {
      const fetchBookings = async () => {
        try {
          const response = await getData({ endpoint: `bookings/user/${userId}` });
          setBookings(response);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      };
  
      const fetchRentals = async () => {
        try {
          const response = await getData({ endpoint: `rental/user/${userId}` });
          setRentals(response);
        } catch (error) {
          console.error("Error fetching rentals:", error);
        }
      };
  
      fetchBookings();
      fetchRentals();
    }
  }, [userId]);

  const handleRefundClick = (bookingId: number) => {
    setShowRefundField({ ...showRefundField, [bookingId]: true });
  };

  const handleRefundChange = (bookingId: number, value: string) => {
    setRefundReason({ ...refundReason, [bookingId]: value });
  };
  const handleCancelRefund = async (bookingId: number) => {
    try {
      const response = await createData({ endpoint: `bookings/cancelRefund/${bookingId}`, payload: {} });
      setRefundMessages({ ...refundMessages, [bookingId]: response });
      // Optionally refresh bookings here
    } catch (error) {
      console.error("Error canceling refund:", error);
    }
  };
  const handleRefundSubmit = async (bookingId: number) => {
    const reason = refundReason[bookingId];
    if (reason) {
      try {
        const response = await createData({ endpoint: 'bookings/cancel', payload: { bookingTourId: bookingId, reasson: reason } });
        setRefundMessages({ ...refundMessages, [bookingId]: response });
        // Optionally, refresh bookings data here
      } catch (error) {
        console.error("Error processing refund:", error);
      }
    }
  };

  const handlePrintPDF = async (rentalId: number) => {
    try {
      const response = await createData({ endpoint: `rental/pdf/${rentalId}`, payload: {} });
      
      // Đảm bảo rằng response.data là kiểu dữ liệu Blob
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `rental_${rentalId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url); // Giải phóng URL sau khi tải xong
    } catch (error) {
      console.error("Error printing PDF:", error);
    }
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-36">
      <h1 className="text-3xl font-bold mb-6 text-center">My Booking</h1>
  
      <div className="flex justify-center mb-8">
        <button
          className={`py-2 px-4 rounded-t ${activeTab === 'tour' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('tour')}
        >
          Tour Bookings
        </button>
        <button
          className={`py-2 px-4 rounded-t ${activeTab === 'rental' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('rental')}
        >
          Rental Car Bookings
        </button>
      </div>
  
      {activeTab === 'tour' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Tour Bookings</h2>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking.bookingtourid}
                className={`bg-white shadow-md rounded-lg p-4 mb-4 border-l-4 ${
                  booking.status === 'Cancelled'
                    ? 'border-red-500'
                    : booking.status === 'Waiting Refund'
                    ? 'border-yellow-500'
                    : 'border-green-500'
                }`}
              >
                <h3 className="text-xl font-bold">{booking.tourpackage.title}</h3>
                <p className="text-gray-600">Date: {new Date(booking.tourdate).toLocaleDateString()}</p>
                <p className="text-gray-600">Total Price: ${booking.totalprice}</p>
                <p
                  className={`text-lg font-semibold ${
                    booking.status === 'Cancelled'
                      ? 'text-red-500'
                      : booking.status === 'Waiting Refund'
                      ? 'text-yellow-500'
                      : 'text-green-500'
                  }`}
                >
                  Status: {booking.status}
                </p>
  
                {/* Show relevant buttons or messages based on booking status */}
                {booking.status === 'Waiting Refund' ? (
                  <div className="mt-4">
                    <p className="text-yellow-500 mt-2">Refund request is pending.</p>
                    <button
                      className="bg-yellow-500 text-white py-2 px-4 rounded"
                      onClick={() => handleCancelRefund(booking.bookingtourid)}
                    >
                      Cancel Refund
                    </button>
                  </div>
                ) : booking.status === 'Cancelled' ? (
                  <p className="text-red-500 mt-2">
                    Booking canceled successfully. Refund amount:{" "}
                    {refundMessages[booking.bookingtourid] || booking.refundAmount || "N/A"}
                  </p>
                ) : booking.status === 'Confirmed' && (
                  <div className="mt-4">
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded"
                      onClick={() => handleRefundClick(booking.bookingtourid)}
                    >
                      Request Refund
                    </button>
                    {showRefundField[booking.bookingtourid] && (
                      <div className="mt-4">
                        <input
                          type="text"
                          placeholder="Enter refund reason"
                          className="border border-gray-300 p-2 w-full rounded mb-2"
                          value={refundReason[booking.bookingtourid] || ""}
                          onChange={(e) => handleRefundChange(booking.bookingtourid, e.target.value)}
                        />
                        <button
                          className="bg-green-500 text-white py-2 px-4 rounded"
                          onClick={() => handleRefundSubmit(booking.bookingtourid)}
                        >
                          Submit Refund
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No tour bookings found.</p>
          )}
        </div>
      )}
  
      {activeTab === 'rental' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Rental Car Bookings</h2>
          {rentals.length > 0 ? (
            rentals.map((rental) => (
              <div key={rental.rentalid} className="bg-white shadow-md rounded-lg p-4 mb-4 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold">{rental.car.carName}</h3>
                <p className="text-gray-600">Rental Date: {new Date(rental.rentalDate).toLocaleDateString()}</p>
                <p className="text-gray-600">Return Date: {new Date(rental.returnDate).toLocaleDateString()}</p>
                <p className="text-gray-600">Total Amount: ${rental.totalAmount}</p>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                  onClick={() => handlePrintPDF(rental.rentalid)}
                >
                  Print PDF
                </button>
              </div>
            ))
          ) : (
            <p>No car rental bookings found.</p>
          )}
        </div>
      )}
    </div>
  );
  
  
};

export default MyBookingPage;
