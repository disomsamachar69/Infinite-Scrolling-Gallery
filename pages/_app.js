import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Default title and meta tags */}
        <title>Infinite Scrolling Gallery</title>
        <meta name="description" content="This is an awesome website built with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Add any other global meta tags or links here */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}
