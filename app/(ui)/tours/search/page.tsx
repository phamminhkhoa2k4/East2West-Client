import Banner from "@/components/Banner/Banner";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";
import Loading from "@/components/Loading";
import PackageSearchResult from "@/components/tour/PackageSearchResults";
import TitleSearch from "@/components/tour/TitleSearch";
import { Suspense } from "react";

const Search = () => {
    return (
      <>
     
          <div className="mx-20 mt-35">{/* <Breadcrumb /> */}</div>
          <Banner url={"/banner/tour_banner.jpeg"} />
          <div className="mx-40">
            <TitleSearch />
            <PackageSearchResult />
          </div>
    
      </>
    );
}

export default Search;