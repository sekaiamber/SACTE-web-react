import React from 'react'
import classnames from 'classnames'
import RSC from 'react-scrollbars-custom'
import System from '../../store/system'

interface ContentProps {
  show: boolean
}

const T1 = 'To Become An'
const T2 = 'Unique And Irreplaceable Institution'
const T3 = 'Dedicated to the Emerging frontier of crypto'

const ContentChild: React.FC<ContentProps> = ({ show, children }) => {
  return (
    <div className={classnames('page-content', { show })}>
      <RSC noScrollX>
        <div className="content-border">
          <div className="content-container">{children}</div>
        </div>
      </RSC>
    </div>
  )
}

const WhoweareContent: React.FC = () => {
  const { currentPage } = System.useContainer()

  const show = currentPage.menuActive === 'whoweare'

  return (
    <ContentChild show={show}>
      <div className={classnames('whoweare-content', { show })}>
        <div className="text">
          <div className="h1">{T1}</div>
          <div className="h2">{T2}</div>
          <div className="h1">{T3}</div>
        </div>
      </div>
    </ContentChild>
  )
}

const WhatwedoContent: React.FC = () => {
  const { currentPage } = System.useContainer()

  const show = currentPage.menuActive === 'whatwedo'

  return (
    <ContentChild show={show}>
      <div className={classnames('whatwedo-content', { show })}>
        <div className="dos">
          <div className="do">
            <div className="icon">
              <i className="iconfont icon-asset"></i>
            </div>
            <div className="text">Asset Management</div>
          </div>
          <div className="do">
            <div className="icon">
              <i className="iconfont icon-investment"></i>
            </div>
            <div className="text">{'Investment & Incubator'}</div>
          </div>
          <div className="do">
            <div className="icon">
              <i className="iconfont icon-advisory"></i>
            </div>
            <div className="text">Advisory</div>
          </div>
          <div className="do">
            <div className="icon">
              <i className="iconfont icon-software"></i>
            </div>
            <div className="text">{'Software Solution & Utility Platform'}</div>
          </div>
          <div className="do">
            <div className="icon">
              <i className="iconfont icon-research"></i>
            </div>
            <div className="text">Research</div>
          </div>
        </div>
      </div>
    </ContentChild>
  )
}

const Content: React.FC = () => {
  return (
    <>
      <WhoweareContent />
      <WhatwedoContent />
    </>
  )
}

export default Content
