import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center w-full my-8">
      <button className="flex items-center justify-center border border-gray-300 rounded-full px-4 py-2 text-gray-700 hover:bg-gray-100">
        <IoIosArrowBack className="mr-2" />
        Go home
      </button>
      <nav className="flex items-center space-x-2 text-gray-500 font-semibold">
        <a href="#" className="flex items-center">
          Home
        </a>
        <IoIosArrowForward size={18} />
        <a href="#" className="flex items-center">
          Apartments
        </a>
        <IoIosArrowForward size={18} />
        <a href="#" className="flex items-center">
          Serbia
        </a>
        <IoIosArrowForward size={18} />
        <a href="#" className="text-brand-500">
          Belgrade
        </a>
      </nav>
    </div>
  );
};

export default Header;
