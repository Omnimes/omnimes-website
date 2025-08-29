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
// app/layout.tsx
import Script from "next/script";
import { ReactNode } from "react";

import "@/css/tailwind.css";
import "pliny/search/algolia.css";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="pl">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-W8PM5ZPM');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W8PM5ZPM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager */}
        {children}
      </body>
    </html>
  );
}
