type WebLink = string
type ImageSrc = WebLink
type Markdown = string
type Article = Markdown
type Address = string

export enum ProtocolState {
  mainnet = 'MainNet',
  testnet = 'Public TestNet',
  launching = 'Launching',
}

export interface ProtocolTokenInfo {
  logo: ImageSrc
  logoSmall: ImageSrc
  name: string
  symbol: string
  description: Article
  marketCap: string
  price: string
  rewards: string
  slashing: string
  inflation: string
  unbonding: string
  compounding: string
  coingecko: WebLink
}

export interface ProtocolGuide {
  description: Article
  steps: Article[]
  validators: Address[]
}

export interface ProtocolFAQ {
  question: string
  answer: Article
}

export interface ProtocolResource {
  title: string
  link: WebLink
  introduction: Article
}

export default interface Protocol {
  key: string
  state: ProtocolState
  info: ProtocolTokenInfo
  guide: ProtocolGuide
  faq: ProtocolFAQ[]
  resources: ProtocolResource[]
}
