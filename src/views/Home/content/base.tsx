import React from 'react'
import classnames from 'classnames'
import RSC from 'react-scrollbars-custom'

interface ContentProps {
  show: boolean
}

const ContentChild: React.FC<ContentProps> = ({ show, children }) => {
  return (
    <div className={classnames('page-content', { show })}>
      <RSC
        noScrollX
        wrapperProps={{
          renderer: (props) => {
            const { elementRef, style, ...restProps } = props
            return (
              <span
                {...restProps}
                style={{ ...style, right: 0 }}
                ref={elementRef}
              />
            )
          },
        }}
        trackYProps={{
          renderer: (props) => {
            const { elementRef, style, ...restProps } = props
            return (
              <span
                {...restProps}
                style={{ ...style, width: 0 }}
                ref={elementRef}
              />
            )
          },
        }}
      >
        <div className="content-border">
          <div className="content-container">{children}</div>
        </div>
      </RSC>
    </div>
  )
}

export default ContentChild

interface CommonContentChildProps extends ContentProps {
  className?: string
}

export const CommonContentChild: React.FC<CommonContentChildProps> = ({
  show,
  children,
  className,
  ...rest
}) => {
  return (
    <ContentChild show={show} {...rest}>
      <div className={classnames(className, 'common-content', { show })}>
        <div className="content">{children}</div>
      </div>
    </ContentChild>
  )
}
