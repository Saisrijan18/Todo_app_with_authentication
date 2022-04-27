import React, { useEffect, useState } from "react";
import "./index.css";
import {fetch_users,get_users,login_succes} from "../Redux/actions"
import { connect } from "react-redux";
import {useNavigate} from "react-router-dom"
const SignUpLogin = ({state_name,login_succes,fetch_users,get_users,users_data}) => {
    const history = useNavigate();
  useEffect(()=>{
    get_users()
  },[])
  const [login, setLogin] = useState(true);

  const storeUserDetails = (e) => {
    e.preventDefault();
    const emailId = document.getElementById("emailId").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    //   const userDetails = {
    //     emailId: emailId,
    //     password: password,
    //     name:name
    //   };
      if(login===false){
        fetch_users(emailId,password,name,history)
      }
  };
  const validateLoginDetails = (e) => {
    e.preventDefault();
    const emailId = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    let validEmail = false;
    let validPassword = false;let user={}
    for (let x in users_data) {
      if (users_data[x].email === emailId) {
         
        validEmail = true;
        if (users_data[x].password == password) {
          validPassword = true;
        }
        if (validPassword) {
            user=x;
          break;
        }
      }
    }
    if (validEmail && validPassword) {
        login_succes(user,users_data[user].name,history);
      //localStorage.setItem("jwt_token", "LOGIN SUCCESS");
     // history("/fetch_auth");
    } else if (!validEmail) {
      alert("Account does not exist");
    } else if (!validPassword) {
      alert("Password is incorrect");
    }
  };
  return (
    <div id="container" className="hero">
      <div className="form-box">
        <div className="button-box">
          <div id="btn"></div>
          <button
            className="toggle-btn"
            onClick={() => {
              var btn = document.getElementById("btn");
              btn.style.left = "0";
              setLogin(true);
            }}
          >
            Login
          </button>
          <button
            className="toggle-btn"
            onClick={() => {
              var btn = document.getElementById("btn");
              btn.style.left = "110px";
              setLogin(false);
            }}
          >
            Sign Up
          </button>
        </div>

        {login && (
          <form id="login" className="input-group">
            <input
              type="text"
              className="input-field"
              placeholder="Enter Name"
              autoComplete="email"
              id="login-email"
            />
            <input
              type="password"
              className="input-field"
              placeholder="Enter Password"
              autoComplete="password"
              id="login-password"
            />
            
            <button
              type="submit"
              className="submit-btn mt-5"
              onClick={validateLoginDetails}
            >
              Log In
            </button>
          </form>
        )}
        {!login && (
          <form id="register" className="input-group">
            <input
              type="text"
              className="input-field"
              placeholder="Enter email"
              id="emailId"
            />
            
            <input
              type="password"
              className="input-field"
              placeholder="Enter Password"
              id="password"
            />
            <input
              type="text"
              className="input-field"
              placeholder="Enter Name"
              id="name"
            />
            <button
              type="submit"
              className="submit-btn mt-3"
              onClick={storeUserDetails}
            >
              Create new account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const MapStateToProps=(state)=>({
    state_data:state.dataFromstate.data,
    state_name:state.dataFromstate.name_id,
    users_data:state.dataFromstate.users_data
  })
  
  
export default connect(MapStateToProps,{fetch_users,get_users,login_succes})(SignUpLogin);
