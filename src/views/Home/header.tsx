import React, { useCallback, useState } from 'react'
import classnames from 'classnames'
import System, { PageInfo, Pages } from '../../store/system'

interface MenuButtomProps {
  opened: boolean
  onClick: () => void
}

const menuL1Map = {
  about: ['whoweare', 'whatwedo'],
  stake: ['staking'],
}

const MenuButton: React.FC<MenuButtomProps> = ({ opened, onClick }) => {
  return (
    <button className={classnames('m-menu', { opened })} onClick={onClick}>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <path
          className="line line1"
          d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
        />
        <path className="line line2" d="M 20,50 H 80" />
        <path
          className="line line3"
          d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
        />
      </svg>
    </button>
  )
}

const Logo: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <svg
      className="logo-img"
      x="0px"
      y="0px"
      viewBox="0 0 512 124"
      onClick={onClick}
    >
      <path d="M3.1,101.8l14.6-17.5C27.8,92.7,38.4,98,51.3,98c10.1,0,16.2-4,16.2-10.6v-0.3c0-6.3-3.9-9.5-22.6-14.3 C22.2,67,7.6,60.8,7.6,38.4v-0.3C7.6,17.7,24,4.2,46.9,4.2c16.4,0,30.3,5.1,41.7,14.3L75.8,37.1c-10-6.9-19.8-11.1-29.2-11.1 s-14.4,4.3-14.4,9.8v0.3c0,7.4,4.8,9.8,24.2,14.8c22.8,5.9,35.6,14.1,35.6,33.7V85c0,22.3-17,34.8-41.3,34.8 C33.2,119.9,16.3,113.5,3.1,101.8z" />
      <path d="M141.4,5h22.8l48.2,113.2h-25.8L176.3,93h-47.5l-10.3,25.2H93.2L141.4,5z M167.4,71.2l-14.9-36.4l-14.9,36.4 H167.4z" />
      <path d="M206.1,62.3V62c0-31.9,24.1-58.1,58.6-58.1c21.2,0,33.9,7.1,44.3,17.3l-15.7,18.1c-8.7-7.9-17.5-12.7-28.7-12.7 c-18.9,0-32.6,15.7-32.6,35V62c0,19.3,13.3,35.3,32.6,35.3c12.9,0,20.7-5.1,29.5-13.2l15.7,15.9c-11.6,12.4-24.4,20.1-46.1,20.1 C230.7,120.1,206.1,94.6,206.1,62.3z" />
      <path d="M350.6,28.6h-34.2V5.8h93.1v22.8h-34.2v89.6h-24.7V28.6z" />
      <polygon points="447.9,27.8 447.9,27.8 508.1,27.8 508.1,5.8 423.3,5.8 423.3,27.8 " />
      <polygon points="447.9,96.2 447.9,72.6 500.9,72.6 500.9,50.6 447.9,50.6 447.9,50.6 423.3,50.6 423.3,118.2 508.9,118.2 508.9,96.2 " />
    </svg>
  )
}

const Welcome: React.FC = () => {
  const [menuOpened, setMenuOpen] = useState(false)
  const { currentPage, setCurrentPage } = System.useContainer()

  const changePage = useCallback(
    (page: PageInfo) => {
      setMenuOpen(false)
      setCurrentPage(page)
    },
    [setCurrentPage, setMenuOpen]
  )

  return (
    <header
      id="header"
      className={classnames({
        exp: currentPage.headerExp,
        'menu-opened': menuOpened,
      })}
    >
      <div className="back"></div>
      <div className="logoborder"></div>
      <div className="logo">
        <div className="h2">Blockchain Institution</div>
        <div className="h1">
          <Logo onClick={() => changePage(Pages.welcome)} />
        </div>
        <div className="exp">
          <button onClick={() => changePage(Pages.whoweare)}>Explore→</button>
        </div>
      </div>
      <ul className="menu">
        <li>
          <a
            className={classnames({
              active: menuL1Map.about.includes(currentPage.menuActive ?? ''),
            })}
          >
            <span>About</span>
            <i className="iconfont icon-arrow"></i>
          </a>
          <ul>
            <li>
              <a
                className={classnames({
                  active: currentPage.menuActive === 'whoweare',
                })}
                onClick={() => changePage(Pages.whoweare)}
              >
                <span>Who We Are</span>
              </a>
            </li>
            <li>
              <a
                className={classnames({
                  active: currentPage.menuActive === 'whatwedo',
                })}
                onClick={() => changePage(Pages.whatwedo)}
              >
                <span>What We Do</span>
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a
            className={classnames({
              active: menuL1Map.stake.includes(currentPage.menuActive ?? ''),
            })}
          >
            <span>Stake</span>
            <i className="iconfont icon-arrow"></i>
          </a>
          <ul>
            <li>
              <a
                className={classnames({
                  active: currentPage.menuActive === 'staking',
                })}
                onClick={() => changePage(Pages.staking)}
              >
                <span>{'Staking & Node Infrastructure'}</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <MenuButton
        opened={menuOpened}
        onClick={() => setMenuOpen(!menuOpened)}
      />
    </header>
  )
}

export default Welcome
