// import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';
// import {locales, pathnames, localePrefix} from './config';

// export const {Link, redirect, usePathname, useRouter} =
//   createLocalizedPathnamesNavigation({
//     locales,
//     pathnames,
//     localePrefix
//   });

import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

import { localePrefix, locales, pathnames } from "./config"
import { defaultLocale } from "./middleware"

export const routing = defineRouting({
  locales,
  pathnames,
  localePrefix,
  defaultLocale,
})

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
