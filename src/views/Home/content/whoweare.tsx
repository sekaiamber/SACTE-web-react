import React from 'react'
import classnames from 'classnames'
import System from '../../../store/system'
import ContentChild from './base'

const T1 = 'To Become An'
const T2 = 'Unique And Irreplaceable Institution'
const T3 = 'Dedicated to the Emerging frontier of crypto'

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

export default WhoweareContent
