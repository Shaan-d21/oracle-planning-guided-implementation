"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import { useState } from "react";
import styles from "./oracle-screenshot.module.css";

type OracleScreenshotProps = {
  asset: string;
  capture: string;
  className: string;
  phase: "phase-06" | "phase-07" | "phase-08" | "phase-09" | "phase-10" | "phase-11" | "phase-12" | "phase-13" | "phase-14" | "phase-15" | "phase-16" | "phase-17" | "phase-18" | "phase-19" | "phase-20" | "phase-21" | "phase-25";
  title: string;
};

export function OracleScreenshot({ asset, className, phase, title }: OracleScreenshotProps) {
  const [loaded, setLoaded] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<string>();
  const src = `/training/oracle-planning/${phase}/${asset}`;

  return (
    <div
      className={`${className} ${styles.shell} ${loaded ? styles.loaded : ""}`}
      data-screenshot-state={loaded ? "loaded" : "reserved"}
    >
      {!loaded && (
        <div className={styles.fallback}>
          <Camera size={30} />
          <strong>Guided Oracle walkthrough</strong>
          <p>Follow the navigation, trainee action, and validation guidance for this step.</p>
        </div>
      )}
      <figure aria-hidden={!loaded} className={`${styles.figure} ${loaded ? styles.visible : styles.probe}`}>
        <a href={src} rel="noreferrer" tabIndex={loaded ? undefined : -1} target="_blank" title={`Open ${title} full size`}>
          <div className={styles.media} style={aspectRatio ? { aspectRatio } : undefined}>
            <Image
              alt={`${title} in Oracle Planning`}
              fill
              onError={() => {
                setAspectRatio(undefined);
                setLoaded(false);
              }}
              onLoad={(event) => {
                const { naturalHeight, naturalWidth } = event.currentTarget;
                if (naturalHeight > 0 && naturalWidth > 0) {
                  setAspectRatio(`${naturalWidth} / ${naturalHeight}`);
                }
                setLoaded(true);
              }}
              sizes="(max-width: 1000px) 100vw, 900px"
              src={src}
              unoptimized
            />
          </div>
        </a>
        <figcaption>Open the screenshot at full size to inspect Oracle labels and selected values.</figcaption>
      </figure>
    </div>
  );
}
