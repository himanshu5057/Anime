import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./login_register.css";
import { AuthContext } from "./SignMethod";
const useStyles = makeStyles((theme) => ({
  mar: {
    margin: "10px",
  },signup:{
    display:"flex",
    flexDirection:"row"
},
}));
function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const { login, currentUser } = useContext(AuthContext);
  const onClick = async () => {
    setisLoading(true);
    let res = await login(email, password);
    setisLoading(false);
    localStorage.setItem("username", res.data.username);

    console.log(res);
    if (res.data.result) {
      history.push("/");
    } else {
      seterror(res.data.message);
      setTimeout(() => {
        seterror("");
      }, 3000);
    }
    // console.log(currentUser);
  };
  useEffect(() => {
    console.log(currentUser);
    if (currentUser) {
      history.push("/");
    }
  }, []);
  return (
    <div className="root">
      <div className="register">
        <h2>Anime</h2>
        <form className="form1">
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <div className={classes.mar}></div>
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </form>
        <div className={classes.mar}></div>

        <Button
          onSubmit={onClick}
          onClick={onClick}
          variant="outlined"
          color="secondary"
        >
          Login
        </Button>
        <div className={classes.signup}>
          <h5>Don't have an account?</h5>
          <h5
            onClick={() => {
              history.push("/register");
            }}
            style={{ color: "blue", paddingLeft: "5px", cursor: "pointer" }}
          >
            Sign Up
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Login;
