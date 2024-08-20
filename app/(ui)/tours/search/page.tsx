import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";
import PackageSearchResult from "@/components/tour/PackageSearchResults";
import TitleSearch from "@/components/tour/TitleSearch";

const Search = () => {
    return (
      <>
        <div className="mx-20">
          <Breadcrumb />
        </div>
        <div className="mx-40">
          <TitleSearch/>
          <PackageSearchResult />
        </div>
      </>
    );
}

export default Search;