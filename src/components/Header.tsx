"use client"

import { useState } from "react"
import Image from "next/image"
import { headerNavLinks, headerNavLinksDropDown } from "@/data/headerNavLinks"
import Logo from "@/data/logo.svg"
import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react"
import { SessionProvider } from "next-auth/react"
import { useTranslations } from "next-intl"
import { LuChevronDown } from "react-icons/lu"

import { Notification } from "@/components/Notification"

import { UserAccountNavClient } from "./auth/UserAccountNavClient"
import LocaleSwitcher from "./LocaleSwitcher"
import SearchButton from "./SearchButton"
import ThemeSwitch from "./ThemeSwitch"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations("HeaderLinks")

  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0"
  return (
    <SessionProvider>
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="navbar !border-border sticky top-0 border-b xl:px-0"
      >
        <NavbarContent className="min-[690px]:hidden" justify="start">
          <NavbarMenuToggle aria-label={isMenuOpen ? t("menuClose") : t("menuOpen")} />
        </NavbarContent>
        <NavbarContent className="hidden gap-4 min-[690px]:flex" justify="start">
          <li className="text-medium box-border flex grow basis-0 flex-row flex-nowrap items-center justify-start whitespace-nowrap bg-transparent no-underline">
            <Image
              src={Logo.src}
              alt={"OmniMES logo"}
              width={44}
              height={36}
              className="mr-2"
              style={{ width: "44px", height: "auto" }}
            />
            <Link href="/" className="hidden font-bold text-inherit min-[760px]:flex">
              OmniMES
            </Link>
          </li>
        </NavbarContent>
        <NavbarContent justify="center" className="hidden gap-4 min-[690px]:flex">
          <Dropdown backdrop="blur">
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="text-medium box-border list-none whitespace-nowrap bg-transparent p-0 data-[hover=true]:bg-transparent data-[active=true]:font-semibold"
                  endContent={<LuChevronDown />}
                  aria-label={t("ariaTriger")}
                  aria-labelledby={t("ariaTriger")}
                  title={t("ariaTriger")}
                  role="button"
                >
                  OmniMES
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              key={"omniMESDropDown"}
              aria-label={t("omniMESDropDown")}
              className="w-[500px]"
              itemClasses={{
                base: "gap-4",
              }}
              variant="faded"
            >
              <DropdownSection title={t("titleSectionDropDown")} showDivider>
                {headerNavLinksDropDown.slice(0, 2).map((item) => {
                  return (
                    <DropdownItem
                      key={item.href}
                      href={item.href}
                      description={t(item.desc)}
                      startContent={
                        <item.icon size={25} color={item.color} className={iconClasses} />
                      }
                      classNames={{
                        base: "gap-4",
                        description: "text-wrap text-gray-400 whitespace-normal",
                      }}
                    >
                      {t(item.title)}
                    </DropdownItem>
                  )
                })}
              </DropdownSection>
              <DropdownSection title={t("titleSectionDropDown2")}>
                {headerNavLinksDropDown.slice(2, 4).map((item) => {
                  return (
                    <DropdownItem
                      key={item.href}
                      href={item.href}
                      description={t(item.desc)}
                      startContent={
                        <item.icon size={25} color={item.color} className={iconClasses} />
                      }
                      classNames={{
                        base: "gap-4",
                        description: "text-wrap text-gray-400 whitespace-normal",
                      }}
                    >
                      {t(item.title)}
                    </DropdownItem>
                  )
                })}
              </DropdownSection>
              <DropdownSection title={t("titleSectionDropDown4")}>
                {headerNavLinksDropDown.slice(4).map((item) => {
                  return (
                    <DropdownItem
                      key={item.href}
                      href={item.href}
                      description={t(item.desc)}
                      startContent={
                        <item.icon size={25} color={item.color} className={iconClasses} />
                      }
                      classNames={{
                        base: "gap-4",
                        description: "text-wrap text-gray-400 whitespace-normal",
                      }}
                    >
                      {t(item.title)}
                    </DropdownItem>
                  )
                })}
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
          {headerNavLinks
            .filter((link) => link.href !== "/")
            .map((link) => (
              <NavbarItem key={link.title}>
                <Link href={link.href} color="foreground">
                  {t(`${link.title}`)}
                </Link>
              </NavbarItem>
            ))}
        </NavbarContent>
        <NavbarContent justify="end" className="hidden items-center justify-center sm:flex">
          <li className="flex items-center justify-center">
            <LocaleSwitcher />
          </li>
          <li className="flex items-center justify-center">
            <UserAccountNavClient />
          </li>
          <Notification />
          <li className="flex items-center justify-center">
            <SearchButton />
          </li>
          <li className="flex items-center justify-center">
            <ThemeSwitch />
          </li>
        </NavbarContent>
        <NavbarContent justify="center" className="flex sm:hidden">
          <li className="flex items-center justify-center">
            <LocaleSwitcher />
          </li>
          <li className="flex items-center justify-center">
            <UserAccountNavClient />
          </li>
          <Notification />
          <li className="flex items-center justify-center">
            <SearchButton />
          </li>
          <li className="flex items-center justify-center">
            <ThemeSwitch />
          </li>
        </NavbarContent>
        <NavbarMenu>
          <NavbarMenuItem>
            <Link href={"/"} color="foreground" size="lg">
              {t("home")}
            </Link>
          </NavbarMenuItem>
          {headerNavLinks
            .filter((link) => link.href !== "/")
            .map((link) => (
              <NavbarMenuItem key={link.title}>
                <Link href={link.href} color="foreground" size="lg">
                  {t(`${link.title}`)}
                </Link>
              </NavbarMenuItem>
            ))}
          <Divider />
          {headerNavLinksDropDown.map((link) => (
            <NavbarMenuItem key={link.title}>
              <Link href={link.href} color="foreground" size="lg">
                {t(`${link.title}`)}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </SessionProvider>
  )
}
