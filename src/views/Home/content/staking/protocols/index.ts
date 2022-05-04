import Protocol from './types'
import AgoricProtocol from './agoric'
import AxelarProtocol from './axelar'
import NymProtocol from './nym'
import KyveProtocol from './kyve'

const ProtocolMap: { [key: string]: Protocol } = {
  [AgoricProtocol.info.name]: AgoricProtocol,
  [NymProtocol.info.name]: NymProtocol,
  [AxelarProtocol.info.name]: AxelarProtocol,
  [KyveProtocol.info.name]: KyveProtocol,
}

export { AgoricProtocol, NymProtocol, AxelarProtocol, KyveProtocol }

export default ProtocolMap
