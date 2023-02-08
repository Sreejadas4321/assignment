import './App.scss';
import { auth } from './firebase';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { Home, MealDetails, Error, Category } from "./pages/index";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from './authentication/login/Login';
import Signup from './authentication/signup/Signup';
import { useEffect, useState } from 'react';
import UserProfile from './components/userProfile/UserProfile';
//this is the main component of this application
function App() {
  const [userName, setUserName] = useState("");
  //authenticating user
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName("");
      } else setUserName("");
    });
  }, []);
  // available routes
  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/login" element = {<Login/>} />
        <Route path = "/signup" element = {<Signup/>} />
        <Route path = "/meal/:id" element = {<MealDetails />} />
        <Route path = "/meal/category/:name" element = {<Category />} />
        <Route path = "/profile" element = {<UserProfile/>} />
        <Route path  = "*" element = {<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
