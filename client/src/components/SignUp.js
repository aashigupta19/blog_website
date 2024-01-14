import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  let navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = yup.object({
    username: yup.string().required("**required"),
    password: yup
      .string()
      .min(5)
      .max(20)
      .required("**password should be min. 5 letters and max. 20 letters"),
  });

  const onSubmit = (data) => {
    console.log("Input data: ", data);

    const URL = "http://localhost:4001/auth";
    const resp = axios.post(URL, data).then((response) => {
      console.log(response.data);
      console.log("user created!");
    });

    navigate("/");

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

          <button type="submit">Sign Up!</button>
        </Form>
      </Formik>
    </div>
  );
}

export default SignUp;
