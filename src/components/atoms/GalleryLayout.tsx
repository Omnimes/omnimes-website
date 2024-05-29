"use client";
import Image from 'next/image'
import Link from 'next/link';
import Logo from '@/data/logo.svg';
import { cn } from "@/utils/utils";
import { Arrow } from './GalleryArrow';
import { Vortex } from './Vortex';
import { motion } from "framer-motion";
import { Spinner } from "@nextui-org/react";
import { LuXCircle } from "react-icons/lu";
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from 'next-intl';

type Card = {
    id: number;
    content: JSX.Element | React.ReactNode | string;
    thumbnail: string;
    alt: string;
};
export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
    const [selected, setSelected] = useState<Card | null>(null);
    const [nullFromChild, setNull] = useState<boolean>(false);
    const [direction, setDirection] = useState<string>("");
    const t = useTranslations("Gallery");
    const handleClick = (card: Card) => {
        setSelected(card);
    };

    const handleOutsideClick = useCallback(() => {
        setSelected(null);
    }, []);

    const handleMove = useCallback((value: string) => {
        setDirection(value)
    }, [])

    const changeImage = useCallback((direction: string) => {
        if (!selected?.id) return;
        
        const findImageById = (id: number) => cards.find(card => card.id === id) || null;
        const newId = direction === 'next' ? selected.id + 1 : selected.id - 1;
        const boundaryId = direction === 'next' ? 1 : cards.length;
        
        const nextImage = findImageById(newId) || findImageById(boundaryId);
        setSelected(nextImage);
    }, [cards, selected?.id]);

    const changeImageNext = useCallback(() => changeImage('next'), [changeImage]);
    const changeImagePrev = useCallback(() => changeImage('prev'), [changeImage]);

    useEffect(() => {
        const handleEsc = (event: { key: string; }) => {
            if (event.key === 'Escape') handleOutsideClick();
            if (event.key === 'ArrowRight') changeImageNext();
            if (event.key === 'ArrowLeft') changeImagePrev();
        };

        if (direction == 'right') changeImageNext();
        if (direction == 'left') changeImagePrev();
        if (direction != "") setDirection("")

        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [changeImageNext, changeImagePrev, handleOutsideClick, direction]);

    useEffect(() => {
        setSelected(null);
        setNull(false);
    }, [nullFromChild])

    return (
        <div className="w-full h-full mx-auto gap-4 relative columns-1 sm:columns-2 lg:columns-3 xl:columns-4">
            <div className="after:content relative mb-5 flex h-[450px] md:h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
                <Vortex
                    className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
                    rangeY={800}
                    particleCount={500}
                    baseHue={250}
                >
                    <Image
                        src={Logo.src}
                        alt={'OmniMES logo'}
                        width={44}
                        height={36}
                        priority
                    />
                    <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
                        {t("title")}
                    </h1>
                    <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
                        {t("desc")}
                    </p>
                    <Link
                        className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
                        href="/contact"
                        rel="noreferrer"
                    >
                        {t("contact")}
                    </Link>
                </Vortex>

            </div>
            {cards.map((card, i) => (
                <div
                    key={i}
                    className={"after:content group relative mb-5 block w-full after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight rounded-sm cursor-zoom-in"}
                >
                    <div
                        onClick={() => handleClick(card)}
                        className={cn(
                            "relative overflow-hidden shadow-lg",
                            selected?.id === card.id && "rounded-lg m-auto z-30 bg-white h-full w-full"
                        )}
                    >
                        <BlurImage card={card} />
                        {selected?.id === card.id &&
                            <SelectedCard
                                selected={selected}
                                amountImage={cards.length}
                                onClickMove={(value) => handleMove(value)}
                                onClickOutsite={() => setNull(true)} />}
                    </div>
                </div>
            ))}
        </div>
    )
}

const SelectedCard = ({ selected, amountImage, onClickMove, onClickOutsite }: { selected: Card | null, amountImage: number, onClickMove: (value: string) => void, onClickOutsite: () => void }) => {
    const [loaded, setLoaded] = useState(false);

    const handleClick = () => {
        onClickOutsite();
    }

    const handleMove = (value: string) => {
        onClickMove(value);
    }

    return (
        <div className="fixed h-full flex overflow-auto justify-center inset-0 shadow-2xl z-[50] cursor-default">
            {!loaded && <Spinner className="absolute top-1/2 left-1/2" color="danger" />}
            <div className="absolute h-full w-full bg-white opacity-90 dark:bg-black dark:opacity-80" onClick={onClickOutsite} />
            <div
                className="absolute px-4 lg:px-0 pb-4 w-full max-w-[1024px] h-auto max-h-screen z-[60] mt-[100px]"
            >
                <motion.div
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                >
                    <Image
                        src={selected?.thumbnail || ""}
                        alt={selected?.alt || ""}
                        width={4096}
                        height={2731}
                        priority={true}
                        className={"relative pointer-events-none h-auto w-full max-h-[600px] object-cover rounded-lg shadow-lg"}
                        onLoad={() => setLoaded(true)}
                    />
                    <LuXCircle
                        className={cn(
                            "bg-black/80 rounded-tr-lg rounded-bl-lg p-1.5  text-white",
                            "cursor-pointer absolute top-0 right-[16px] z-[100]",
                            "w-[35px] h-[35px]",
                            "md:w-[50px] md:h-[50px]",
                            "lg:top-0 lg:right-0 md:bg-black/70"
                        )}
                        onClick={handleClick}
                    />
                </motion.div>
                <div className="flex justify-center items-center gap-5 mt-3 pb-7">
                    <div className="btn-conteiner shrink grow basis-auto justify-end">
                        <div className="btn-content" onClick={() => handleMove("left")}>
                            <Arrow rotate={true} />
                        </div>
                    </div>

                    <p>{selected?.id}/{amountImage}</p>

                    <div className="btn-conteiner shrink grow basis-auto justify-start">
                        <div className="btn-content" onClick={() => handleMove("right")}>
                            <Arrow />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BlurImage = ({ card }: { card: Card }) => {
    const [loaded, setLoaded] = useState(false);
    const t = useTranslations("Gallery");
    return (
        <>
            <Image
                src={card.thumbnail}
                height="500"
                width="500"
                onLoad={() => setLoaded(true)}
                className={cn(
                    "object-cover object-top h-full w-full transition duration-200 relative rounded-lg",
                    loaded ? "blur-none" : "blur-md"
                )}
                alt={t(card.alt)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/40 rounded-lg"></div>
            <span className='absolute left-0 bottom-0 p-4'>
                {card.content}
            </span>
        </>
    );
};