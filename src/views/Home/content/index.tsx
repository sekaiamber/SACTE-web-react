import React from 'react'
import WhoweareContent from './whoweare'
import WhatwedoContent from './whatwedo'
import StakingContent from './staking'
import './style.scss'

const Content: React.FC = () => {
  return (
    <>
      <WhoweareContent />
      <WhatwedoContent />
      <StakingContent />
    </>
  )
}

export default Content
