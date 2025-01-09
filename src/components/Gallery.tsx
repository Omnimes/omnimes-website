"use client"

import "react-image-lightbox/style.css"

import { useEffect, useState } from "react"
import Link from "next/link"
import { sortImagesByDate } from "@/utils/utils"
import { Spinner } from "@nextui-org/react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Image } from "react-grid-gallery"
import Lightbox from "react-image-lightbox"

import { importAll } from "@/lib/importImage"

import { Gallery } from "./GalleryGrid/Gallery"
import { ImagesSlider } from "./ui/ImagesSlider"
import { SubtitleNormal } from "./ui/Subtitle"

export const GalleryMES = () => {
  const [index, setIndex] = useState(-1)
  const [images, setImages] = useState<Image[]>([])
  const [imagesFHD, setImagesFHD] = useState<Image[]>([])
  const [imagesSlider, setImageSlider] = useState<string[]>([])
  const t = useTranslations("Gallery")

  const nextIndex = (index + 1) % imagesFHD.length
  const nextImage = imagesFHD[nextIndex] || imagesFHD[index]
  const prevIndex = (index + imagesFHD.length - 1) % imagesFHD.length
  const prevImage = imagesFHD[prevIndex] || imagesFHD[index]

  const handleClick = (index: number) => setIndex(index)
  const handleClose = () => setIndex(-1)
  const handleMovePrev = () => setIndex(prevIndex)
  const handleMoveNext = () => setIndex(nextIndex)

  useEffect(() => {
    if (images.length) return

    const contexts = [
      require.context("../../public/images/gallery/mini", false, /^\.\/.*$/, "lazy"),
    ]

    Promise.all(contexts.map((context) => importAll(context)))
      .then((results) => {
        const sortedArray = sortImagesByDate(
          results.flat().map((item) => ({ ...item, alt: t(item.alt) }))
        )
        setImages(sortedArray)
      })
      .catch((error) => {
        console.error("Error loading images:", error)
      })
  }, [images, t])

  useEffect(() => {
    if (imagesFHD.length) return

    const contexts = [require.context("../../public/images/gallery/fhd", false, /^\.\/.*$/, "lazy")]

    Promise.all(contexts.map((context) => importAll(context)))
      .then((results) => {
        const sortedArray = sortImagesByDate(results.flat()).map((item) => ({
          ...item,
          alt: t(item.alt),
        }))
        const simpleImageArr = results.flat().map((img) => img.src)
        setImageSlider(simpleImageArr)
        setImagesFHD(sortedArray)
      })
      .catch((error) => {
        console.error("Error loading images:", error)
      })
  }, [imagesFHD, t])

  return (
    <main className="relative pb-20">
      {!imagesSlider.length && (
        <div className="absolute left-1/2 top-1/2 z-[130] mx-auto max-w-screen-xl -translate-x-1/2 -translate-y-1/2 text-center">
          <Spinner color="primary" />
        </div>
      )}
      <ImagesSlider className="h-[calc(100vh-64px)]" images={imagesSlider}>
        <motion.div
          initial={{
            opacity: 0,
            y: -80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="z-50 flex max-w-screen-xl flex-col items-center justify-center"
        >
          <SubtitleNormal text={t("subtitle")} />
          <motion.p className="inter-var mb-1 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-2xl font-bold text-transparent md:text-4xl lg:text-7xl">
            {t("titleHero")}
          </motion.p>
          <motion.p className="inter-var bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-base font-normal text-transparent md:text-lg">
            {t("descHero")}
          </motion.p>
        </motion.div>
        <Link href="#gallery" className="containerArrow">
          <div className="chevron"></div>
          <div className="chevron"></div>
          <div className="chevron"></div>
          <p className="text">{t("scroll")}</p>
        </Link>
      </ImagesSlider>
      <Gallery
        id="gallery"
        images={images}
        onClick={handleClick}
        enableImageSelection={false}
        margin={8}
        rowHeight={270}
        defaultContainerWidth={1024}
      />
      {!!imagesFHD[index] && (
        <Lightbox
          mainSrc={imagesFHD[index].src}
          mainSrcThumbnail={imagesFHD[index].src}
          nextSrc={nextImage.src}
          nextSrcThumbnail={nextImage.src}
          prevSrc={prevImage.src}
          prevSrcThumbnail={prevImage.src}
          animationDisabled={false}
          animationOnKeyInput={true}
          imageTitle={imagesFHD[index].alt}
          imageCaption={imagesFHD[index].caption}
          imageCrossOrigin={"anonymous"}
          onCloseRequest={handleClose}
          onMovePrevRequest={handleMovePrev}
          onMoveNextRequest={handleMoveNext}
          nextLabel={t("nextLabel")}
          prevLabel={t("prevLabel")}
          zoomInLabel={t("zoomInLabel")}
          zoomOutLabel={t("zoomOutLabel")}
          closeLabel={t("closeLabel")}
        />
      )}
    </main>
  )
}
