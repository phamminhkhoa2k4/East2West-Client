import { FaCar, FaPhoneVolume } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";

const OurService = () => {
    return (
      <>
        <div className="p-6 px-10 border rounded-xl bg-slate-700 mt-5">
          <div className="text-lg font-bold text-left text-blue-500">
            Our Service
          </div>
          <div className="flex items-center justify-between">
            <div className="text-5xl font-semibold w-150 my-5 text-white">
              Our Premier services for your car rental needs
            </div>
            <p className="text-base font-medium w-150 text-white">
              We take pride in providing top-notch solutions! Our premier
              services ensure a seamless 8. simple car rental experience.
              offering cars that suit your preferences
            </p>
          </div>
          <div className="flex gap-5">
            <div className="border rounded-2xl p-6 bg-[#1a222f] w-1/3">
              <div className="flex flex-col">
                <div className="p-5 w-[90px] my-5 border-6 border-[#353f51] rounded-full bg-[#4a5465]">
                  <FaCar className="h-10 w-10 text-white" />
                </div>
                <div className="text-lg font-bold text-white    my-3">
                  Well-Maintained Car
                </div>
                <p className="text-sm font-medium text-[#4a4a4a]">
                  Enjoy yout trip in peace and comfort with our car rental which
                  otters a well-maintained fleet, prioritize the health and
                  safety Of Out vehicles
                </p>
              </div>
            </div>
            <div className="border rounded-2xl p-6 bg-[#1a222f] w-1/3">
              <div className="flex flex-col">
                <div className="p-5 w-[90px] my-5 border-6 border-[#353f51] rounded-full bg-[#4a5465]">
                  <GoShieldCheck className="h-10 w-10 text-white" />
                </div>
                <div className="text-lg font-bold text-white    my-3">
                  Secure Payments
                </div>
                <p className="text-sm font-medium text-[#4a4a4a]">
                  With a safe and reliable payment system, you can continue your
                  journey With peace of mind. without Worrying about transaction
                  security.
                </p>
              </div>
            </div>
            <div className="border rounded-2xl p-6 bg-[#1a222f] w-1/3">
              <div className="flex flex-col">
                <div className="p-5 w-[90px] my-5 border-6 border-[#353f51] rounded-full bg-[#4a5465]">
                  <FaPhoneVolume className="h-10 w-10 text-white" />
                </div>
                <div className="text-lg font-bold text-white    my-3">
                  24/7 Support
                </div>
                <p className="text-sm font-medium text-[#4a4a4a]">
                  We understand that the journey doesn&apos;t always run
                  smoothly. Therefore, our customer support team is ready to
                  help you 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}


export default OurService;