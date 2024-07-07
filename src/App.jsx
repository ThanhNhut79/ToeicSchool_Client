import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/login";
import UProfile from "./pages/UserProfile/UProfile";
import { useDispatch, useSelector } from 'react-redux';
import { login } from './store/slice/auth';
import { useEffect } from "react";
import authService from "./services/auth";

const App = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state => state.auth));


  useEffect(() => { 
    const renewAccessToken = async () => {
      if (isLogin === false) {
        if (localStorage.getItem("refreshToken")) {
          try {
            const { accessToken, userInfo } = await authService.renewAccessToken(localStorage.getItem("refreshToken"));
            dispatch(login({ accessToken, userInfo }));
          } catch (error) {
            console.error("Error renewing access token:", error);
          }
        }
      }
    };

    renewAccessToken();
  }, [dispatch, isLogin]);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/UProfile" element={<UProfile />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
