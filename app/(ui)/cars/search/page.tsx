import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";
import CarSearchResult from "@/components/car/CarSearchResult";

const Search = () => {
    return (
      <>
        <div className="mx-20">
          <Breadcrumb />
        </div>
        <div className="mx-40">
            <CarSearchResult/>
        </div>
      </>
    );
}


export default Search ;