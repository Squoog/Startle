import { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { authContext } from "./providers/AuthProvider";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Sounds from "./pages/Sounds";
import Login_Register from "./pages/Login_Register";


import "./App.css";

//Views -- Mostly test views atm


function App() {
  const [token, setToken] = useState();
  const { auth } = useContext(authContext);

  // if (!token) {
  //   return (
  //     <Login_Register setToken={setToken}/>
  //   );
  // }

  return (
    <>
    {!auth && <Login_Register setToken={setToken}/>}
    { auth && <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="login_register" element={<Login_Register />} /> */}
          <Route path="about" element={<About />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="sounds" element={<Sounds />}/>
          
        </Route>
      </Routes>
    </BrowserRouter> }
    </>
  );
}


export default App;
