'use client'
// import { Avatar, AvatarGroup } from '@nextui-org/react'
import { Heading } from './atoms/Heading'
import { SubtitleNormal } from './atoms/Subtitle'
import { DescriptionSecondary } from './atoms/Description'
import { useTranslations } from 'next-intl'
import { Avatar, AvatarImage } from './atoms/Avatar'

export const WhatPeopleSay = () => {
  const t = useTranslations('Opinion')

  const opinion = [
    {
      opinion: t("opinion1"),
      name: 'Aleksandra Nowak',
      images: '/images/avatars/avatar_w1.png',
    },
    {
      opinion: t("opinion2"),
      name: 'Michał Zając',
      images: '/images/avatars/avatar_m1.png',
    },
    {
      opinion: t("opinion3"),
      name: 'Piotr Nowicki',
      images: '/images/avatars/avatar_m2.png',
    },
    {
      opinion: t("opinion4"),
      name: 'Joanna Kwiatkowska',
      images: '/images/avatars/avatar_w2.png',
    },
    {
      opinion: t("opinion5"),
      name: 'Robert Kowalik',
      images: '/images/avatars/avatar_m3.png',
    },
    {
      opinion: t("opinion6"),
      name: 'Adrian Woźniak',
      images: '/images/avatars/avatar_m4.png',
    },
  ]
  return (
    <div className="mx-auto w-full max-w-6xl md:text-center">
      <SubtitleNormal text={t("opinion")} />
      <Heading text={t("title")} />
      <div className="mt-6 gap-6 sm:columns-1 md:columns-3">
        {opinion.slice(0, 3).map((item) => {
          return (
            <div key={item.name} className="break-inside-avoid-column pt-6 text-left">
              <section
                className="bg-layer-2 hover:bg-layer-3 block rounded-2xl pb-5 pt-4 md:p-2"
              >
                <div className="flex mb-4 content-center items-center gap-2">
                  <Avatar>
                    <AvatarImage alt="Picture" src={item.images} />
                  </Avatar>
                  <h6 className="text-heading font-semibold">{item.name}</h6>
                </div>
                <DescriptionSecondary text={item.opinion} />
              </section>
            </div>
          )
        })}
      </div>
      <section className="d-flex mt-10 gap-1">
        {/* <AvatarGroup
          isBordered
          max={3}
          total={10}
          renderCount={(count) => (
            <p className="ms-2 text-small font-medium text-foreground">+{count} {t("other")}</p>
          )}
        >
          {opinion.slice(0, 3).map((item) => {
            return <Avatar key={item.name} src={item.images} />
          })}
        </AvatarGroup> */}
      </section>
    </div>
  )
}
