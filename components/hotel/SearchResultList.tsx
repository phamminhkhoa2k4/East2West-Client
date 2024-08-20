
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results } : any) => {
  return (
    <div>
      {results.map((result : any, id : any)  => {
        return <SearchResult result={result.name} key={id} />;
      })}
    </div>
  );
};
