import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
export const AuthContext = React.createContext();
// const axios = require("axios");
const url = "http://localhost:8080";
let id;
function SignMethod({ children }) {
  const [currentUser, setcurrentUser] = useState();
  const [isLoading, setisLoading] = useState(true);
  const history = useHistory();

  async function register(username, email, password) {
    try {
      let res = await axios.post(`${url}/register`, {
        username: username,
        email: email,
        password: password,
      });
      id = res.data.id;
      console.log(id);
      setcurrentUser(id);
      localStorage.setItem("currentUser", id);
      // console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async function login(email, password) {
    try {
      let res = await axios.post(`${url}/login`, {
        email: email,
        password: password,
      });
      console.log(res);

      id = res.data.id;
      localStorage.setItem("currentUser", id);
      setcurrentUser(id);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async function logout() {
    history.push("login");
    setcurrentUser();
    localStorage.setItem("currentUser", "");
  }
  useEffect(() => {
    let userId = localStorage.getItem("currentUser");
    setcurrentUser(userId);
    setisLoading(false);
  }, []);
  const value = {
    currentUser,
    login,
    register,
    logout,
  };
  return (
    <div>
      <AuthContext.Provider value={value}>
        {!isLoading && children}
      </AuthContext.Provider>
    </div>
  );
}

export default SignMethod;
