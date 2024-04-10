'use client'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import Image from 'next/image'
import Logo from '@/data/logo.svg'
import LocaleSwitcher from './LocaleSwitcher'
import { useTranslations } from 'next-intl'
import { headerNavLinks, headerNavLinksDropDown } from '@/data/headerNavLinks'
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
  Button,
  DropdownSection,
  Divider
} from '@nextui-org/react'
import { LuChevronDown } from 'react-icons/lu'
import { useState } from 'react'

// import { User } from "next-auth"
// import { UserAccountNav } from './user-account-nav'
// import { getCurrentUser } from "@/utils/session";

// interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
//   user: Pick<User, "name" | "image" | "email"> | undefined
// }{ user }: UserAccountNavProps
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('HeaderLinks');
  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="navbar sticky top-0 xl:px-0"
    >
      <NavbarContent className="min-[690px]:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? t('menuClose') : t('menuOpen')} />
      </NavbarContent>
      <NavbarContent className="hidden gap-4 min-[690px]:flex" justify="start">
        <NavbarBrand>
          <Image
            src={Logo.src}
            alt={'OmniMES logo'}
            width={44}
            height={36}
            priority
            className="mr-2"
            style={{ width: '44px', height: 'auto' }}
          />
          <Link href="/" className="font-bold text-inherit hidden min-[760px]:flex">
            OmniMES
          </Link>
        </NavbarBrand>
      </NavbarContent>

     <NavbarContent justify="center" className="hidden gap-4 min-[690px]:flex">
        <Dropdown backdrop="blur">
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="box-border list-none whitespace-nowrap bg-transparent p-0 text-medium data-[hover=true]:bg-transparent data-[active=true]:font-semibold"
                endContent={<LuChevronDown />}
              >
                OmniMES
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            key={'omniMESDropDown'}
            aria-label={t('omniMESDropDown')}
            className="w-[500px]"
            itemClasses={{
              base: 'gap-4',
            }}
          >
            <DropdownSection title={t("titleSectionDropDown")} showDivider>
              {headerNavLinksDropDown.slice(0,2).map((item) => {
                return (
                  <DropdownItem
                    key={item.href}
                    href={item.href}
                    description={t(item.desc)}
                    startContent={<item.icon size={25} color={item.color} />}
                  >
                    {t(item.title)}
                  </DropdownItem>
                )
              })}
            </DropdownSection>
            {/* <DropdownSection title={t("titleSectionDropDown3")} showDivider>
              {headerNavLinksDropDown.slice(2,3).map((item) => {
                return (
                  <DropdownItem
                    key={item.href}
                    href={item.href}
                    description={t(item.desc)}
                    startContent={<item.icon size={25} color={item.color} />}
                  >
                    {t(item.title)}
                  </DropdownItem>
                )
              })}
            </DropdownSection> */}
            <DropdownSection title={t("titleSectionDropDown2")}>
              {headerNavLinksDropDown.slice(2).map((item) => {
                return (
                  <DropdownItem
                    key={item.href}
                    href={item.href}
                    description={t(item.desc)}
                    startContent={<item.icon size={25} color={item.color} />}
                  >
                    {t(item.title)}
                  </DropdownItem>
                )
              })}
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <NavbarItem key={link.title}>
              <Link href={link.href} color="foreground">
                {t(`${link.title}`)}
              </Link>
            </NavbarItem>
          ))}
      </NavbarContent>

      <NavbarContent justify="end" className="hidden sm:flex">
        <LocaleSwitcher />
        <SearchButton />
        <ThemeSwitch />
        {/* <UserAccountNav user={user} /> */}
      </NavbarContent>

      <NavbarContent justify="center" className="flex sm:hidden">
        <LocaleSwitcher />
        <SearchButton />
        <ThemeSwitch />
        {/* <UserAccountNav user={user} /> */}
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link href={'/'} color="foreground" size="lg">
            {t('home')}
          </Link>
        </NavbarMenuItem>
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <NavbarMenuItem key={link.title}>
              <Link href={link.href} color="foreground" size="lg">
                {t(`${link.title}`)}
              </Link>
            </NavbarMenuItem>
          ))}
        <Divider />
        {headerNavLinksDropDown
          .map((link) => (
            <NavbarMenuItem key={link.title}>
              <Link href={link.href} color="foreground" size="lg">
                {t(`${link.title}`)}
              </Link>
            </NavbarMenuItem>
          ))}
      </NavbarMenu>
    </Navbar>
  )
}