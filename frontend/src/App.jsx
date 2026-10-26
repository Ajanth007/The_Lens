import React from "react";
import {  Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import Articles from "./Pages/article";
import Topics from "./Pages/topics";
import Authors from "./Pages/authors";
import About from "./Pages/about";
import MainLayout from "./layout/MainLayout";
import Subscribe from "./Pages/subscribe";
import SpecificArticle from "./Pages/specificAriticle";
import Login from './Pages/login'
import Register from './Pages/register'
import AuthorProfile from "./Pages/AuthorProfile";
import AddNewArticle from './Pages/addNewArticle'

const App = () => {
  return (
    <>

        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/articles/:id" element={<SpecificArticle />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/about" element={<About />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/profile" element={<AuthorProfile />} />
             <Route path="/addnewArticle" element={<AddNewArticle  />} />
          </Route>
        </Routes>

    </>
  );
};

export default App;
