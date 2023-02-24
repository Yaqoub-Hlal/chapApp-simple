import { sendEmailVerification, signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { auth } from "../firebase/firebase";


const EmailNotverifed = () => {

    const navigate = useNavigate()
    const [showBtn, setShowBtn] = useState(false)
    const {currentUser} = useContext(AuthContext)
    const sendAnotherEmail  = () => {
        sendEmailVerification(auth.currentUser)
        setShowBtn(true)
    }
    const backToSignUp = () => {
        signOut(auth)
        navigate("/singup")
    }
    const emailCheck = () => {
        navigate("/")
    }

    return(
        <div style={{display:"flex",alignItems:"center",flexDirection:"column", padding:"10px", gap:"10px"}}>
            <h1>Please Verified Your Email: {currentUser.email}</h1>
            <button onClick={sendAnotherEmail}>Send Another Email</button>
            <button onClick={backToSignUp}>SignUp With Another Email</button>
            <button onClick={emailCheck}>Check Now</button>
        </div>
)
}

export default EmailNotverifed