import React  from 'react';
import './App.css';
import AddProduct from './components/AddProduct';
import Nav from './components/Nav'
import Footer from './components/Footer'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Signup from './components/SignUp'
import Login from './components/Login';
import PrivateComponent from './components/PrivateComponent'; 
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';


function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route element={<PrivateComponent/>}>
        <Route path='/' element={<ProductList/>}></Route>
        <Route path='/add' element={<AddProduct/>}></Route>
        <Route path='/update/:id' element={<UpdateProduct/>}></Route>
        <Route path='/delete' element={<h1>Thanks for Delete Product</h1>}></Route>
        <Route path='/logout' element={<h1>Bye Bye Logout Page</h1>}></Route>
        <Route path='/profile' element={<h1>Welcome to Profile Page</h1>}></Route>

        </Route> 

        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
