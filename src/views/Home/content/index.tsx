import React from 'react'
import WhoweareContent from './whoweare'
import WhatwedoContent from './whatwedo'
// import StakingContent from './staking'
import ProtocolContent from './staking'
import ProtocolListContent from './staking/list'
import './style.scss'

const Content: React.FC = () => {
  return (
    <>
      <WhoweareContent />
      <WhatwedoContent />
      {/* <StakingContent /> */}
      <ProtocolContent />
      <ProtocolListContent />
    </>
  )
}

export default Content
