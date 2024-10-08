import Banner from "@/components/Banner/Banner";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";
import CarSearchResult from "@/components/car/CarSearchResult";

const Search = () => {
    return (
      <>
        <div className="">
          {/* <Breadcrumb /> */}
          <Banner url={"/banner/car_banner.jpeg"} />
        </div>
        <div className="mx-40">
          <div className="my-5">
            <h1 className="text-4xl font-bold text-gray-6">Cars</h1>
            <p className="text-lg">You can search for Cars to rental here.</p>
          </div>
          <CarSearchResult />
        </div>
      </>
    );
}


export default Search ;