"use client"
import "react-image-lightbox/style.css";
import Link from "next/link";
import Lightbox from "react-image-lightbox";
import { motion } from "framer-motion";
import { Gallery, Image } from "react-grid-gallery";
import { useTranslations } from 'next-intl';
import { useEffect, useState } from "react";
import { importAll } from "@/lib/importImage";
import { sortImagesByDate } from "@/utils/utils";
import { SubtitleNormal } from "./atoms/Subtitle";
import { ImagesSlider } from "./atoms/ImagesSlider";

export const GalleryMES = () => {
    const [index, setIndex] = useState(-1);
    const [images, setImages] = useState<Image[]>([]);
    const [imagesFHD, setImagesFHD] = useState<Image[]>([]);
    const [imagesSlider, setImageSlider] = useState<string[]>([]);
    const t = useTranslations("Gallery");
    
    const nextIndex = (index + 1) % imagesFHD.length;
    const nextImage = imagesFHD[nextIndex] || imagesFHD[index];
    const prevIndex = (index + imagesFHD.length - 1) % imagesFHD.length;
    const prevImage = imagesFHD[prevIndex] || imagesFHD[index];

    const handleClick = (index: number) => setIndex(index);
    const handleClose = () => setIndex(-1);
    const handleMovePrev = () => setIndex(prevIndex);
    const handleMoveNext = () => setIndex(nextIndex);

    useEffect(() => {
        if (images.length) return;

        const contexts = [require.context("../../public/images/gallery/mini", false, /^\.\/.*$/, "lazy")];
        
        Promise.all(contexts.map(context => importAll(context)))
            .then(results => {
                const sortedArray = sortImagesByDate(results.flat().map(item => ({ ...item, alt: t(item.alt)})));
                setImages(sortedArray);
            })
            .catch(error => {
                console.error("Error loading images:", error);
            });

    }, [images, t]);

    useEffect(() => {
        if (imagesFHD.length) return;

        const contexts = [require.context("../../public/images/gallery/fhd", false, /^\.\/.*$/, "lazy")];

        Promise.all(contexts.map(context => importAll(context)))
            .then(results => {
                const sortedArray = sortImagesByDate(results.flat()).map(item => ({ ...item, alt: t(item.alt)}));
                const simpleImageArr = results.flat().map(img => img.src)
                setImageSlider(simpleImageArr);
                setImagesFHD(sortedArray);
            })
            .catch(error => {
                console.error("Error loading images:", error);
            });

    }, [imagesFHD, t]);

    return (
        <main className="pb-20 relative">
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
                    className="z-50 flex flex-col justify-center items-center"
                >
                    <SubtitleNormal text={t("subtitle")} />
                    <motion.p className="text-2xl md:text-4xl lg:text-7xl font-bold inter-var text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-1">
                        {t("titleHero")}
                    </motion.p>
                    <motion.p className="text-base md:text-lg font-normal inter-var text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                        {t("descHero")}
                    </motion.p>
                    <Link href="#gallery" className="containerArrow">
                        <div className="chevron"></div>
                        <div className="chevron"></div>
                        <div className="chevron"></div>
                        <p className="text">{t("scroll")}</p>
                    </Link>
                </motion.div>
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