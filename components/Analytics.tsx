'use client'

import Script from 'next/script'

export default function Analytics() {
  return (
    <>
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID`} />
      <Script strategy="lazyOnload" id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);} 
          gtag('js', new Date());
          gtag('config', 'YOUR_GA_ID');
        `}
      </Script>
    </>
  )
}


