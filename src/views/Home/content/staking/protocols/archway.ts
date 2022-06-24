import Protocol, { ProtocolState } from './types'

const infoDescription = `Archway is a smart contract platform that rewards developers — ushering in next gen dapps.

From the outset, Archway is a blockchain that allows you to easily deploy smart contracts to Cosmos. The Archway smart contract platform is owned, operated, and governed by you—the developer community. As you build and launch impactful, highly used open-source dapps, you earn more.`

const guideDescription = ''

const ArchwayProtocol: Protocol = {
  key: 'archway',
  state: ProtocolState.testnet,
  info: {
    logo: 'https://assets.zjzsxhy.com/upload/1dd2122c-672a-4fef-8490-f9c86c90c750.svg',
    logoSmall:
      'https://assets.zjzsxhy.com/upload/0152fdce-91e9-483c-8f61-0f4582a2663f.svg',
    name: 'Archway',
    symbol: 'AXL',
    description: infoDescription,
    marketCap: '',
    price: '',
    rewards: '',
    slashing: '',
    inflation: '',
    unbonding: '',
    compounding: '',
    coingecko: '',
  },
  guide: {
    description: guideDescription,
    steps: [],
    validators: [],
  },
  faq: [],
  resources: [],
}

export default ArchwayProtocol
