import Protocol, { ProtocolState } from './types'

const infoDescription = `Agoric is a smart contract platform designed to bring millions of developers to the DeFi frontier. By using JavaScript as its smart contract language, the Agoric developer experience will be familiar, secure, and composable.

The Agoric chain is built to be:

* A DeFi Powerhouse - Contract framework and integrated stablecoins built in enabling predictable costs and long-term smart contracts.
* Extensible - Chain governance and staking economics implemented as smart contracts enabling quick ideation and future improvements like staking derivatives.
* Interoperable - Dynamic IBC enables the Agoric chain to leverage assets, collateral, and services from other chains.`

const guideDescription = `Stake your BLD tokens in a few clicks by following these steps:

The easiest way to stake BLD is via [Keplr](https://wallet.keplr.app/#/dashboard).`

const AgoricProtocol: Protocol = {
  key: 'agoric',
  state: ProtocolState.mainnet,
  info: {
    logo: 'https://assets.zjzsxhy.com/upload/39c20438-1a0a-43aa-8ad4-0112c5a2b859.svg',
    logoSmall:
      'https://assets.zjzsxhy.com/upload/4b578697-9967-4786-bed7-f9c5545040e1.svg',
    name: 'Agoric',
    symbol: 'BLD',
    description: infoDescription,
    marketCap: '',
    price: '',
    rewards: '',
    slashing: '',
    inflation: '',
    unbonding: '',
    compounding: '',
    coingecko: 'https://www.coingecko.com/en/coins/agoric',
  },
  guide: {
    description: guideDescription,
    steps: [
      'Head to [https://wallet.keplr.app/#/agoric/stake](https://wallet.keplr.app/#/agoric/stake)',
      'Find Figment in the Agoric validator set and click the “manage” button.',
      'Click “delegate”.',
      'Enter the amount you want to delegate. Remember to keep some BLD available to pay for transaction fees.',
      'Click “delegate” and then click “approve” to approve the transaction.',
    ],
    validators: [],
  },
  faq: [
    {
      question: 'Where can I explore the network and create a Mina wallet?',
      answer: `Block explorer: [hubble.figment.io/mina/chains/mainnet](https://hubble.figment.io/mina/chains/mainnet)

Web Wallet: [clor.io](https://clor.io/)`,
    },
    {
      question: 'What is the name of the asset being staked?',
      answer:
        "Minas' native token, MINA, is used to stake and to participate in on-chain governance.",
    },
  ],
  resources: [
    {
      title: 'Agoric: First Look',
      introduction:
        'Agoric is an ease-of-use Layer 1 protocol that focuses on composability in a Javascript working environment.',
      link: 'https://www.figment.io/resources/agoric-first-look',
    },
    {
      title: 'Staking Hub: Agoric',
      introduction:
        'Agoric is a smart contract platform built to bring millions of developers to the DeFi frontier. We hosted an AMA with the team to learn more.',
      link: 'https://www.figment.io/resources/agoric-first-look',
    },
    {
      title: 'Agoric: Staking Guide',
      introduction:
        'Follow our guide for staking Agoric (BLD) tokens on the Keplr wallet. ',
      link: 'https://www.figment.io/resources/agoric-first-look',
    },
  ],
}

export default AgoricProtocol
