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
  },
  signin: {
    display: "flex",
    flexDirection: "row",
  },
}));
function Register() {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState();
  const [username, setusername] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const { register, currentUser } = useContext(AuthContext);
  const onClick = async () => {
    setisLoading(true);
    let res = await register(username, email, password);
    // console.log(res);
    localStorage.setItem("username", res.data.username);
    setisLoading(false);
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
        <form className="form" onSubmit={onClick}>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />
          <div className={classes.mar}></div>
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
          Register
        </Button>
        <div className={classes.signin}>
          <h5>Don't have an account?</h5>
          <h5
            onClick={() => {
              history.push("/login");
            }}
            style={{ color: "blue", paddingLeft: "5px", cursor: "pointer" }}
          >
            Sign In
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Register;
