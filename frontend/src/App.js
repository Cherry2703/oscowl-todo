import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import Profile from './components/Profile'


const App = () =>(
  <BrowserRouter>
    <Routes>
      <Route path='/login' Component={Login}/>
      <Route path='/signup' Component={SignUp}/>
      <Route path='/' Component={Home}/>
      <Route path='/profile' Component={Profile}/>
    </Routes>
  </BrowserRouter>
)

export default App