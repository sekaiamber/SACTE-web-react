import Protocol from './types'
import AgoricProtocol from './agoric'
import AxelarProtocol from './axelar'
import NymProtocol from './nym'

const ProtocolMap: { [key: string]: Protocol } = {
  [AgoricProtocol.info.name]: AgoricProtocol,
  [NymProtocol.info.name]: NymProtocol,
  [AxelarProtocol.info.name]: AxelarProtocol,
}

export { AgoricProtocol, NymProtocol }

export default ProtocolMap
