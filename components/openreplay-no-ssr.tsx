"use client";
import dynamic from "next/dynamic";

const OpenReplayNoSSR = dynamic(() => import("./tracking-controls"), {
  ssr: false,
});

export default OpenReplayNoSSR;
