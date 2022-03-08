import React from 'react'
import ThemeAnimation from '../themeAnimation'
import Header from './header'
import Sidebar from './sidebar'
import Content from './content'
import './style.scss'

export const Home: React.FC = () => {
  return (
    <>
      <ThemeAnimation />
      <Header />
      <Sidebar />
      <Content />
    </>
  )
}
