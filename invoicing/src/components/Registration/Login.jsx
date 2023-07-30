
import "./Login.css";

import { Formik,Field,Form,ErrorMessage,useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {v4 as uuidv4} from 'uuid';
import Navbar from "../NavBar/Navbar";

function Login() {
    const navigate=useNavigate()

    const initialvalues= {
        username:"",
        password:""
    }

    const validationschema=Yup.object({
        username:Yup.string(),
        password:Yup.string().required("Password is required!")
    })

    const [responseData,setResponseData]=useState({
        responseText:"",
        responseClass:""
    })

    function onSubmit(values,{resetForm}){
        axios.post("http://127.0.0.1:8000/api/users/signin",values)
        .then((response)=>{
            localStorage.setItem("access_token",response.data.access_token)
            setResponseData({
                responseText:"Login Successful!",
                responseClass:"alert alert-success"
            });
            setTimeout(()=>{
                navigate("/",true)
            },1000);
        },
        (error)=>{
            setResponseData({
                responseText:"Invalid Username or Password!!",
                responseClass:"alert alert-danger"
            });
        })
        .catch((error)=>{
            console.group(error)
        })
        resetForm()

        

    }

    return (
        <div>
            <Navbar></Navbar>

            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div style={{background:"#fff",padding: "30px 40px",borderRadius: "10 px",marginTop: "80px"}}>
                            <h1>Log In</h1>
                            <div className={responseData.responseClass} role="alert">{responseData.responseText}</div>
                            <hr />
                            <Formik initialValues={initialvalues} validationSchema={validationschema} validateOnMount onSubmit={onSubmit}>
                                {(formik)=>{
                                    return(
                                        <Form>
                                            <div className="form-group">
                                                <label htmlFor="username">Username</label>
                                                <Field type="text" name="username" className="form-control"/>
                                                <ErrorMessage name="username">
                                                    {(errormessage) => (<small className="text-danger">{errormessage}</small>)}
                                                </ErrorMessage>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <Field name="password" type="password" className="form-control"/>
                                                <ErrorMessage name="password">{(errormessage)=>(<small className="text-danger">{errormessage}</small>)}</ErrorMessage>
                                            </div>
                                            <input type="submit" value="Login" disabled={!formik.isValid}/>
                                        </Form>
                                    )
                                }}

                            </Formik>
                            <br />
                            <p className="text-center">
                            New user? <Link to="/register">Click here</Link>
                            </p>
                            <p className="text-center">
                            Forget Password? <Link to="/forgetpassword">Click here</Link>
                            </p>


                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>







        </div>
    )

}



export default Login