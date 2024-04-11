import { useTranslations } from 'next-intl'
import { Link, Button } from '@nextui-org/react'
import Image from 'next/image'

// export const Hannover = () => {
//   const t = useTranslations('Widget')

//   return (
//     <section classNameName="mb-24 border">
//       <div classNameName="container mx-auto flex flex-col items-center px-4 py-12 text-center">
//         <h2 classNameName="mx-auto max-w-2xl text-2xl font-semibold tracking-tight text-gray-800 dark:text-white xl:text-3xl">
//             <div dangerouslySetInnerHTML={{ __html: t.raw('content') }} />
//         </h2>

//         <p classNameName="mb-10 mt-6 text-lg leading-8 text-gray-500 dark:text-gray-400">
//           {t('titleHanover')}
//         </p>

//         <div classNameName="mt-3 inline-flex w-auto">
//           <Button
//             as={Link}
//             href="https://www.multiprojekt.pl/multiprojekt-wystawca-na-targach-w-hanowerze/"
//             showAnchorIcon
//             classNameName="bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] text-white shadow-lg"
//           >
//             {t('textButtonSection')}
//           </Button>
//         </div>
//       </div>
//     </section>
//   )
// }

// export const Hannover = () => {
//   const t = useTranslations('Widget')

//   return (
//     <div classNameName="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 bg-white/5 rounded-md shadow-lg mb-24">
//       <div classNameName="flex flex-col lg:flex-row">
//         <div classNameName="mb-6 lg:mb-0 lg:w-1/2 lg:pr-5">
//           <h2 classNameName="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl sm:leading-none">
//             The quick, brown fox
//             <br classNameName="hidden md:block" />
//             jumps over{' '}
//             <span classNameName="inline-block text-deep-purple-accent-400">
//               a lazy dog
//             </span>
//           </h2>
//            <Button
//             as={Link}
//             href="https://www.multiprojekt.pl/multiprojekt-wystawca-na-targach-w-hanowerze/"
//             showAnchorIcon
//             classNameName="bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] text-white shadow-lg"
//           >
//             {t('textButtonSection')}
//           </Button>
//         </div>
//         <div classNameName="lg:w-1/2">
//           <p classNameName="text-base text-gray-700">
//             Sed ut perspiciatis unde omnis iste natus error sit voluptatem
//             accusantium doloremque rem aperiam, eaque ipsa quae. Sed ut
//             perspiciatis unde omnis iste. Sed ut perspiciatis unde omnis iste
//             natus error sit voluptatem accusantium doloremque rem aperiam, eaque
//             ipsa quae.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

export const Hannover = () => {
  const t = useTranslations('Widget')
  return (
    <div className="h-screen">
      <section>
        <div className="relative">
          <div
            className="absolute inset-0 top-12 m-auto h-[13rem] max-w-xs blur-[160px]"
            style={{
              background:
                'linear-gradient(180deg, #7C3AED 0%, rgba(152, 103, 240, 0.984375) 0.01%, rgba(237, 78, 80, 0.2) 100%)',
            }}
          ></div>
          <div className="relative">
            <div className="custom-screen relative py-28">
              <div className="opacity-1 relative z-10 delay-150 duration-1000">
                <div className="mx-auto max-w-4xl text-center">
                  <h2 className="text-3xl font-bold text-black dark:text-gray-50 sm:text-4xl">
                    <div dangerouslySetInnerHTML={{ __html: t.raw('content') }} />
                  </h2>
                  <p className="mb-10 mt-6 text-lg leading-8 text-gray-800 dark:text-gray-400">
                    {t('titleHannover')}
                  </p>
                  <p className="text-lg leading-8 text-gray-800 dark:text-gray-400">{t('seeyou')}</p>
                </div>
                <div className="text-md mt-6 flex justify-center font-medium">
                  <Button
                    as={Link}
                    href="https://www.multiprojekt.pl/multiprojekt-wystawca-na-targach-w-hanowerze/"
                    showAnchorIcon
                    className="bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] text-white shadow-lg"
                  >
                    {t('textButtonSection')}
                  </Button>
                </div>
              </div>
              <Image
                src="/images/bg.webp"
                width="2880"
                height="1358"
                decoding="async"
                data-nimg="1"
                className="pointer-events-none absolute inset-0 m-auto h-full w-full object-cover"
                loading="lazy"
                style={{ color: 'transparent' }}
                alt={''}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
