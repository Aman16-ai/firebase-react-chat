import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { auth } from './firebase-config';
import { useEffect } from 'react';
import PrivateRoute from './components/PrivateRoute';
function App() {
  useEffect(()=> {
    console.log('auth app',auth.currentUser)
  },[])
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<PrivateRoute name="Dashboard"><Dashboard/></PrivateRoute>}/>
        <Route path='/Login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
