import Protocol, { ProtocolState } from './types'

const infoDescription = `Axelar empowers dApp builders and blockchain ecosystems to unlock cross-chain communication.

The Axelar protocol provides a uniform solution to cross-chain communication that's designed to be interoperable with any chain. Axelar is decentralized by design, and satisfies plug-and-play connectivity with almost no work to integrate a new chain.

The Axelar stack includes both cross-chain routing and application-level transfer protocols.`

const guideDescription = ''

const AxelarProtocol: Protocol = {
  key: 'axelar',
  state: ProtocolState.testnet,
  info: {
    logo: 'https://assets.zjzsxhy.com/upload/451ffcf1-c866-407c-afa4-ba2452266824.svg',
    logoSmall:
      'https://assets.zjzsxhy.com/upload/ad45761e-9253-4555-bd34-b83c66df7287.svg',
    name: 'Axelar',
    symbol: 'AXL',
    description: infoDescription,
    marketCap: '',
    price: '',
    rewards: '',
    slashing: '',
    inflation: '',
    unbonding: '',
    compounding: '',
    coingecko: 'https://www.coingecko.com/en/coins/axelar-network',
  },
  guide: {
    description: guideDescription,
    steps: [],
    validators: [],
  },
  faq: [],
  resources: [],
}

export default AxelarProtocol
