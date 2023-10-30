import React, { useContext, useEffect, useRef, useState } from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Draggable from "react-draggable";
import Proccess from "./process";
import { lamport, prccessues } from "./lamport/lamport";
import { ProcessContext } from "./context";

const boxStyle = {
  border: "grey solid 2px",
  borderRadius: "10px",
  padding: "5px",
};

export default function Xarrows() {
  const { nOfP, messages, nOfE, proccessus, setProccessus } =
    useContext(ProcessContext);
  const [count, setCount] = useState(0);
  const lamportE = () => {
    const proccess = [...Array(nOfP)].map((e, i) => {
      const mes = messages.filter((e) => e.fromP === i + 1);

      const maxEventhowSend = Math.max(...mes.map((e) => e.fromE));
      return new prccessues(
        i + 1,
        nOfE[i],
        [...Array(isNaN(maxEventhowSend) ? maxEventhowSend : 0)].map((e, i) => {
          return mes.findIndex((v) => v.fromE == i + 1) >= 0
            ? {
                to: mes[mes.findIndex((v) => v.fromE == i + 1)].toP,
                event: mes[mes.findIndex((v) => v.fromE == i + 1)].toE,
              }
            : {};
        })
      );
    });
    setProccessus([...lamport([...proccess])]);
  };
  return (
    <div className="w-full flex h-screen justify-center items-center">
      <div className="w-full flex flex-col gap-28 items-center">
        <Xwrapper>
          {[...Array(nOfP)].map((e, i) => (
            <div className="grid grid-cols-12 w-9/12 " key={i}>
              <div className="col-span-1">
                <p className="text-white">{i + 1}</p>
              </div>
              <div className="flex justify-center items-center col-span-11">
                <Proccess
                  proccess={i}
                  onDrag={() => {
                    setCount((prev) => prev + 1);
                  }}
                />
              </div>
            </div>
          ))}
          <button
            onClick={lamportE}
            type="submit"
            className="inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
          >
            Lamport
          </button>
          {messages.map(
            (e, i) =>
              e.fromE &&
              e.fromP &&
              e.toP &&
              e.toE && (
                <Xarrow
                  start={`e${e.fromP}${e.fromE}`}
                  end={`e${e.toP}${e.toE}`}
                  path={"straight"}
                  dashness={{ animation: 1}}
                  labels= {{
                    middle: (
                      <div
                        contentEditable
                        suppressContentEditableWarning={true}
                        className="-translate-x-5 text-purple-500">
                        m{i+1}
                      </div>
                    ),
                  }}
                />
              )
          )}
        </Xwrapper>
      </div>
    </div>
  );
}
