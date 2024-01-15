import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../helper/AuthContext";

function Login() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = yup.object({
    username: yup.string().required("**required"),
  });

  let navigate = useNavigate();
  let { setLoginStatus, setUserDetails } = useContext(AuthContext);

  let [loginMsg, setLoginMsg] = useState("");
  const onSubmit = (data) => {
    console.log("Input data: ", data);

    const URL = "http://localhost:4001/auth/login";
    const resp = axios.post(URL, data).then((response) => {
      console.log(response.data);

      //   we have to check what's in the response
      const rr = response.data;
      console.log("rr", rr);
      let msg = "";
      if (rr.error) {
        msg = rr.error;
        setLoginMsg(msg);
        alert(msg);
      } else if (rr.success) {
        msg = `Login successful! Welcome back, ${data.username}`;
        // sessionStorage.setItem("accessToken", rr.accessToken);
        localStorage.setItem("accessToken", rr.accessToken);
        localStorage.setItem("loggedUser", data.username);
        setLoginStatus(true);
        setUserDetails(data.username);
        setLoginMsg(msg);
        alert(msg);
        navigate("/");
      }
    });

    console.log("response", resp);
  };
  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username</label>
          <ErrorMessage name="username" component="span"></ErrorMessage>
          <Field
            id="inputForm"
            name="username"
            placeholder="Input username"
          ></Field>

          <label>Password</label>
          <ErrorMessage name="password" component="span"></ErrorMessage>
          <Field
            id="inputForm"
            type="password"
            name="password"
            placeholder="Input password"
          ></Field>

          <button type="submit">Login</button>
        </Form>
      </Formik>
      {loginMsg ? <div className="loginMsg">{loginMsg}</div> : ""}
    </div>
  );
}

export default Login;
