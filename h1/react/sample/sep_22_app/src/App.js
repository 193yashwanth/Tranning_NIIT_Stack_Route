import React, { Component } from 'react'
import Data from './Data'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, NavLink, BrowserRouter, Routes } from 'react-router-dom'
import Add_to_cart from './Add_to_cart';
import HomePage from './components/HomePage';
import Layout from './components/Layout';


export class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Layout />} />
            <Route path='/HomePage' element={<HomePage />} />
            <Route path='/Data' element={<Data/>} />
            <Route path='/cart' element={<Add_to_cart />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App