import React from 'react'
import classnames from 'classnames'
import RSC from 'react-scrollbars-custom'

interface ContentProps {
  show: boolean
}

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

export default ContentChild
