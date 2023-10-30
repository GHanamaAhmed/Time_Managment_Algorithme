import React, { useContext, useState } from "react";
import { ProcessContext } from "./context";
import { useNavigate,useLocation } from "react-router-dom";

export default function Form() {
  const { nOfP, setNOfP, nOfE, setNOfE } = useContext(ProcessContext);
  const navigate=useNavigate()
  return (
    <>
      <div className="w-full flex justify-center items-center pt-7">
        {/* End Col */}
        <div className="relative w-6/12">
          {/* Card */}
          <div className="flex flex-col border rounded-xl p-4 sm:p-6 lg:p-10 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Fill in the form
            </h2>
            <form>
              <div className="mt-6 grid gap-4 lg:gap-6">
                {/* End Grid */}
                <div>
                  <label
                    htmlFor="hs-work-email-hire-us-1"
                    className="block text-sm text-gray-700 font-medium dark:text-white"
                  >
                    Numbre of processuss
                  </label>
                  <input
                    min={0}
                    onChange={(e) => {
                      e.preventDefault();
                      setNOfP(Number(e.currentTarget.value));
                      setNOfE([
                        ...Array(Number(e.currentTarget.value)).fill(0),
                      ]);
                    }}
                    type="number"
                    name="hs-work-email-hire-us-1"
                    id="hs-work-email-hire-us-1"
                    autoComplete="email"
                    className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  />
                </div>
                {[...Array(nOfP)].map((e, i) => (
                  <div key={i}>
                    <label
                      htmlFor="hs-work-email-hire-us-1"
                      className="block text-sm text-gray-700 font-medium dark:text-white"
                    >
                      Numbre of events process {i + 1}
                    </label>
                    <input
                      min={0}
                      onChange={(e) => {
                        e.preventDefault();
                        setNOfE((prev) => {
                          let newArray = [...prev];
                          newArray[i] = Number(e.target.value);
                          return newArray;
                        });
                      }}
                      type="number"
                      name="hs-work-email-hire-us-1"
                      id="hs-work-email-hire-us-1"
                      autoComplete="email"
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    />
                  </div>
                ))}
              </div>
              {/* End Checkbox */}
              <div className="mt-6 grid">
                <button
                onClick={(e)=>{
                    e.preventDefault()
                    navigate("/simulator")
                }}
                  type="submit"
                  className="inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
          {/* End Card */}
        </div>
        {/* End Col */}
      </div>
      {/* End Hire Us */}
    </>
  );
}
