"use client";

import { useState } from "react";

import { Billboard } from "@/types";
import useRefs from "@/hooks/useRefs";

interface BillboardsProps {
  data: Billboard[];
}

const Billboards: React.FC<BillboardsProps> = ({ data }) => {
  const [currentBillboard, setCurrentBillboard] = useState(0);
  const { refs, setRef } = useRefs();

  const scrollToBillboard = (i: number) => {
    setCurrentBillboard(i);
    const ref = refs[data[i].id];

    if (!ref) return;

    ref.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start"
    });
  };

  const next = () => {
    if (currentBillboard >= data.length - 1) {
      scrollToBillboard(0);
    } else {
      scrollToBillboard(currentBillboard + 1);
    }
  };

  const previous = () => {
    if (currentBillboard === 0) {
      scrollToBillboard(data.length - 1);
    } else {
      scrollToBillboard(currentBillboard - 1);
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative flex flex-col flex-wrap justify-center items-center aspect-square md:aspect-[2.4/1] overflow-hidden">
        {data.map((data) => (
          <div
            key={data.id}
            ref={(element) => setRef(element, data.id)}
            className="w-full p-4 sm:p-6 lg:p-8 rounded-xl"
          >
            <div
              style={{ backgroundImage: `url(${data?.imageUrl})` }}
              className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
            >
              <div className="flex flex-col items-center justify-center w-full h-full text-center gap-y-8">
                <div className="relative max-w-xs p-8 text-3xl font-bold text-white sm:text-5xl lg:text-6xl sm:max-w-xl">
                  <div className="absolute top-0 right-4 md:right-0 w-[40%] h-[90%] border-4 border-l-0 border-b-0  border-white" />
                  <div className="absolute bottom-0 left-4 md:left-0 w-[40%] h-[90%] border-4 border-r-0 border-t-0  border-white" />
                  {data.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {currentBillboard === 0 ? null : (
        <button
          onClick={previous}
          className="absolute z-30 flex items-center justify-center p-4 px-2 transition-all bg-gray-100 border rounded-full shadow-md cursor-pointer left-8 md:left-12 -bottom-8 md:-bottom-10 active:scale-90 h-11 group focus:outline-none"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full group-focus:outline-none">
            <svg
              className="w-[60%] h-[60%] text-white dark:text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
      )}
      {currentBillboard === data.length - 1 ? null : (
        <button
          onClick={next}
          className="absolute z-30 flex items-center justify-center p-4 px-2 transition-all bg-gray-100 border rounded-full shadow-md cursor-pointer right-8 md:right-12 -bottom-8 md:-bottom-10 active:scale-90 h-11 group focus:outline-none"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full group-focus:outline-none">
            <svg
              className="w-[60%] h-[60%] text-white dark:text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      )}
    </div>
  );
};

export default Billboards;
