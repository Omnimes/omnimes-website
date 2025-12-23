// // app/layout.tsx
// import { ReactNode } from "react"
// import Script from "next/script"

// import "@/css/tailwind.css"
// import "pliny/search/algolia.css"

// const GTM_ID = "GTM-W8PM5ZPM"

// type Props = { children: ReactNode }

// export default function RootLayout({ children }: Props) {
//   return (
//     <html lang="pl" suppressHydrationWarning>
//       <head>
//         {/* Google Tag Manager - MUSI BYĆ PIERWSZY! */}
//         <Script id="gtm" strategy="beforeInteractive">
//           {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
//             new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
//             j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
//             'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
//           })(window,document,'script','dataLayer','${GTM_ID}');`}
//         </Script>

//         {/* Consent Mode v2 – DOPIERO PO GTM */}
//         <Script id="consent-default" strategy="beforeInteractive">
//           {`
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('consent', 'default', {
//               ad_storage: 'denied',
//               analytics_storage: 'denied',
//               personalization_storage: 'denied',
//               functionality_storage: 'denied',
//               security_storage: 'granted'
//             });

//             // Jeśli użytkownik wcześniej wyraził zgodę – odtwórz ją natychmiast
//             (function() {
//               try {
//                 var s = localStorage.getItem('cookie-consent');
//                 if (!s) return;
//                 var c = JSON.parse(s);
//                 gtag('consent', 'update', {
//                   ad_storage: c.ad ? 'granted' : 'denied',
//                   analytics_storage: c.analytics ? 'granted' : 'denied',
//                   personalization_storage: c.personalization ? 'granted' : 'denied',
//                   functionality_storage: c.functional ? 'granted' : 'denied'
//                 });
//               } catch (e) {}
//             })();
//           `}
//         </Script>
//       </head>
//       <body className="relative h-full min-h-screen overflow-x-hidden" suppressHydrationWarning>
//         {/* GTM noscript - ZARAZ PO OTWARCIU BODY */}
//         <noscript>
//           <iframe
//             src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
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

const GTM_ID = "GTM-W8PM5ZPM"

type Props = { children: ReactNode }

export default function RootLayout({ children }: Props) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager - MUSI BYĆ PIERWSZY */}
        <Script id="gtm" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>

        {/* Consent Mode v2 – PO GTM */}
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

        {/* Schema.org – Organization (GLOBAL) */}
        <Script id="schema-org-omnimes" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "OmniMES",
            url: "https://omnimes.com",
            logo: "https://omnimes.com/images/logo.png",
            sameAs: [
              "https://x.com/OmnimesOfficial",
              "https://www.linkedin.com/showcase/omnimes-smart-mes-system",
            ],
          })}
        </Script>
      </head>

      <body className="relative h-full min-h-screen overflow-x-hidden" suppressHydrationWarning>
        {/* GTM noscript – ZARAZ PO BODY */}
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
