
import './App.css';

import NavPage from './components/NavPage/nav_page'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeaderContainer from './components/Header/headerContainer.tsx'
import { Login } from './components/Login/Login'
import React, { Suspense } from 'react'
const DialogsContainer = React.lazy(() => import ('./components/Dialogs/DialogsContainer.tsx'));
const UsersContainer = React.lazy(() => import ('./components/Users/UsersContainer.tsx'));
const ProfileContainer = React.lazy(() => import ('./components/Profile/ProfileContainer.tsx'))


const App = () => {
  return (

    <BrowserRouter>
      <div className='app_wrapper'>
        <HeaderContainer />
        <div className='item'>
          <NavPage />
          <div className='app_wrapper_content'>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path='/dialoges/' element={<DialogsContainer />} />
                <Route path='/profile/' element={<ProfileContainer />} />
                <Route path='/profile/:id' element={<ProfileContainer />} />
                <Route path='/users/' element={<UsersContainer />} />
                <Route path='/login' element={<Login />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </BrowserRouter>




  )
}

export default App;
