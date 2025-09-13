import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import { Header } from './components/header'
import { Login } from './pages/login';
import {Home} from './pages/home'
import { BookShelf } from './pages/bookShelfForm';
import BookList from './pages/BookList';

function App() {

  return (
   <>
      <Header />
      <Routes>
        <Route path="/book-form" element={<BookShelf />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path='/book-list' element={<BookList />} />
      </Routes>
    </>

  )
}

export default App
