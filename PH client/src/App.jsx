import { FaRegBell } from 'react-icons/fa'
import './App.css'

import { Outlet } from 'react-router'
import { useGetLoggedInUser } from './lib/logIn/useGetLoggedInUser'
import Navbar from './components/public/Navbar';
import Footer from './components/public/Footer';

function App() {
   // eslint-disable-next-line no-unused-vars
   const { data: user, isLoading, isError, error } = useGetLoggedInUser();
   

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
