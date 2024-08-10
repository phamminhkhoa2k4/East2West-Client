const ThingsToKnow = () => {
  return (
    <div className="flex flex-col space-y-6 items-star my-8">
      <h2 className="text-lg font-bold">Things to know</h2>
      <div className="flex flex-col md:flex-row justify-between items-start w-full space-y-8 md:space-y-0 md:space-x-8">
        <div className="flex flex-col space-y-2 max-w-full md:max-w-[15rem]">
          <h3 className="text-md font-bold">House rules</h3>
          <div className="flex flex-col space-y-3">
            <p>Check-in: After 1:00 PM</p>
            <p>Checkout: 11:00 AM</p>
            <p>Self check-in with lockbox</p>
            <p>Pets are allowed</p>
            <p>Smoking is allowed</p>
          </div>
        </div>
        <div className="flex flex-col space-y-2 max-w-full md:max-w-[15rem]">
          <h3 className="text-md font-bold">Health & safety</h3>
          <div className="flex flex-col space-y-3">
            <p>Enhanced cleaning process</p>
            <p>Social-distancing and other COVID-19-related guidelines apply</p>
            <p>Carbon monoxide alarm not reported</p>
            <p>Smoke alarm not reported</p>
          </div>
        </div>
        <div className="flex flex-col space-y-2 max-w-full md:max-w-[15rem]">
          <h3 className="text-md font-bold">Cancellation policy</h3>
          <div className="flex flex-col space-y-3">
            <p>Free cancellation before Nov 14</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThingsToKnow;
