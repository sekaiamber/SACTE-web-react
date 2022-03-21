import React from 'react'
import { Link } from 'react-router-dom'
// import classNames from 'classnames'
import System from '../../../../store/system'
import { CommonContentChild } from '../base'
import Protocols from './protocols'
import Protocol, { ProtocolState } from './protocols/types'

const ProtocolItem: React.FC<{ data: Protocol }> = ({ data }) => {
  return (
    <div className="item">
      <div className="img">
        <img src={data.info.logoSmall} alt="" />
      </div>
      <div className="name">{data.info.name}</div>
      <div className="state">
        <span>{data.state}</span>
      </div>
      <div className="more">
        <Link to={`/protocol/${data.key}`}>
          <button>
            {data.state === ProtocolState.mainnet ? 'Stake Now' : 'Learn More'}
          </button>
        </Link>
      </div>
    </div>
  )
}

const ProtocolContent: React.FC = () => {
  const { currentPage } = System.useContainer()

  const show = currentPage.menuActive === 'protocols'

  const ProtocolsList = Object.values(Protocols)
  const MainnetProtocols = ProtocolsList.filter(
    (p) => p.state === ProtocolState.mainnet
  )
  const NotMainnetProtocols = ProtocolsList.filter(
    (p) => p.state !== ProtocolState.mainnet
  )

  return (
    <CommonContentChild className="protocols-content" show={show}>
      <div className="h1">Protocols</div>
      <div className="mainnet-list">
        {MainnetProtocols.map((p) => (
          <ProtocolItem data={p} key={p.key} />
        ))}
      </div>
      <div className="notmainnet-list">
        {NotMainnetProtocols.map((p) => (
          <ProtocolItem data={p} key={p.key} />
        ))}
      </div>
    </CommonContentChild>
  )
}

export default ProtocolContent
