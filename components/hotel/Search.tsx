"use client";
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { SearchResultsList } from "./SearchResultList";

export default function Search() {
  const [results, setResults] = useState([]);
  return (
    <>
      <div className="flex justify-center">
        <div className="border-2 p-12 rounded-xl mt-5">
          <SearchBar setResults={setResults} />
          {results && results.length > 0 && (
            <SearchResultsList results={results} />
          )}
        </div>
      </div>
    </>
  );
}
