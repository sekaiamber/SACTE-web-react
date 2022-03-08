import { useState } from 'react'
import * as THREE from 'three'
import { createContainer } from './unstatedNextPro'

interface AnimeState {
  flatRoad: boolean
  camera: {
    position: THREE.Vector3
    autoLookAt: boolean
    lookAtDirection?: THREE.Vector3
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
        position: new THREE.Vector3(9, 13, -23),
        lookAtDirection: new THREE.Vector3(-0.05, -0.34, -0.11),
      },
    },
  },
  whatwedo: {
    num: '02',
    name: 'What We Do',
    headerExp: true,
    menuActive: 'whatwedo',
    animeState: {
      flatRoad: false,
      camera: {
        autoLookAt: true,
        position: new THREE.Vector3(0, 8, -5),
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
