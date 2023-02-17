import { createClient, configureChains } from "wagmi";
import { polygonMumbai, goerli } from "wagmi/chains";

import { alchemyProvider } from "wagmi/providers/alchemy";

import { MetaMaskConnector } from "wagmi/connectors/metaMask";


const { chains, provider, webSocketProvider } = configureChains(
  [  polygonMumbai, goerli ],
  [alchemyProvider({ apiKey: "fAcdEZ9BqpSGZv0ZpoNT6Q5L7xs4RAs5" })]
);

export const client = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider,
  webSocketProvider,
});
