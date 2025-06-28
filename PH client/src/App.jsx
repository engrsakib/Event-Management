import { FaRegBell } from 'react-icons/fa'
import './App.css'
import Menu from './pages/dashboard/menu/Menu'
import dummyPhoto from '/user.svg'
import { Outlet } from 'react-router'
import { useGetLoggedInUser } from './lib/logIn/useGetLoggedInUser'

function App() {
   // eslint-disable-next-line no-unused-vars
   const { data: user, isLoading, isError, error } = useGetLoggedInUser();
   

  return (
    <>
      {/* menu */}
      <section className='grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4 p-4'>
        <div className='col-span-1 md:col-span-4 lg:col-span-2 min-h-[95vh] bg-gradient-to-r from-[#7D0000] to-[#973333] p-4 rounded-lg'>
          <Menu />
        </div>

        {/* content */}
        <div className='col-span-1 md:col-span-8 lg:col-span-10 bg-white rounded-lg '>
          {/* header */}
          <header className='flex justify-between items-center mb-4 bg-[#D7B0B0] text-white p-4 rounded-lg'>
            <h1 className='text-2xl font-bold text-[#8B0000]'>Welcome back!</h1>
            <div className='flex items-center justify-center gap-x-5'>
              <button className='text-[#8B0000] text-2xl bg-white rounded-full flex items-center p-4'>
              <FaRegBell />
            </button>
              
              <button className='bg-[#8B0000] text-white rounded-full flex items-center'>
              <img src={user?.photoUrl || dummyPhoto} alt="user" className='w-[50px] object-fill h-[50px] rounded-full' />
            </button>
            </div>
          </header>
          {/* main section */}
          <main className='overflow-y-auto p-4 '>
            <Outlet />
          </main>
            
        </div>
      </section>
    </>
  )
}

export default App
