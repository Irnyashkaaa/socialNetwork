
import './App.css';
import ProfileContainer from './components/Profile/ProfileContainer'
import NavPage from './components/NavPage/nav_page'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/headerContainer'
import {Login} from './components/Login/Login'

const App = () => {
  return (
    <BrowserRouter>
      <div className='app_wrapper'>
        <HeaderContainer />
        <div className='item'>
          <NavPage />
          <div className='app_wrapper_content'>
            <Routes>
              <Route path='/dialoges/' element={ <DialogsContainer />}/>
              <Route path='/profile/' element={<ProfileContainer />} />
              <Route path='/profile/:id' element={<ProfileContainer />} />
              <Route path='/users/' element={<UsersContainer/>}/>
              <Route path='/login'element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>


  )
}

export default App;
