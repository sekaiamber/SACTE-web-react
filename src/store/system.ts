import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useLocation } from 'react-router'
import { createContainer } from './unstatedNextPro'

const isMobile = window.innerWidth < 540

export enum PageKey {
  whoweare = 'whoweare',
  whatwedo = 'whatwedo',
  staking = 'staking',
  protocols = 'protocols',
  protocol = 'protocol',
}

export const PageNum = {
  whoweare: '01',
  whatwedo: '02',
  staking: '01',
  protocols: '',
  protocol: '',
}

export const PageName = {
  whoweare: 'Who We Are',
  whatwedo: 'What We Do',
  staking: 'Staking',
  protocols: '',
  protocol: '',
}

interface AnimeState {
  flatRoad: boolean
  camera: {
    position: THREE.Vector3
    autoLookAt: boolean
    lookAtQuaternion?: THREE.Quaternion
  }
}

export interface PageColor {
  background: string
  roadColor: string
  islandColor: string
  shoulderLines: string
  brokenLines: string
  leftCars: string[]
  rightCars: string[]
  sticks: string
}

export interface PageInfo {
  headerExp: boolean
  footerShow: boolean
  menuActive: null | PageKey
  animeShow: boolean
  animeState: AnimeState | null
  animeColor?: PageColor
}

interface IPages {
  welcome: PageInfo
  whoweare: PageInfo
  whatwedo: PageInfo
  staking: PageInfo
  protocols: PageInfo
  protocol: PageInfo
}

const contentPage: Pick<PageInfo, 'headerExp' | 'footerShow' | 'animeShow'> = {
  headerExp: true,
  footerShow: true,
  animeShow: true,
}

const color1: PageColor = {
  background: '#0e0f14',
  roadColor: '#1c1c1d',
  islandColor: '#0a0a0a',
  shoulderLines: '#131318',
  brokenLines: '#47484e',
  leftCars: ['#ff102a', '#eb383e', '#ff102a'],
  rightCars: ['#dadafa', '#bebae3', '#8f97e4'],
  sticks: '#dadafa',
}

const color2: PageColor = {
  background: '#0e0f14',
  roadColor: '#1c1c1d',
  islandColor: '#0a0a0a',
  shoulderLines: '#275f3c',
  brokenLines: '#275f3c',
  leftCars: ['#12db5b', '#12db5b', '#12db5b'],
  rightCars: ['#12db5b', '#12db5b', '#12db5b'],
  sticks: '#275f3c',
}

const commonPages: IPages = {
  welcome: {
    headerExp: false,
    footerShow: false,
    menuActive: null,
    animeShow: true,
    animeState: {
      flatRoad: false,
      camera: {
        autoLookAt: true,
        position: new THREE.Vector3(0, 8, -5),
      },
    },
    animeColor: color1,
  },
  whoweare: {
    ...contentPage,
    menuActive: PageKey.whoweare,
    animeState: {
      flatRoad: true,
      camera: {
        autoLookAt: false,
        position: new THREE.Vector3(22, 33, -40),
        lookAtQuaternion: new THREE.Quaternion(
          -0.5647384530319085,
          0.11305135952609609,
          0.0784603527369658,
          0.8137160701527402
        ),
      },
    },
    animeColor: color2,
  },
  whatwedo: {
    ...contentPage,
    menuActive: PageKey.whatwedo,
    animeState: {
      flatRoad: false,
      camera: {
        autoLookAt: false,
        position: new THREE.Vector3(30, 60, -200),
        lookAtQuaternion: new THREE.Quaternion(-0.5, 0.5, 0.5, 0.5),
      },
    },
    animeColor: color2,
  },
  staking: {
    ...contentPage,
    menuActive: PageKey.staking,
    animeState: {
      flatRoad: true,
      camera: {
        autoLookAt: false,
        position: new THREE.Vector3(0, 1, -32),
        lookAtQuaternion: new THREE.Quaternion(
          0.35045594358174986,
          -0.023990105769047563,
          0.008980149603183891,
          0.9362288520156382
        ),
      },
    },
  },
  protocols: {
    headerExp: true,
    footerShow: false,
    menuActive: PageKey.protocols,
    animeShow: false,
    animeState: null,
  },
  protocol: {
    headerExp: true,
    footerShow: false,
    menuActive: PageKey.protocol,
    animeShow: false,
    animeState: null,
  },
}

const mobilePages: IPages = {
  welcome: {
    headerExp: false,
    footerShow: false,
    menuActive: null,
    animeShow: true,
    animeState: {
      flatRoad: false,
      camera: {
        autoLookAt: true,
        position: new THREE.Vector3(0, 8, -5),
      },
    },
  },
  whoweare: {
    ...contentPage,
    menuActive: PageKey.whoweare,
    animeState: {
      flatRoad: true,
      camera: {
        autoLookAt: false,
        position: new THREE.Vector3(3, 33, -40),
        lookAtQuaternion: new THREE.Quaternion(
          -0.5647384530319085,
          0.11305135952609609,
          0.0784603527369658,
          0.8137160701527402
        ),
      },
    },
  },
  whatwedo: {
    ...contentPage,
    menuActive: PageKey.whatwedo,
    animeState: {
      flatRoad: false,
      camera: {
        autoLookAt: false,
        position: new THREE.Vector3(15, 100, -200),
        lookAtQuaternion: new THREE.Quaternion(-0.5, 0.5, 0.5, 0.5),
      },
    },
  },
  staking: {
    ...contentPage,
    menuActive: PageKey.staking,
    animeState: {
      flatRoad: true,
      camera: {
        autoLookAt: false,
        position: new THREE.Vector3(0, 1, -32),
        lookAtQuaternion: new THREE.Quaternion(
          0.35045594358174986,
          -0.023990105769047563,
          0.008980149603183891,
          0.9362288520156382
        ),
      },
    },
  },
  protocols: {
    headerExp: true,
    footerShow: false,
    menuActive: PageKey.protocols,
    animeShow: false,
    animeState: null,
  },
  protocol: {
    headerExp: true,
    footerShow: false,
    menuActive: PageKey.protocol,
    animeShow: false,
    animeState: null,
  },
}

const Pages = isMobile ? mobilePages : commonPages

export { Pages }

export interface useSystemProps {
  prevPage: PageInfo | undefined
  currentPage: PageInfo
  setCurrentPage: (currentPage: PageInfo) => void
}

function useSystem(): useSystemProps {
  const [prevPage, setPrevPage] = useState<PageInfo>()
  const pageTemp = useRef<PageInfo>()
  const [currentPage, setCurrentPage] = useState(Pages.welcome)

  const location = useLocation()

  useEffect(() => {
    setPrevPage(pageTemp.current)
    pageTemp.current = currentPage
  }, [currentPage])

  useEffect(() => {
    const { pathname } = location
    if (pathname === '/') {
      setCurrentPage(Pages.welcome)
    } else if (pathname === `/${PageKey.whoweare}`) {
      setCurrentPage(Pages.whoweare)
    } else if (pathname === `/${PageKey.whatwedo}`) {
      setCurrentPage(Pages.whatwedo)
    } else if (pathname === `/${PageKey.staking}`) {
      setCurrentPage(Pages.staking)
    } else if (pathname === `/${PageKey.protocols}`) {
      setCurrentPage(Pages.protocols)
    } else if (pathname.startsWith(`/${PageKey.protocol}/`)) {
      setCurrentPage(Pages.protocol)
    }
  }, [location])

  return {
    prevPage,
    currentPage,
    setCurrentPage,
  }
}

const System = createContainer(useSystem)

export default System
