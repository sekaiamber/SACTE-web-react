import React from 'react'
import classnames from 'classnames'
import System from '../../../store/system'
import ContentChild from './base'

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

export default WhatwedoContent
