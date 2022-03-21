import React, { useEffect, useState } from 'react'
import { matchPath, useLocation } from 'react-router-dom'
import System from '../../../../store/system'
import { CommonContentChild } from '../base'
import Protocols from './protocols'
import Protocol, { ProtocolState } from './protocols/types'
import ReactMarkdown from 'react-markdown'
// import Protocol, { ProtocolState } from './protocols/types'
import './style.scss'

const ProtocolDataContent: React.FC<{ data: Protocol }> = ({ data }) => {
  let content = <></>

  if (data.state === ProtocolState.launching) {
    content = (
      <div className="coming">Protocol is launching, will be active soon.</div>
    )
  } else if (data.state === ProtocolState.testnet) {
    content = (
      <div className="coming">Protocol is on testnet, will be launch soon.</div>
    )
  } else if (data.state === ProtocolState.mainnet) {
    content = (
      <>
        <div className="h1">{'Staking Guide & Instructions'}</div>
        <div className="guide">
          <ReactMarkdown className="markdown-content">
            {data.guide.description}
          </ReactMarkdown>
        </div>
        {data.guide.steps.length > 0 && (
          <ol className="guide-steps">
            {data.guide.steps.map((step) => (
              <li className="step">
                <ReactMarkdown className="markdown-content">
                  {step}
                </ReactMarkdown>
              </li>
            ))}
          </ol>
        )}
        {data.faq.length > 0 && (
          <>
            <div className="common-div"></div>
            <div className="h1">{data.info.name} FAQ</div>
            <div className="faqs">
              {data.faq.map((aq) => (
                <div className="faq">
                  <div className="q">{aq.question}</div>
                  <div className="a">
                    <ReactMarkdown className="markdown-content">
                      {aq.answer}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {data.resources.length > 0 && (
          <>
            <div className="common-div"></div>
            <div className="h1">Additional Resources</div>
            <div className="resources">
              {data.resources.map((res) => (
                <div className="resource">
                  <div className="title">
                    <a href={res.link} target="_blank">
                      {res.title}
                    </a>
                  </div>
                  <div className="introduction">
                    <ReactMarkdown className="markdown-content">
                      {res.introduction}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </>
    )
  }

  return (
    <div className="protocol">
      <div className="info">
        <div className="logo">
          <img src={data.info.logo} alt="" />
        </div>
        <div className="description">
          <ReactMarkdown className="markdown-content">
            {data.info.description}
          </ReactMarkdown>
        </div>
      </div>
      <div className="common-div"></div>
      {content}
    </div>
  )
}

const ProtocolContent: React.FC = () => {
  const [data, setData] = useState<Protocol | null>(null)
  const { currentPage } = System.useContainer()
  const location = useLocation()

  const show = currentPage.menuActive === 'protocol'

  useEffect(() => {
    const { pathname } = location
    const match = matchPath<{ name: string }>(pathname, {
      path: '/protocol/:name',
      exact: true,
      strict: true,
    })
    if (match) {
      const name = match.params.name
      const protocol = Object.values(Protocols).find((p) => p.key === name)
      if (protocol) {
        setData(protocol)
      } else {
        setData(null)
      }
    }
  }, [show])

  return (
    <CommonContentChild className="protocol-content" show={show}>
      {data && <ProtocolDataContent data={data} />}
    </CommonContentChild>
  )
}

export default ProtocolContent
