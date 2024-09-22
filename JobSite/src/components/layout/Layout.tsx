import React from 'react'
import Header from '../header'

interface LayoutProps {
    children: React.ReactNode
    }

    //add footer later
export const Layout:React.FC<LayoutProps> = ({children}) => {
  return (
    <>
    <Header />
    {children}
    </>
  )
}

export default Layout;