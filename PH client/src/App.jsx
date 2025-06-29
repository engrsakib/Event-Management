import { FaRegBell } from 'react-icons/fa'
import './App.css'

import { Outlet } from 'react-router'
import { useGetLoggedInUser } from './lib/logIn/useGetLoggedInUser'

function App() {
   // eslint-disable-next-line no-unused-vars
   const { data: user, isLoading, isError, error } = useGetLoggedInUser();
   

  return (
    <>
     <h1>sakib</h1>
    </>
  )
}

export default App
