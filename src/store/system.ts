import { useState } from 'react'
import * as THREE from 'three'
import { createContainer } from './unstatedNextPro'

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
  menuActive: null | 'whoweare' | 'whatwedo'
  animeState: AnimeState
}

interface IPages {
  welcome: PageInfo
  whoweare: PageInfo
  whatwedo: PageInfo
}

const Pages: IPages = {
  welcome: {
    num: null,
    name: null,
    headerExp: false,
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
    menuActive: 'whoweare',
    animeState: {
      flatRoad: true,
      camera: {
        autoLookAt: false,
        position: new THREE.Vector3(22, 33, -17),
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
    menuActive: 'whatwedo',
    animeState: {
      flatRoad: true,
      camera: {
        autoLookAt: false,
        position: new THREE.Vector3(30, 60, -130),
        lookAtQuaternion: new THREE.Quaternion(-0.5, 0.5, 0.5, 0.5),
      },
    },
  },
}

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
