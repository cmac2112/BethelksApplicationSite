import React from 'react'
import Header from '../header'
import Footer from '../footer'

interface LayoutProps {
    children: React.ReactNode
    }

    //add footer later
    //pass all body content as a child of this layout component to put it on every page
    /* ex: return (
    <Layout>{stuff}</Layout>)
    */
   

    //add footer later
export const Layout:React.FC<LayoutProps> = ({children}) => {
  return (
    <>
    <Header />
    {children}
    <Footer />
    </>
  )
}

export default Layout;