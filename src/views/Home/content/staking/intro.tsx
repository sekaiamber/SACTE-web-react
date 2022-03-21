import React from 'react'
import System from '../../../../store/system'
import { CommonContentChild } from '../base'
import infrastructureImg from '../../../assets/img/infrastructure-diagram.svg'

const T1 = "The World's Most Secure Blockchain Infrastructure"
const T2 =
  'We have built the most advanced blockchain infrastructure by applying 30+ years of real world experience operating critical internet infrastructure.'
const T3 = 'Reliable and secure private nodes for enterprise clients'

const T4 = [
  'Our physical infrastructure is combined with a network of public and private sentry nodes on Amazon Web Services, Google Cloud, OVHcloud, Digital Ocean, and other public cloud platforms.',
  'We limit public internet connectivity to our physical validator nodes.',
  'Our facilities are connected to AWS GCP using direct connections with VPN backup and to other cloud platforms using VPNs.',
]

const T5 =
  'The most secure and reliable Web 3 infrastructure built from the ground up to maximize security and minimize risk:'

const T6 = [
  'Validator nodes hosted in a Tier 3 IDC with 2N power and cooling, advanced climate control, redundant fibre, A+B power/network paths and biometric access control.',
  'Sentry nodes hosted in North America, Europe and Asia across 5 public cloud providers, connected to IDC via redundant direct connections and VPN links.',
  'Private peering interconnection with other trusted validators.',
  'Hardware Security Modules (HSM) to secure private keys and prevent double sign faults.',
  'Multi on-premise and off-premise secure server backup and redundancy',
  '24/7 on call dev-ops team with internal and external monitoring & alerting.',
]

const StakingContent: React.FC = () => {
  const { currentPage } = System.useContainer()

  const show = currentPage.menuActive === 'staking'

  return (
    <CommonContentChild className="staking-content" show={show}>
      <div className="h1">{T1}</div>
      <div className="h2">{T2}</div>
      <div className="common-div"></div>
      <div className="h3">{T3}</div>
      <div className="t4">
        <p>{T4[0]}</p>
        <p>{T4[1]}</p>
        <p>{T4[2]}</p>
      </div>
      <div className="i5">
        <img src={infrastructureImg} alt="" />
      </div>
      <div className="g1">
        <div className="h5">{T5}</div>
        <div className="t6">
          <ul>
            <li>
              <i className="iconfont icon-checked"></i>
              <span>{T6[0]}</span>
            </li>
            <li>
              <i className="iconfont icon-checked"></i>
              <span>{T6[1]}</span>
            </li>
            <li>
              <i className="iconfont icon-checked"></i>
              <span>{T6[2]}</span>
            </li>
            <li>
              <i className="iconfont icon-checked"></i>
              <span>{T6[3]}</span>
            </li>
            <li>
              <i className="iconfont icon-checked"></i>
              <span>{T6[4]}</span>
            </li>
            <li>
              <i className="iconfont icon-checked"></i>
              <span>{T6[5]}</span>
            </li>
          </ul>
        </div>
      </div>
    </CommonContentChild>
  )
}

export default StakingContent
