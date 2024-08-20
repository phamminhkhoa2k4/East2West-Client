export const SearchResult = ({ result } : any) => {
  return (
    <div
      onClick={(e) => alert(`You selected ${result}!`)}
    >
      {result}
    </div>
  );
};
