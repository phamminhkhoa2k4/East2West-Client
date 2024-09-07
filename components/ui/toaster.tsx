"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, status , ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {/* {title && <ToastTitle>{title}</ToastTitle>} */}
              {/* {description && (
                <ToastDescription>{description}</ToastDescription>
              )} */}

              {title && description && (
                <>
                  {status === "success" && (
                    <div className="flex w-[350px] relative rounded-[10px] items-center border-l-6 border-green bg-green-light-7 px-3 py-4 dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-5">
                      <div className="absolute top-1 right-1">
                        <ToastClose />
                      </div>
                      <div className="mr-5.5 mt-[5px] flex h-8 w-full max-w-8  items-center justify-center rounded-md bg-green">
                        <svg
                          width="16"
                          height="12"
                          viewBox="0 0 16 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                            fill="white"
                            stroke="white"
                          />
                        </svg>
                      </div>
                      <div className="w-full">
                        <h5 className="mb-2 font-bold leading-[22px] text-[#004434] dark:text-[#34D399]">
                          {title}
                        </h5>
                        <p className="text-[#637381] text-nowrap">
                          {description}
                        </p>
                      </div>
                    </div>
                  )}
                  {status === "warning" && (
                    <div className="flex w-[350px] rounded-[10px] border-l-6 border-[#FFB800] bg-[#FEF5DE] px-3 py-4 dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-5 items-center ">
                      <div className="absolute top-1 right-1">
                        <ToastClose />
                      </div>
                      <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-[#FBBF24]">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2.5 8.68038C2.5 6.01573 2.5 4.6834 2.8146 4.23518C3.12919 3.78695 4.38194 3.35813 6.88743 2.5005L7.36477 2.3371C8.67082 1.89004 9.32384 1.6665 10 1.6665C10.6762 1.6665 11.3292 1.89004 12.6352 2.3371L13.1126 2.5005C15.6181 3.35813 16.8708 3.78695 17.1854 4.23518C17.5 4.6834 17.5 6.01573 17.5 8.68038V9.99264C17.5 14.691 13.9675 16.9711 11.7512 17.9392C11.15 18.2019 10.8494 18.3332 10 18.3332C9.15062 18.3332 8.85001 18.2019 8.2488 17.9392C6.03247 16.9711 2.5 14.691 2.5 9.99264V8.68038ZM10 6.0415C10.3452 6.0415 10.625 6.32133 10.625 6.6665V9.99984C10.625 10.345 10.3452 10.6248 10 10.6248C9.65482 10.6248 9.375 10.345 9.375 9.99984V6.6665C9.375 6.32133 9.65482 6.0415 10 6.0415ZM10 13.3332C10.4602 13.3332 10.8333 12.9601 10.8333 12.4998C10.8333 12.0396 10.4602 11.6665 10 11.6665C9.53976 11.6665 9.16667 12.0396 9.16667 12.4998C9.16667 12.9601 9.53976 13.3332 10 13.3332Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <div className="w-full">
                        <h5 className="mb-3.5 text-lg font-bold leading-[22px] text-[#9D5425]">
                          {title}
                        </h5>
                        <p className="w-full max-w-[740px] text-[#D0915C]">
                          {description}
                        </p>
                      </div>
                    </div>
                  )}
                  {status === "error" && (
                    <div className="flex w-[350px] relative rounded-[10px]  items-center border-l-6 border-red-light bg-red-light-5 px-3 py-4 dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-5">
                      <div className="absolute top-1 right-1">
                        <ToastClose />
                      </div>
                      <div className="mr-5 mt-[5px] flex h-8 w-full max-w-8 items-center justify-center rounded-md bg-red-light">
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 11 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.79566 0.722904L1.7963 0.723542L5.49396 4.43004L9.20434 0.737509L9.55768 1.09128L9.20498 0.736873L9.20473 0.737119C9.50233 0.440303 9.97913 0.440433 10.2766 0.737509C10.5745 1.03505 10.5745 1.51262 10.2766 1.81016L10.2759 1.81079L6.56578 5.5031L10.262 9.2081C10.2621 9.2082 10.2622 9.20831 10.2623 9.20841C10.5599 9.50598 10.5597 9.98331 10.262 10.2807L9.90861 9.92698L10.2619 10.2807C10.1232 10.4193 9.92253 10.5 9.73314 10.5C9.54375 10.5 9.34309 10.4193 9.20434 10.2807L9.55768 9.92698L9.20434 10.2807L5.49333 6.57425L1.7963 10.2801L1.79566 10.2808C1.65691 10.4193 1.45624 10.5 1.26686 10.5C1.07746 10.5 0.876797 10.4193 0.738054 10.2808L1.09139 9.92698L0.73805 10.2807C0.440426 9.98348 0.440145 9.50654 0.737209 9.20894C0.737489 9.20866 0.737769 9.20838 0.73805 9.2081L4.4215 5.50246L0.723428 1.79555C0.723302 1.79543 0.723176 1.7953 0.72305 1.79518C0.425523 1.49761 0.425649 1.02032 0.723428 0.722905C1.021 0.425698 1.49809 0.425698 1.79566 0.722904Z"
                            fill="white"
                            stroke="white"
                          />
                        </svg>
                      </div>
                      <div className="w-full">
                        <h5 className="mb-4 font-bold leading-[22px] text-[#BC1C21]">
                          {title}
                        </h5>
                        <ul>
                          <li className="text-[#CD5D5D]">
                            {description}
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            {action}
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
