import React from 'react'
import ThemeAnimation from '../themeAnimation'
import Header from './header'
import Sidebar from './sidebar'
import './style.scss'

export const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <ThemeAnimation />
    </>
  )
}
