// import { ReactNode } from "react"

// import "@/css/tailwind.css"
// import "pliny/search/algolia.css"

// type Props = {
//   children: ReactNode
// }

// // Since we have a `not-found.tsx` page on the root, a layout file
// // is required, even if it's just passing children through.
// export default function RootLayout({ children }: Props) {
//   return children
// }

// app/layout.tsx
// import { ReactNode } from "react"
// import Script from "next/script"

// import "@/css/tailwind.css"
// import "pliny/search/algolia.css"

// type Props = { children: ReactNode }

// export default function RootLayout({ children }: Props) {
//   return (
//     <html lang="pl" suppressHydrationWarning>
//       <head>
//         <Script id="gtm" strategy="afterInteractive">
//           {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
//           new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
//           j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
//           'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
//           })(window,document,'script','dataLayer','GTM-W8PM5ZPM');`}
//         </Script>
//       </head>
//       <body className="relative h-full min-h-screen overflow-x-hidden" suppressHydrationWarning>
//         <noscript>
//           <iframe
//             src="https://www.googletagmanager.com/ns.html?id=GTM-W8PM5ZPM"
//             height="0"
//             width="0"
//             style={{ display: "none", visibility: "hidden" }}
//             title="Google Tag Manager"
//           />
//         </noscript>
//         {children}
//       </body>
//     </html>
//   )
// }

// app/layout.tsx
import { ReactNode } from "react"
import Script from "next/script"

import "@/css/tailwind.css"
import "pliny/search/algolia.css"

const GTM_ID = "GTM-W8PM5ZPM" // lub process.env.NEXT_PUBLIC_GTM_ID

type Props = { children: ReactNode }

export default function RootLayout({ children }: Props) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        {/* Consent Mode v2 – DEFAULT (deny) – musi być PRZED GTM */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied',
              personalization_storage: 'denied',
              functionality_storage: 'denied',
              security_storage: 'granted'
            });

            // Jeśli użytkownik wcześniej wyraził zgodę – odtwórz ją natychmiast
            (function() {
              try {
                var s = localStorage.getItem('cookie-consent');
                if (!s) return;
                var c = JSON.parse(s);
                gtag('consent', 'update', {
                  ad_storage: c.ad ? 'granted' : 'denied',
                  analytics_storage: c.analytics ? 'granted' : 'denied',
                  personalization_storage: c.personalization ? 'granted' : 'denied',
                  functionality_storage: c.functional ? 'granted' : 'denied'
                });
              } catch (e) {}
            })();
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body className="relative h-full min-h-screen overflow-x-hidden" suppressHydrationWarning>
        {/* GTM noscript */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        {children}
      </body>
    </html>
  )
}
