import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import * as React from 'react'
import { WagmiConfig } from 'wagmi'
import './App.css'
import { client } from '../wagmi'
import { useIsMounted }  from '../Hooks/useIsMounted'

function App({ Component, pageProps }: AppProps) {
 const mounted = useIsMounted();
 
  return (
    <WagmiConfig client={client}>
      <NextHead>
        <title>PetAdoption</title>
        <link rel="icon" href="https://s3.amazonaws.com/imagesroot.rescuegroups.org/webpages/s9595nokg5eklqut.png"/>
      </NextHead>

      {mounted && <Component {...pageProps} />}
    </WagmiConfig>
  )
}

export default App
