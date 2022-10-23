import {useState}from 'react';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginPage from './components/LoginPage/LoginPage';
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./helpers/firebaseConfig";

// Rozrózniamy 2 grupy elementów:
//1) 

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  onAuthStateChanged (auth, (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  })

  return (
  <div className="App">
    <BrowserRouter>
      <Navbar loggedIn={loggedIn}/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </div>
);
}

export default App;
