import { useState } from 'react'
import * as THREE from 'three'
import { createContainer } from './unstatedNextPro'

const isMobile = window.innerWidth < 540

interface AnimeState {
  flatRoad: boolean
  camera: {
    position: THREE.Vector3
    autoLookAt: boolean
    lookAtQuaternion?: THREE.Quaternion
  }
}

export interface PageInfo {
  num: null | '01' | '02'
  name: null | 'Who We Are' | 'What We Do'
  headerExp: boolean
  footerShow: boolean
  menuActive: null | 'whoweare' | 'whatwedo'
  animeState: AnimeState
}

interface IPages {
  welcome: PageInfo
  whoweare: PageInfo
  whatwedo: PageInfo
}

const commonPages: IPages = {
  welcome: {
    num: null,
    name: null,
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
    num: '01',
    name: 'Who We Are',
    headerExp: true,
    footerShow: true,
    menuActive: 'whoweare',
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
    num: '02',
    name: 'What We Do',
    headerExp: true,
    footerShow: true,
    menuActive: 'whatwedo',
    animeState: {
      flatRoad: false,
      camera: {
        autoLookAt: false,
        position: new THREE.Vector3(30, 60, -200),
        lookAtQuaternion: new THREE.Quaternion(-0.5, 0.5, 0.5, 0.5),
      },
    },
  },
}

const mobilePages: IPages = {
  welcome: {
    num: null,
    name: null,
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
    num: '01',
    name: 'Who We Are',
    headerExp: true,
    footerShow: true,
    menuActive: 'whoweare',
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
    num: '02',
    name: 'What We Do',
    headerExp: true,
    footerShow: true,
    menuActive: 'whatwedo',
    animeState: {
      flatRoad: false,
      camera: {
        autoLookAt: false,
        position: new THREE.Vector3(15, 100, -200),
        lookAtQuaternion: new THREE.Quaternion(-0.5, 0.5, 0.5, 0.5),
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
