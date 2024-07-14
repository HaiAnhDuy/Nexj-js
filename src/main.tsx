import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Link,
  useLocation
} from "react-router-dom";
import UserPage from './screens/user.page.tsx';
import { useState, useEffect } from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined, HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';


// import './index.css'
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello world!</div>,
//   },
// ]);
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: <Link to={'/'}>Home</Link>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to={'/hello'}>Table User</Link>,
    key: 'user',
    icon: <AppstoreOutlined />,

  },


];
const Header = () => {
  const location = useLocation();


  const [current, setCurrent] = useState(location.pathname === '/' ? 'home' : 'user');



  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
const LayOut = () => {
  const GetData = async () => {
    const res = await fetch("http://localhost:8000/api/v1/auth/login", {
      method: 'POST',
      body: JSON.stringify({
        username: 'admin@gmail.com',
        password: '123456'
      },
      ),
      headers: {
        "Content-Type": "application/json"
      }

    });

    let data = await res.json();
    if (data && data.data && data.data.access_token) {
      localStorage.setItem('access_token', data.data.access_token)
    }
    console.log(data)
  }
  useEffect(() => {
    GetData();
  }, [])
  return (
    <div>
      <Header />
      <Outlet />
      <footer>FOOTER</footer>
    </div>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      { index: true, element: <App /> },
      {
        path: '/hello',
        element: <UserPage />
      }
    ]
  },

]);
ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>
)
