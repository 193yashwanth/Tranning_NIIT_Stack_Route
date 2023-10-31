import React from 'react';
import { BrowserRouter as Router, Route, Routes,Link  } from 'react-router-dom';
import Home from "./components/Home";
import BlogList from './components/BlogList';
import Contact from './components/Contact';
import PageNotFound from './PageNotFound';
import Login from './components/Login';

const App = () =>{
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Product</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </Router>
  );
};

export default App;
