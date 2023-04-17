import React from 'react';
import { Link } from "react-router-dom";
const navbar= () =>{
  return (
  <div>
    <li>
      <Link to="/">HomeScreen</Link>
    </li>
    <li>
      <Link to="/profile">ProfileScreen</Link>
    </li>
    <li>
      <Link to="/groups">GroupScreen</Link>
    </li>
  </div>
  );
}
export default navbar;