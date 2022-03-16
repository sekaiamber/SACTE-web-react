import React from 'react'
import classnames from 'classnames'
import System from '../../../store/system'
import ContentChild from './base'

const StakingContent: React.FC = () => {
  const { currentPage } = System.useContainer()

  console.log(currentPage)
  const show = currentPage.menuActive === 'staking'

  return (
    <ContentChild show={show}>
      <div className={classnames('staking-content', { show })}>
        <div className="content">222</div>
      </div>
    </ContentChild>
  )
}

export default StakingContent
