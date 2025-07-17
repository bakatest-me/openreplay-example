"use client";
import Tracker from "@openreplay/tracker";
import { useState } from "react";
import { Button } from "./ui/button";

const tracker = new Tracker({
  projectKey: "qZVlWIGr1HKr3X6u19A2",
  // __DISABLE_SECURE_MODE: true,
  ingestPoint: "https://openreplay.sheepslow.life/ingest",
});

export default function Openreplay() {
  const [isTracking, setIsTracking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [trackID, setTrackID] = useState<string>("");

  const toggleTracking = function () {
    if (!isTracking) {
      const uuid = crypto.randomUUID();
      setTrackID(uuid);
      setIsTracking(true);
      tracker.start({
        userID: uuid,
        sessionHash: uuid,
      });
      return;
    }

    tracker.stop();
    setIsTracking(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(trackID);
      setCopied(true);
      console.log("UUID copied to clipboard:", trackID);

      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy UUID:", err);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {trackID && (
          <div className="bg-white border rounded-md p-2 text-xs font-mono max-w-xs break-all">
            <div className="flex items-center justify-between gap-2">
              <span>UUID: {trackID}</span>
              <Button
                type="button"
                onClick={copyToClipboard}
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs"
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
        )}
        <Button
          type="button"
          onClick={toggleTracking}
          variant={isTracking ? "destructive" : "outline"}
        >
          {isTracking ? "Stop Track" : "Start Track"}
        </Button>
      </div>
    </>
  );
}
