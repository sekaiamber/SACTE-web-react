import React from 'react'
import classnames from 'classnames'
import System, { PageNum, PageName } from '../../store/system'

const Sidebar: React.FC = () => {
  const { currentPage } = System.useContainer()

  return (
    <nav id="sidebar" className={classnames({ exp: currentPage.headerExp })}>
      {currentPage.menuActive && (
        <>
          <div className="h1">{PageNum[currentPage.menuActive]}</div>
          <div className="h2">{PageName[currentPage.menuActive]}</div>
        </>
      )}
    </nav>
  )
}

export default Sidebar
