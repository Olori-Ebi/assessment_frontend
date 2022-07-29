import Register from './pages/Register';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signin from './pages/Signin';
import Home from './pages/Home';
import Single from './pages/Single';
import { useState } from 'react';
import Protected from './ProtectedRoute';

function App() {
  const isAuthenticated = !!localStorage.token;
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signin" element={<Signin setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/" element={
          <Protected isLoggedIn= {isLoggedIn}>
            <Home />
          </Protected>
        } />
        <Route path="/product/:id" element={
          <Protected isLoggedIn= {isLoggedIn}>
            <Single />
          </Protected>
        } />
        {/* <Route path="/" element={<Home /> } /> */}
        {/* <Route path="/product/:id" element={<Single />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
