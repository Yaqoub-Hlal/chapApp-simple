import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import "./login.css"


const Login = () => {

    const navigate = useNavigate()
    const[userEmail,setUserEmail] = useState("")
    const[userpassword,setUserPassword] = useState("")
    const [err,setErr] = useState(false)
    const handleSubmit = async (e) => {

        e.preventDefault()
        try{
            await signInWithEmailAndPassword(auth,userEmail,userpassword)
        }catch (error) {
            setErr(prev => !prev)
        }


        if(err){
        navigate("/")
        }
    }

    return(
        <div className="login">
            <div className="login-box">
                <div className="header">
                     <h3>mario chat</h3>
                     <p>login</p>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                <div className="user-inputs">
                    <input type="text" onChange={(e) => {setUserEmail(e.target.value)}} className="user-input" placeholder="Enter Your Email" />
                    <input type="password"onChange={(e) => {setUserPassword(e.target.value)}}  className="user-input" placeholder="Enter Your Password" />
                </div>
                <div className="login-button">
                    <button>login</button>
                </div>
                <div className="register-check">
                    <p>you don't have an account? <Link to="/singup">SignUp Now</Link></p>
                </div>
                </form>
                
                   { err && <div> Somthing Wrong With Your Email or Password
                    </div>
                    }
            </div>
        </div>
    )
} 



export default Login