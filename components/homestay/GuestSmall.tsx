"use client";

type GuestProps = {
  setCountAdult: (value: number) => void;
  setCountChildren: (value: number) => void;
  setCountBaby: (value: number) => void;
  countAdult: number;
  countChildren: number;
  countBaby: number;
  maxGuest : number | undefined;
  guest : number
};
export default function Guest({
  countAdult,
  countChildren,
  countBaby,
  setCountAdult,
  setCountChildren,
  setCountBaby,
  maxGuest,
  guest
}: GuestProps) {
  return (
    <>
      <div className="bg-white py-4 px-10 border rounded-2xl shadow-md">
        <div className="flex items-center w-59 justify-between py-6 border-b-2">
          <div>
            <h3 className="font-semibold text-base">Adult</h3>
            <span className="text-sm">From 13 age than</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="border rounded-full p-2"
              onClick={() =>
                setCountAdult(countAdult > 0 ? countAdult - 1 : countAdult)
              }
            >
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
                  d="M5 12h14"
                />
              </svg>
            </button>
            <span className="text-sm">{countAdult}</span>
            <button
              className="border rounded-full p-2"
              onClick={() =>
                setCountAdult(guest <= (maxGuest ?? 0) ? countAdult + 1 : countAdult)
              }
            >
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center w-59 justify-between py-6 border-b-2">
          <div>
            <h3 className="font-semibold text-base">Children</h3>
            <span className="text-sm">From 2 to 12 age</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="border rounded-full p-2"
              onClick={() => {
                maxGuest;
                setCountChildren(
                  countChildren > 0 ? countChildren - 1 : countChildren
                );
              }}
            >
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
                  d="M5 12h14"
                />
              </svg>
            </button>
            <span className="text-sm">{countChildren}</span>
            <button
              className="border rounded-full p-2"
              onClick={() => {
                setCountChildren(guest <= (maxGuest ?? 0) ? countChildren + 1 : countChildren);
              }}
            >
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center w-59 justify-between py-6 ">
          <div>
            <h3 className="font-semibold text-base">Infant</h3>
            <span className="text-sm">Under 2 age</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="border rounded-full p-2"
              onClick={() => {
                setCountBaby(countBaby > 0 ? countBaby - 1 : countBaby);
              }}
            >
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
                  d="M5 12h14"
                />
              </svg>
            </button>
            <span className="text-sm">{countBaby}</span>
            <button
              className="border rounded-full p-2"
              onClick={() => {
                setCountBaby(
                  countBaby <= ((maxGuest  ?? 0 ) * 2 ) ? countBaby + 1 : countBaby
                );
              }}
            >
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
