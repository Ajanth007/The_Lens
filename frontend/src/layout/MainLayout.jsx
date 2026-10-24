/* import Navbar from '../component/navbar'
import Footer from '../component/footer'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
  <>
      <Navbar />
        <Outlet />
      <Footer />
</>
  )
}

export default MainLayout */

import Navbar from '../component/navbar'
import Footer from '../component/footer'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
    <style>{`
        .main-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .main-navbar {
          position: sticky;
          top: 0;
          width: 100%;
          z-index: 1000;
        }

        .main-content {
          flex: 1;
          width: 100%;
        }
      `}</style>
    <div className="main-layout">
      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
    </>
  )
}


export default MainLayout