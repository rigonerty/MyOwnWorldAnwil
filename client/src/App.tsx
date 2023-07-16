import React, { useEffect } from 'react';
import './styles/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import { Navbar } from './components/UI/Navbar/Navbar';
import { Footer } from './components/UI/Footer/Footer';
import { Tools } from './components/Tools';
import { CreateArticle } from './components/CreateArticle';
import { appUseDispatch } from './hooks/reduxHooks';
import { checkAuth } from './store/user';
import { UserSettings } from './components/UserSettings';
import { Profile } from './components/Profile';
function App() {
  const dispatch = appUseDispatch()
  useEffect(()=>{
    if(localStorage.getItem("token")){
      dispatch(checkAuth())      
    }

  },[])
  return (
  <BrowserRouter>
    <Navbar/>
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/tools" element={<Tools/>}/>
        <Route path="/tools/createPost" element={<CreateArticle/>}/>
        <Route path="/user/settings" element={<UserSettings/>}/>
        <Route path="/user" element={<Profile/>}/>
      </Routes>      
    </div>

    <Footer/>
  </BrowserRouter>
  );
}

export default App;
