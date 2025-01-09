"use client"

import { useTranslations } from "next-intl"

import { Avatar, AvatarImage } from "./ui/Avatar"
import { DescriptionSecondary } from "./ui/Description"
import { Heading } from "./ui/Heading"
import { SubtitleNormal } from "./ui/Subtitle"

const opinion = [
  {
    opinion: "opinion1",
    name: "Aleksandra Nowak",
    images: "/images/avatars/avatar_w1.png",
  },
  {
    opinion: "opinion2",
    name: "Michał Zając",
    images: "/images/avatars/avatar_m1.png",
  },
  {
    opinion: "opinion3",
    name: "Piotr Nowicki",
    images: "/images/avatars/avatar_m2.png",
  },
  {
    opinion: "opinion4",
    name: "Joanna Kwiatkowska",
    images: "/images/avatars/avatar_w2.png",
  },
  {
    opinion: "opinion5",
    name: "Robert Kowalik",
    images: "/images/avatars/avatar_m3.png",
  },
  {
    opinion: "opinion6",
    name: "Adrian Woźniak",
    images: "/images/avatars/avatar_m4.png",
  },
]
export const WhatPeopleSay = () => {
  const t = useTranslations("Opinion")

  return (
    <div className="mx-auto w-full max-w-6xl md:text-center">
      <SubtitleNormal text={t("opinion")} />
      <Heading text={t("title")} />
      <div className="mt-6 gap-6 sm:columns-1 md:columns-3">
        {opinion.slice(0, 3).map((item) => {
          return (
            <div key={item.name} className="break-inside-avoid-column pt-6 text-left">
              <section className="bg-layer-2 hover:bg-layer-3 block rounded-2xl pb-5 pt-4 md:p-2">
                <div className="mb-4 flex content-center items-center gap-2">
                  <Avatar>
                    <AvatarImage alt="Picture" src={item.images} />
                  </Avatar>
                  <h6 className="text-heading font-semibold">{item.name}</h6>
                </div>
                <DescriptionSecondary text={t(item.opinion)} />
              </section>
            </div>
          )
        })}
      </div>
    </div>
  )
}
