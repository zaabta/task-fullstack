import { useState } from "react";
import "./App.css";
import Box from "./components/Box/Box";
import TodoList from "./components/TodoList/TodoList";
import { Routes , Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Signin from "./pages/Signin/Signin";
import RequiredAuth from "./RequiredAuth";
import Home from "./pages/Home/Home";


const App = () => {
  return (
    <Routes>
      <Route element={<RequiredAuth/>}>
        <Route path="/home" element={<Home/>}/>
      </Route>
      <Route path="/signup" element={<Register/>}/>
      <Route path="/signin" element={<Signin/>}/>
    </Routes>
  );
};

export default App;
