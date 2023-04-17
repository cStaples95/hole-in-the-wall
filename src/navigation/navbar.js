import React from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import GroupScreen from "../screens/GroupScreen";

function Navbar() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" exact component={HomeScreen} />
          <Route path="/search" exact component={ProfileScreen} />
          <Route path="/groups" exact component={GroupScreen} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Navbar;