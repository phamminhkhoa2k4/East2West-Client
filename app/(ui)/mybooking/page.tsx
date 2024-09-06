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
  const [activeTab, setActiveTab] = useState<'tour' | 'rental'>('tour');
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
        reason: reason
      })
      .then(response => {
        setRefundMessages({ ...refundMessages, [bookingId]: response.data });
        // Optionally, refresh bookings data here
      })
      .catch(error => console.error("Error processing refund:", error));
    }
  };

  const handlePrintPDF = (rentalId: number) => {
    axios.post(`http://localhost:8080/api/rental/pdf/${rentalId}`, {}, { responseType: 'blob' })
      .then(response => {
        // Create a URL for the PDF blob and open it in a new tab
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `rental_${rentalId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch(error => console.error("Error printing PDF:", error));
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
              <div key={booking.bookingtourid} className="bg-white shadow-md rounded-lg p-4 mb-4">
                <h3 className="text-xl font-bold">{booking.tourpackage.title}</h3>
                <p className="text-gray-600">Date: {new Date(booking.tourdate).toLocaleDateString()}</p>
                <p className="text-gray-600">Total Price: ${booking.totalprice}</p>
                <p className={`text-${booking.status === 'Cancelled' ? 'red-500' : 'gray-600'}`}>Status: {booking.status}</p>

                {booking.status === "Cancelled" ? (
                  <p className="text-red-500 mt-2">Booking canceled successfully. Refund amount: {refundMessages[booking.bookingtourid] || booking.refundAmount}</p>
                ) : (
                  booking.status === "Confirmed" && (
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
                  )
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
              <div key={rental.rentalid} className="bg-white shadow-md rounded-lg p-4 mb-4">
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
