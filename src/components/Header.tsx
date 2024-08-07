'use client'
import Logo from '@/data/logo.svg';
import Image from 'next/image';
import ThemeSwitch from './ThemeSwitch';
import SearchButton from './SearchButton';
import LocaleSwitcher from './LocaleSwitcher';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { LuChevronDown } from 'react-icons/lu';
import { headerNavLinks, headerNavLinksDropDown } from '@/data/headerNavLinks';
import {
  Navbar,
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
} from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import { UserAccountNavClient } from './auth/UserAccountNavClient';
import { Notification } from "@/components/Notification"
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('HeaderLinks');
  return (
    <SessionProvider>
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="navbar sticky top-0 xl:px-0 border-b !border-border"
      >
        {/* Mobile Menu Toogle */}
        <NavbarContent className="min-[690px]:hidden" justify="start">
          <NavbarMenuToggle aria-label={isMenuOpen ? t('menuClose') : t('menuOpen')} />
        </NavbarContent>
        {/* Logo + napis Omnimes */}
        <NavbarContent className="hidden gap-4 min-[690px]:flex" justify="start">
          <li className='flex basis-0 flex-row flex-grow flex-nowrap justify-start bg-transparent items-center no-underline text-medium whitespace-nowrap box-border'>
            <Image
                src={Logo.src}
                alt={'OmniMES logo'}
                width={44}
                height={36}
                className="mr-2"
                style={{ width: '44px', height: 'auto' }}
              />
              <Link href="/" className="font-bold text-inherit hidden min-[760px]:flex">
                OmniMES
              </Link>
          </li>
        </NavbarContent>
        {/* Linki w centrum navBar - w tym dropdown */}
        <NavbarContent justify="center" className="hidden gap-4 min-[690px]:flex">
            <Dropdown backdrop="blur">
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="box-border list-none whitespace-nowrap bg-transparent p-0 text-medium data-[hover=true]:bg-transparent data-[active=true]:font-semibold"
                    endContent={<LuChevronDown />}
                    aria-label={t('ariaTriger')}
                    aria-labelledby={t('ariaTriger')}
                    title={t('ariaTriger')}
                    role="button"
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
                <DropdownSection title={t("titleSectionDropDown2")}>
                  {headerNavLinksDropDown.slice(2,4).map((item) => {
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
                <DropdownSection title={t("titleSectionDropDown4")}>
                  {headerNavLinksDropDown.slice(4).map((item) => {
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
        {/* Widgety(język, wyszukiwarka i dark mode) na końcu */}
        <NavbarContent justify="end" className="hidden sm:flex items-center justify-center">
          <li className="flex items-center justify-center"><LocaleSwitcher /></li>
          <li className="flex items-center justify-center"><UserAccountNavClient /></li>
          <Notification />
          <li className="flex items-center justify-center"><SearchButton /></li>
          <li className="flex items-center justify-center"><ThemeSwitch /></li>
        </NavbarContent>
        <NavbarContent justify="center" className="flex sm:hidden">
          <li className="flex items-center justify-center"><LocaleSwitcher /></li>
          <li className="flex items-center justify-center"><UserAccountNavClient /></li>
          <Notification />
          <li className="flex items-center justify-center"><SearchButton /></li>
          <li className="flex items-center justify-center"><ThemeSwitch /></li>
        </NavbarContent>
        {/* Linki w mobile menu */}
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
    </SessionProvider>
  )
}