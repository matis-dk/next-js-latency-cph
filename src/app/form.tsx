"use client";

import { useState } from "react";
import { IsoString, Latency } from "./types";
import { getMeasurement } from "./actions";

export function Form() {
  const [latency, setLatency] = useState<null | Array<string>>();
  const [e2e, setE2E] = useState("-");
  const createMeasurement = async () => {
    console.log("making measurement");
    const client_start = new Date().toISOString();

    await getMeasurement().then((result) => {
      const client_end = new Date().toISOString();

      const l: Latency = {
        client_start,
        client_end,
        server_start: result.server_start,
        server_end: result.server_end,
        middleware_start: decodeURIComponent(
          getClientSideCookie("middleware_start")!
        ),
        middleware_end: decodeURIComponent(
          getClientSideCookie("middleware_end")!
        ),
      };

      const serverRegion = result.server_region;
      const middlewareRegion = decodeURIComponent(
        getClientSideCookie("middleware_region")!
      );

      setLatency([
        `${diff(l.client_start, l.middleware_start)} client to middlware`,
        `${diff(
          l.middleware_start,
          l.middleware_end
        )} middleware [${middlewareRegion}]`, // 100ms delay for our application logic
        `${diff(l.middleware_end, l.server_start)} middleware to server`,
        `${diff(l.server_start, l.server_end)} server [${serverRegion}]`, // 100ms delay for our application logic
        `${diff(l.server_end, l.client_end)} server to client`,
      ]);

      setE2E(diff(l.client_start, l.client_end));

      console.log("latency timestamps ====> ", l);
    });
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        {latency ? <pre>{JSON.stringify(latency, null, 2)}</pre> : "null"}
      </div>
      <div>End-to-end {e2e}</div>
      <button onClick={createMeasurement}>Make measurement</button>
    </div>
  );
}

export const getClientSideCookie = (name: string): string | undefined => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];

  return cookieValue;
};

const diff = (t1: IsoString, t2: IsoString) =>
  `${new Date(t2).getTime() - new Date(t1).getTime()}ms `;
