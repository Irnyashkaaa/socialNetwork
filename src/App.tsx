import 'antd/dist/antd.css';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Login } from './components/Login/Login.tsx'
import React, { Suspense } from 'react'
import {HeaderComponent} from './components/Header/header'

const ChatPage = React.lazy(() => import('./components/ChatPage/ChatPage.tsx'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.tsx'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer.tsx'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer.tsx'))

const { Header, Content, Sider } = Layout;

const App: React.FC = () => (
  <BrowserRouter>
    <Layout>
      <Header className="header">
        <HeaderComponent />
      </Header>

      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu mode='inline'>
            <SubMenu icon={<UserOutlined />} title='Profile'>
              <Menu.Item key={1}>
                <Link to="/profile">My account</Link>
              </Menu.Item>
              <Menu.Item key={2}>
                <Link to='/dialoges' >Messages</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
          <Menu mode='inline'>
            <SubMenu icon={<LaptopOutlined />} title='Fun'>
              <Menu.Item key={1}>
                <Link to="/music">Music</Link>
              </Menu.Item>
              <Menu.Item key={2}>
                <Link to='/news' >News</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
          <Menu mode='inline'>
            <SubMenu icon={<NotificationOutlined />} title='Users'>
              <Menu.Item key={1}>
                <Link to="/users">Find users</Link>
              </Menu.Item>
              <Menu.Item key={2}>
                <Link to='/chat'>Users chat</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>

        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >

            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path='/dialoges/' element={<DialogsContainer />} />
                <Route path='/profile/' element={<ProfileContainer />} />
                <Route path='/profile/:id' element={<ProfileContainer />} />
                <Route path='/users/' element={<UsersContainer />} />
                <Route path='/login' element={<Login />} />
                <Route path='/chat' element={<ChatPage />} />
              </Routes>
            </Suspense>

          </Content>
        </Layout>
      </Layout>
    </Layout>
  </BrowserRouter>
);

export default App;