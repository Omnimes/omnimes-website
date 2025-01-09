"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Skeleton } from "@nextui-org/react"

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false })

export const ComponentVideo = ({ path }: { path: string }) => {
  const [ready, setReady] = useState(false)

  const handleReady = () => {
    setReady(true)
  }
  return (
    <>
      <Skeleton
        id="sc"
        className={
          ready
            ? "none"
            : "absolute right-0 z-[-1] aspect-video h-auto min-h-[300px] w-full rounded-lg shadow-xl md:max-w-[450px]"
        }
      />
      <ReactPlayer
        id="video"
        className="z-1 ml-auto md:max-w-[450px]"
        url={path}
        controls={false}
        playing={true}
        width="100%"
        height="auto"
        loop={true}
        muted={true}
        config={{
          file: {
            forceVideo: true,
          },
        }}
        onReady={handleReady}
      />
    </>
  )
}
