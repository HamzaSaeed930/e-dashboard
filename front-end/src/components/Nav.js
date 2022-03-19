import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img from './images/shoppes.jfif';

function Nav() {
  const navigate = useNavigate();// ya apna ap componenet ko rerender kr deta ha
  const auth = localStorage.getItem('user');
  const logout = () => {
    console.log("Apple");
    localStorage.clear();
    navigate('/signup');

  }
  return (
    <div>
      <img src={img} alt="logo"/>
      {auth ? <ul className='nav-ul'>
        <li><Link to="/">Products</Link></li>
        <li><Link to="/add">Add Product</Link></li>
        <li><Link to="/update">Update Product</Link></li>
        <li><Link to="/delete">Delete Product</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link onClick={logout} to="/signup">Logout({JSON.parse(auth).name})</Link></li>
      </ul>
        :
        <ul className='nav-ul nav-right'>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      }
    </div>
  )
}

export default Nav;