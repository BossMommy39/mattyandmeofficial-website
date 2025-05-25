import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#826753" />
        <meta name="description" content="Field-tested AI frameworks. Zero engagement loops. If it breaks, we show you." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
