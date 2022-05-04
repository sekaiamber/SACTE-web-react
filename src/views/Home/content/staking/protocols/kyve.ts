import Protocol, { ProtocolState } from './types'

const infoDescription =
  'KYVE is an initiative to store any data stream, with built-in validation. By leveraging the Arweave blockchain, we can permanently and immutably store this data.'

const guideDescription = ''

const KyveProtocol: Protocol = {
  key: 'kyve',
  state: ProtocolState.testnet,
  info: {
    logo: 'https://assets.zjzsxhy.com/upload/c637677d-22e4-4e13-9e6b-cd76043280db.svg',
    logoSmall:
      'https://assets.zjzsxhy.com/upload/c637677d-22e4-4e13-9e6b-cd76043280db.svg',
    name: 'KYVE',
    symbol: 'KYVE',
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

export default KyveProtocol
