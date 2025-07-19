import {  Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './assets/Header'
import Home from './assets/Home'
import CartItems from './assets/CartItems'
import About from './assets/About'
import Footer from './assets/Footer'
import Signup from './assets/Signup'
import Signin from './assets/Signin'
import PrivateRoutes from './assets/PrivateRoutes'
import Dashboard from './user/Dashboard'
import AdminRoutes from './assets/AdminRoutes'
import Admindashboard from './admin/Admindashboard'
import Forgotpass from './assets/Forgotpass'
import CreateCategory from './admin/CreateCategory'
import Products from './admin/Products'
import Users from './admin/Users'
import CreateProduct from './admin/CreateProduct'
import UpdateProduct from './admin/UpdateProduct'
import Search from './assets/Search'
import Profile from './user/Profile'
import Orders from './user/Orders'


function App() {

  return (
   <>
    <Header/>

    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/cartitems' element={<CartItems/>}/>
    
    <Route path='/dashboard' element={<PrivateRoutes/>}>
    <Route path='user' element={<Dashboard/>}/>
    <Route path='user/profile' element={<Profile/>}/>
    <Route path='user/orders' element={<Orders/>}/>
    </Route>
    
    <Route path='/dashboard' element={<AdminRoutes/>}>
    <Route path='admin' element={<Admindashboard/>}/>
    <Route path='admin/categories' element={<CreateCategory/>}/>
    <Route path='admin/create-product' element={<CreateProduct/>}/>
    <Route path='admin/update-product/:slug' element={<UpdateProduct/>}/>
    <Route path='admin/products' element={<Products/>}/>
    <Route path='admin/users' element={<Users/>}/>
    
    </Route>

    
    <Route path='/forgotpass' element={<Forgotpass/>}/>
    <Route path='/search' element={<Search/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App