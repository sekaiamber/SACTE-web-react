import Protocol, { ProtocolState } from './types'

const infoDescription =
  'Nym aims to be a full-stack privacy protocol allowing any application, service or blockchain to defend its network traffic against sophisticated surveillance systems. As a decentralized, open source, permissionless and incentivized system, Nym allows developers building applications of all types, including communication and payment applications, to offer users strong protection against metadata surveillance.'

const guideDescription = ''

const NymProtocol: Protocol = {
  key: 'nym',
  state: ProtocolState.launching,
  info: {
    logo: 'https://assets.zjzsxhy.com/upload/c7c8eec9-2484-4bf0-94b8-93ef4c249207.svg',
    logoSmall:
      'https://assets.zjzsxhy.com/upload/c7c8eec9-2484-4bf0-94b8-93ef4c249207.svg',
    name: 'Nym',
    symbol: 'NYM',
    description: infoDescription,
    marketCap: '',
    price: '',
    rewards: '',
    slashing: '',
    inflation: '',
    unbonding: '',
    compounding: '',
    coingecko: 'https://www.coingecko.com/en/coins/nym',
  },
  guide: {
    description: guideDescription,
    steps: [],
    validators: [],
  },
  faq: [],
  resources: [],
}

export default NymProtocol
