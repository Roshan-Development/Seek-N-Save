import { useState } from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header'
import Home from './pages/Home'
import Lost from './pages/Lost'
import Found from './pages/Found'
import SignIn from './components/SignIn'
import SignUp from './pages/SignUp'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import CreateListing from './pages/CreateListing';
import SeparatePage from './pages/SeparatePage';
import { AnimatePresence } from 'framer-motion';
import ParticleBackground from './components/Particle';

function App() {
  const [count, setCount] = useState(0)

  return (
    <> <ParticleBackground/>
      <Router>
        <Header/>
        <AnimatePresence mode='wait'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/lost' element={<Lost/>}/>
          <Route path='/found' element={<Found/>}/>

          <Route path='/profile' element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>}/>
          </Route>

          <Route path='/create-listing' element={<PrivateRoute/>}>
            <Route path='/create-listing' element={<CreateListing/>}/>
          </Route>

          <Route path='/lost' element={<PrivateRoute/>}>
            <Route path='/lost' element={<Lost/>}/>
          </Route>

          <Route path='/found' element={<PrivateRoute/>}>
            <Route path='/found' element={<Found/>}/>
          </Route>


          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>

          <Route path='/separate-page/:itemId' element={<SeparatePage/>}/>
        </Routes>
        </AnimatePresence>
        <Footer/>
      
      </Router>
      
      <ToastContainer
position="top-right"
autoClose={2500}
hideProgressBar
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Flip}
/>
<ToastContainer/>
    </>
  )
}

export default App
