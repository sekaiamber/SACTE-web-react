import { useState } from 'react'
import * as THREE from 'three'
import { createContainer } from './unstatedNextPro'

const isMobile = window.innerWidth < 540

export enum PageKey {
  whoweare = 'whoweare',
  whatwedo = 'whatwedo',
  staking = 'staking',
}

export const PageNum = {
  whoweare: '01',
  whatwedo: '02',
  staking: '01',
}

export const PageName = {
  whoweare: 'Who We Are',
  whatwedo: 'What We Do',
  staking: 'Staking',
}

interface AnimeState {
  flatRoad: boolean
  camera: {
    position: THREE.Vector3
    autoLookAt: boolean
    lookAtQuaternion?: THREE.Quaternion
  }
}

export interface PageInfo {
  headerExp: boolean
  footerShow: boolean
  menuActive: null | PageKey
  animeState: AnimeState
}

interface IPages {
  welcome: PageInfo
  whoweare: PageInfo
  whatwedo: PageInfo
  staking: PageInfo
}

const contentPage: Pick<PageInfo, 'headerExp' | 'footerShow'> = {
  headerExp: true,
  footerShow: true,
}

const commonPages: IPages = {
  welcome: {
    headerExp: false,
    footerShow: false,
    menuActive: null,
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
        position: new THREE.Vector3(22, 33, -40),
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
        position: new THREE.Vector3(30, 60, -200),
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
}

const mobilePages: IPages = {
  welcome: {
    headerExp: false,
    footerShow: false,
    menuActive: null,
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
}

const Pages = isMobile ? mobilePages : commonPages

export { Pages }

export interface useSystemProps {
  currentPage: PageInfo
  setCurrentPage: (currentPage: PageInfo) => void
}

function useSystem(): useSystemProps {
  const [currentPage, setCurrentPage] = useState(Pages.welcome)

  return {
    currentPage,
    setCurrentPage,
  }
}

const System = createContainer(useSystem)

export default System
