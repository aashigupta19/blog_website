import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = yup.object({
    username: yup.string().required("**required"),
  });

  let [loginStatus, setLoginStatus] = useState("");
  const onSubmit = (data) => {
    console.log("Input data: ", data);

    const URL = "http://localhost:4001/auth/login";
    const resp = axios.post(URL, data).then((response) => {
      console.log(response.data);

      //   we have to check what's in the response
      const rr = response.data;
      console.log("rr", rr);
      let msg = "";
      if (rr.error) msg = rr.error;
      else if (rr.success)
        msg = `Login successful! Welcome back, ${data.username}`;

      setLoginStatus(msg);
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
      {loginStatus ? <div className="loginStatus">{loginStatus}</div> : ""}
    </div>
  );
}

export default Login;
