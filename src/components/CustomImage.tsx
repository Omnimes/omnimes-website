// import Image from "next/image"
import { Image } from "@nextui-org/react";
type Props = {
    src: string,
    alt: string,
    priority?: string,
}

export default function CustomImage({ src, alt, priority }: Props) {

    // const prty = priority ? true : false
    // priority={prty}

    return (
        <div className="w-full h-full flex justify-center">
            <Image
                className="w-auto h-auto z-1"
                src={src}
                alt={alt}
                width={650}
                height={650}
                loading={'lazy'}
                radius={'lg'}
                shadow={'md'}
            />
        </div>
    )
}