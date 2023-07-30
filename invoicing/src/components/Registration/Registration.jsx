import "../NavBar/Navbar.css";

import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../NavBar/Navbar";






function RegistrationPage() {
    const navigate=useNavigate()

    const initialvalues = {
        first_name: "",
        last_name: "",
        email: "",
        username:"",
        phone: "",
        password: "",
        confirmPassword: ""
    }

    const validationschema = Yup.object({
        first_name: Yup.string("Please Enter a Valid name!!").required("First Name is required!!"),
        last_name: Yup.string("Please Enter a Valid Last Name!!").required("Last Name is required!!"),
        email: Yup.string().email("Please Enter a Valid Email!").required("Email is required!"),
        username:Yup.string(),
        phone: Yup.number("Enter a valid Mobile Number!").required("Number is Required!!"),
        password: Yup.string().required("Password is required").min(6, "Password must contain 6 Minimum charecters").matches(

            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
        confirmPassword: Yup.string().required().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    })


    const [responseData, setResponseData] = useState({
        responseText: "",
        responseClass: ""
    })
    const onSubmit = (values, { resetForm }) => {

        axios.post("http://127.0.0.1:8000/api/users/signup", values)
            .then((response) => {
                setResponseData({
                    responseText: "Register Successful",
                    responseClass: "alert alert-success"
                });
                setTimeout(()=>{
                    navigate("/login",true)
                },1000);

                
                
                

            },
                (error) => {
                    setResponseData({
                        responseText: "Register Failed!",
                        responseClass: "alert alert-danger"
                    })
                }
            )
        resetForm()
        console.log(values)





    }




    return (
        <div>
          <Navbar></Navbar>

            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">

                        <div style={{
                            background: "#fff",
                            padding: "30px 40px",
                            borderRadius: "10 px",
                            marginTop: "80px"
                        }}>
                            <div className={responseData.responseClass} role="alert">{responseData.responseText}</div>
                            <h2>Register</h2>
                            <hr />
                            <Formik initialValues={initialvalues} validationSchema={validationschema} validateOnMount onSubmit={onSubmit} >
                                {(formik) => {
                                    return (
                                        <Form>
                                            <div className="form-group">
                                                <label htmlFor="">First Name</label>
                                                <Field type="text" name="first_name" className={formik.errors.first_name &&
                                                    formik.touched.first_name ? "form-control is-invalid" : "form-control"} />
                                                <ErrorMessage name="first_name">
                                                    {(errormessage) => (<small className="text-danger">{errormessage}</small>)}
                                                </ErrorMessage>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Last Name</label>
                                                <Field type="text" name="last_name" className={formik.errors.last_name &&
                                                    formik.touched.last_name ? "form-control is-invalid" : "form-control"} />
                                                <ErrorMessage name="last_name">
                                                    {(errormessage) => (<small className="text-danger">{errormessage}</small>)}
                                                </ErrorMessage>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">E-Mail</label>
                                                <Field type="email" name="email" className={formik.errors.email &&
                                                    formik.touched.email ? "form-control is-invalid" : "form-control"} />
                                                <ErrorMessage name="email">
                                                    {(errormessage) => (<small className="text-danger">{errormessage}</small>)}
                                                </ErrorMessage>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Username</label>
                                                <Field type="text" name="username" className={formik.errors.username && formik.touched.username ?
                                                "form-control is-invalid" :"form-control"}/>
                                                <ErrorMessage name="username">{(errormessage)=>(<small className="text-danger">{errormessage}</small>)}</ErrorMessage>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Phone No.</label>
                                                <Field type="mobile" name="phone" className={formik.errors.phone &&
                                                    formik.touched.phone ? "form-control is-invalid" : "form-control"} />
                                                <ErrorMessage name="mobile">
                                                    {(errormessage) => (<small className="text-danger">{errormessage}</small>)}
                                                </ErrorMessage>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Password</label>
                                                <Field type="password" name="password" className={formik.errors.password &&
                                                    formik.touched.password ? "form-control is-invalid" : "form-control"} />
                                                <ErrorMessage name="password">
                                                    {(errormessage) => (<small className="text-danger">{errormessage}</small>)}
                                                </ErrorMessage>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Confirm Password</label>
                                                <Field type="password" name="confirmPassword" className={formik.errors.confirmPassword &&
                                                    formik.touched.confirmPassword ? "form-control is-invalid" : "form-control"} />
                                                <ErrorMessage name="confirmPassword">
                                                    {(errormessage) => (<small className="text-danger">{errormessage}</small>)}
                                                </ErrorMessage>
                                            </div>
                                            <input type="submit" value="Register" disabled={!formik.isValid} className="btn btn-primary btn-block" />
                                        </Form>
                                    )
                                }}

                            </Formik>


                            <br />
                            <p className="text-center">
                                Already Have an Account? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default RegistrationPage;