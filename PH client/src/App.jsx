import { FaRegBell } from 'react-icons/fa'
import './App.css'

import { Outlet } from 'react-router'

import Navbar from './components/public/Navbar';
import Footer from './components/public/Footer';

function App() {
   
   

  return (
    <>
     <Navbar/>
      <section className='min-h-screen'>
        <Outlet/>
      </section>
     <Footer/>
    </>
  )
}

export default App
