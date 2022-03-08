import React from 'react'
import classnames from 'classnames'
import System from '../../store/system'

const Sidebar: React.FC = () => {
  const { currentPage } = System.useContainer()

  return (
    <nav id="sidebar" className={classnames({ exp: currentPage.headerExp })}>
      <div className="h1">{currentPage.num}</div>
      <div className="h2">{currentPage.name}</div>
    </nav>
  )
}

export default Sidebar
