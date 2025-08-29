import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import { Header } from './components/header'
import { Login } from './pages/login';
import {Home} from './pages/home'
import { BookShelf } from './pages/bookShelf';

function App() {

  return (
   <>
      <Header />
      <Routes>
        <Route path="/book-shelf" element={<BookShelf />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>

  )
}

export default App
