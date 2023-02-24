import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../../firebase/firebase";
import {AuthContext} from "../../context/authContext"
import "./sidebar.css"
import { useNavigate } from "react-router-dom";

const Userlogin = () => {

    const {currentUser} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSignOut = ( ) => {
        signOut(auth)
        navigate("/")
    }

    return(
        <div className="user-login">
            <div className="left"><h3>mario chat</h3></div>
            <div className="right">

                <div className="image">
                    <img src={currentUser?.photoURL} />
                    <p>{currentUser?.displayName}</p>
                </div>
                <button onClick={handleSignOut}>logout</button>
            </div>
        </div>
    )
}


export default Userlogin