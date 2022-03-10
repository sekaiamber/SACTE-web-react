import React from 'react'
import classnames from 'classnames'
import System from '../../store/system'

const Footer: React.FC = () => {
  const { currentPage } = System.useContainer()

  return (
    <footer className={classnames({ show: currentPage.footerShow })}>
      from 2022 | © SAC Tech.
    </footer>
  )
}

export default Footer
