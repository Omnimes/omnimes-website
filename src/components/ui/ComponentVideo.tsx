'use client'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Skeleton } from '@nextui-org/react'
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

export const ComponentVideo = ({ path }: { path: string }) => {
  const [ready, setReady] = useState(false)

  const handleReady = () => {
    setReady(true);
  }
  return (
    <>
      <Skeleton id="sc" className={ready ? "none" : "-z-[1] aspect-video min-h-[300px] md:max-w-[450px] h-auto w-full rounded-lg shadow-xl absolute right-0"} />
      <ReactPlayer
        id="video"
        className="md:max-w-[450px] z-1 ml-auto"
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
