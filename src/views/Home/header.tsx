import React from 'react'
import classnames from 'classnames'
import System, { Pages } from '../../store/system'

const Welcome: React.FC = () => {
  const { currentPage, setCurrentPage } = System.useContainer()

  return (
    <header id="header" className={classnames({ exp: currentPage.headerExp })}>
      <div className="back"></div>
      <div className="logoborder"></div>
      <div className="logo">
        <div className="h2">Blockchain Institution</div>
        <div className="h1">
          SACTE
          <div className="shadow" onClick={() => setCurrentPage(Pages.welcome)}>
            SACTE
          </div>
        </div>
        <div className="exp">
          <button onClick={() => setCurrentPage(Pages.whoweare)}>
            Explore→
          </button>
        </div>
      </div>
      <ul className="menu">
        <li>
          <a
            className={classnames({
              active: currentPage.menuActive === 'whoweare',
            })}
            onClick={() => setCurrentPage(Pages.whoweare)}
          >
            Who We Are
          </a>
        </li>
        <li>
          <a
            className={classnames({
              active: currentPage.menuActive === 'whatwedo',
            })}
            onClick={() => setCurrentPage(Pages.whatwedo)}
          >
            What We Do
          </a>
        </li>
      </ul>
    </header>
  )
}

export default Welcome
