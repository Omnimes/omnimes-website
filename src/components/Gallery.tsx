import { useTranslations } from "next-intl"
import image1 from "../../public/images/gallery/01.jpg"
import image2 from "../../public/images/gallery/02.jpg"
import image3 from "../../public/images/gallery/03.jpg"
import image4 from "../../public/images/gallery/04.jpg"
import image5 from "../../public/images/gallery/05.jpg"
import image6 from "../../public/images/gallery/06.jpg"
import image7 from "../../public/images/gallery/07.jpg"
import image8 from "../../public/images/gallery/08.jpg"
import image9 from "../../public/images/gallery/09.jpg"
import image10 from "../../public/images/gallery/10.jpg"
import image11 from "../../public/images/gallery/11.jpg"
import image12 from "../../public/images/gallery/12.jpg"
import image13 from "../../public/images/gallery/13.jpg"
import image14 from "../../public/images/gallery/14.jpg"
import image15 from "../../public/images/gallery/15.jpg"
import image16 from "../../public/images/gallery/16.jpg"
import image17 from "../../public/images/gallery/17.jpg"
import image18 from "../../public/images/gallery/18.jpg"
import { LayoutGrid } from "./atoms/GalleryLayout";

export function Gallery() {
    return (
      <main className="mx-auto max-w-[1960px] py-20 p-4 min-h-screen">
        <LayoutGrid cards={cards} />
      </main>
    );
  }

const Skeleton = ({title}: {title: string}) => {
  const t = useTranslations("Gallery")
  return (
    <div className="text-left w-full text-white">
      <p className="font-bold text-xl">{t(title)}</p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <Skeleton title={"eventWIA"} />,
    thumbnail: image6.src,
    alt: "alt1"
  },
  {
    id: 2,
    content: <Skeleton title={"eventWIA"} />,
    thumbnail: image7.src,
    alt: "alt2"
  },
  {
    id: 3,
    content: <Skeleton title={"eventWIA"} />,
    thumbnail: image8.src,
    alt: "alt3"
  },
  {
    id: 4,
    content: <Skeleton title={"eventWIA"} />,
    thumbnail: image9.src,
    alt: "alt4"
  },
  {
    id: 5,
    content: <Skeleton title={"eventWIA"} />,
    thumbnail: image10.src,
    alt: "alt5"
  },
  {
    id: 6,
    content: <Skeleton title={"eventWIA"} />,
    thumbnail: image11.src,
    alt: "alt6"
  },
  {
    id: 7,
    content: <Skeleton title={"eventWIA"} />,
    thumbnail: image12.src,
    alt: "alt7"
  },
  {
    id: 8,
    content: <Skeleton title={"eventWIA"} />,
    thumbnail: image13.src,
    alt: "alt8"
  },
  {
    id: 9,
    content: <Skeleton title={"eventWIA"} />,
    thumbnail: image14.src,
    alt: "alt9"
  },
  {
    id: 10,
    content: <Skeleton title={"eventWIA"} />,
    thumbnail: image15.src,
    alt: "alt10"
  },
  {
    id: 11,
    content: <Skeleton title={"eventWIA"} />,
    thumbnail: image16.src,
    alt: "alt11"
  },
  {
    id: 12,
    content: <Skeleton title={"eventWIA"} />,
    thumbnail: image17.src,
    alt: "alt12"
  },
  {
    id: 13,
    content: <Skeleton title={"eventWIA"} />,
    thumbnail: image18.src,
    alt: "alt13"
  },
  {
    id: 14,
    content: <Skeleton title={"eventMesse"} />,
    thumbnail: image1.src,
    alt: "alt14"
  },
  {
    id: 15,
    content: <Skeleton title={"eventMesse"} />,
    thumbnail: image2.src,
    alt: "alt15"
    },
  {
    id: 16,
    content: <Skeleton title={"eventMesse"} />,
    thumbnail: image3.src,
    alt: "alt16"
  },
  {
    id: 17,
    content: <Skeleton title={"eventMesse"} />,
    thumbnail: image4.src,
    alt: "alt17"
  },
  {
    id: 18,
    content: <Skeleton title={"eventMesse"} />,
    thumbnail: image5.src,
    alt: "alt18"
  },
];
