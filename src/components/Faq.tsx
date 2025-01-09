"use client"

import { useState } from "react"
import { FAQHardware, FAQServices, FAQSystem } from "@/data/faq"
import { Accordion, AccordionItem, Chip, Tab, Tabs } from "@nextui-org/react"
import { useTranslations } from "next-intl"
import { LuCommand, LuServerCog, LuWrench } from "react-icons/lu"

export const Faq = () => {
  const [selected, setSelected] = useState("photos")
  const t = useTranslations("FAQ")
  const tl = useTranslations("FAQQuestion")
  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label={t("options")}
        color="primary"
        classNames={{
          base: "md:mx-auto",
          tabContent: "group-data-[selected=true]:text-primary-600",
        }}
        selectedKey={selected}
        onSelectionChange={(e) => setSelected(e.toString())}
      >
        <Tab
          key="system"
          title={
            <div className="flex items-center space-x-2">
              <LuCommand className="hidden sm:inline-block" />
              <span>OmniMES</span>
              <Chip size="sm" variant="faded">
                {FAQSystem.length}
              </Chip>
            </div>
          }
        >
          <Accordion
            className="text-left"
            itemClasses={{ content: "text-small px-2 text-gray-500 dark:text-gray-400" }}
            selectionMode="multiple"
            keepContentMounted
          >
            {FAQSystem.map((item) => {
              return (
                <AccordionItem
                  key={tl(item.question)}
                  aria-label={tl(item.question)}
                  title={tl(item.question)}
                >
                  {tl(item.answer)}
                </AccordionItem>
              )
            })}
          </Accordion>
        </Tab>
        <Tab
          key="services"
          title={
            <div className="flex items-center space-x-2">
              <LuWrench className="hidden sm:inline-block" />
              <span>{t("service")}</span>
              <Chip size="sm" variant="faded">
                {FAQServices.length}
              </Chip>
            </div>
          }
        >
          <Accordion
            className="text-left"
            itemClasses={{ content: "text-small px-2 text-gray-500 dark:text-gray-400" }}
            selectionMode="multiple"
            keepContentMounted
          >
            {FAQServices.map((item) => {
              return (
                <AccordionItem
                  key={tl(item.question)}
                  aria-label={tl(item.question)}
                  title={tl(item.question)}
                >
                  {tl(item.answer)}
                </AccordionItem>
              )
            })}
          </Accordion>
        </Tab>
        <Tab
          key="hardware"
          title={
            <div className="flex items-center space-x-2">
              <LuServerCog className="hidden sm:inline-block" />
              <span>{t("hardware")}</span>
              <Chip size="sm" variant="faded">
                {FAQHardware.length}
              </Chip>
            </div>
          }
        >
          <Accordion
            className="text-left"
            itemClasses={{ content: "text-small px-2 text-gray-500 dark:text-gray-400" }}
            selectionMode="multiple"
            keepContentMounted
          >
            {FAQHardware.map((item) => {
              return (
                <AccordionItem
                  key={tl(item.question)}
                  aria-label={tl(item.question)}
                  title={tl(item.question)}
                >
                  {tl(item.answer)}
                </AccordionItem>
              )
            })}
          </Accordion>
        </Tab>
      </Tabs>
    </div>
  )
}
