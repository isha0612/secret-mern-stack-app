import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Components/Home';
import Login from "./Components/Login";
import Register from "./Components/Register";
import Secrets from "./Components/Secrets";
import Submit from "./Components/Submit";
import PrivateRoute from "./Components/PrivateRoute";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import PageNotFound from "./Components/PageNotFound";
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path='/forgot-password' element={<ForgotPassword />} />
          <Route exact path="/secrets" element={<PrivateRoute><Secrets /></PrivateRoute>} />
          <Route exact path="/submit" element={<PrivateRoute><Submit /></PrivateRoute>} />
          <Route exact path="/reset-password/:id" element={<ResetPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;