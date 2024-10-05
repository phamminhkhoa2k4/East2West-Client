type MealInclude = {
  meal?: string
}
const MealInclude = ({meal}: MealInclude) => {
  return (
    <>
      <div className="mx-10 my-3 border rounded-xl px-5 py-3 bg-blue-100 w-full">
        <p className="text-sm font-medium text-[#797979]">
          {meal}
        </p>
        <div className="flex items-center gap-1">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </span>
          <p className="text-xs text-blue-light-2">Included with Hotel</p>
        </div>
      </div>
    </>
  );
};

export default MealInclude;