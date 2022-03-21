import Protocol from './types'
import AgoricProtocol from './agoric'
import NymProtocol from './nym'

const ProtocolMap: { [key: string]: Protocol } = {
  [AgoricProtocol.info.name]: AgoricProtocol,
  [NymProtocol.info.name]: NymProtocol,
}

export { AgoricProtocol, NymProtocol }

export default ProtocolMap
