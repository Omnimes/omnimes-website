'use client'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useLocale } from 'next-intl'
import { VideoPlayIcon } from './atoms/Icons'
import { Skeleton } from '@nextui-org/react'
import { Suspense, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { Subtitle } from './atoms/Subtitle'
import { useTranslations } from 'next-intl'
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

export const ComponentVideo = () => {
  const t = useTranslations('Video')
  const locale = useLocale()
  const { theme } = useTheme()

  const playerRef = useRef<any>()

  const pathPoster = theme == 'dark' ? '/images/poster.dark.pl.png' : '/images/poster.pl.png'
  const pathPosterOther = theme == 'dark' ? '/images/poster.dark.en.png' : '/images/poster.en.png'

  const poster = locale == 'pl' ? pathPoster : pathPosterOther
  const path = locale == 'pl' ? '/videos/video.pl.mp4' : '/videos/video.en.mp4'

  useEffect(() => {
    if (playerRef && playerRef.current) {
      playerRef.current?.showPreview()
    }
  })
  const handleOnReady = () => {
    const video = document.getElementById('video') as HTMLElement
    video.classList.remove('hidden')
    playerRef.current?.showPreview()
  }

  return (
    <section className="relative mb-8 h-auto min-h-48 sm:min-h-80 md:min-h-96 lg:min-h-[500px]">
      <div className="mb-8 text-xl text-primary-500 md:text-center">
        <Subtitle text={t("title")} />
      </div>
      <Suspense
        fallback={
          <Skeleton className="min-h-56 w-full rounded-lg shadow-xl sm:min-h-[350px] md:min-h-[400px] lg:min-h-[500px]" />
        }
      >
        <ReactPlayer
          id="video"
          url={path}
          controls
          width="100%"
          height="100%"
          pip
          config={{
            file: {
              forceVideo: true,
            },
          }}
          light={
            <Image
              src={poster}
              alt={'poster'}
              width={1024}
              height={576}
              priority
              className="shadow-video dark:shadow-video-dark h-auto w-full rounded-lg"
            />
          }
          playIcon={
            <button className="animate-fade-in p-2 group absolute left-1/2 top-1/2 z-1 box-border inline-flex h-unit-20 w-unit-20 min-w-unit-20 -translate-x-1/2 select-none appearance-none items-center justify-center gap-unit-3 overflow-hidden whitespace-nowrap rounded-large bg-default bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] px-unit-0 text-medium font-normal text-default-foreground subpixel-antialiased shadow-lg outline-none tap-highlight-transparent transition-transform-colors-opacity data-[focus-visible=true]:z-10 data-[pressed=true]:scale-[0.97] data-[hover=true]:opacity-hover data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus motion-reduce:transition-none">
              <VideoPlayIcon />
            </button>
          }
          onReady={handleOnReady}
        />
      </Suspense>
    </section>
  )
}
