import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../helper/AuthContext";

function CreatePost() {
  const initialValues = {
    title: "",
    content: "",
    author: "",
  };

  let navigate = useNavigate();
  let { setUpdatePostList } = useContext(AuthContext);

  const validationSchema = yup.object({
    title: yup.string().required("**required"),
    content: yup.string().required("**required"),
    author: yup.string().min(5).max(20).required("**required"),
  });

  const onSubmit = (data) => {
    console.log("Input data: ", data);

    const URL = "http://localhost:4001/posts";
    const resp = axios.post(URL, data).then((response) => {
      console.log("inside axios");
      console.log(response.data);
      console.log("it worked");
      setUpdatePostList(true);
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
          <label>Title:</label>
          <ErrorMessage name="title" component="span"></ErrorMessage>
          <Field
            id="inputForm"
            name="title"
            placeholder="Input the Title of Article"
          ></Field>

          <label>Post Content:</label>
          <ErrorMessage name="content" component="span"></ErrorMessage>
          <Field
            id="inputForm"
            name="content"
            placeholder="Type your content blog here..."
          ></Field>

          <label>Authored By: </label>
          <ErrorMessage name="author" component="span"></ErrorMessage>
          <Field
            id="inputForm"
            name="author"
            placeholder="Input your name ^_^"
          ></Field>

          <button type="submit">Create post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
