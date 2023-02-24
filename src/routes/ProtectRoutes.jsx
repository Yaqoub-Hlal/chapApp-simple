import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";




export const ProtectHomeRoute = ({children, user}) => {
    

    if(user){
        return  children
    }
    else {
        return <Navigate to="/login" replace={true} />
    }

}


export const ProtectLoginRoute = ({children, user}) => {
    

    if(user){
        return <Navigate to="/verificationemail" />
    }
    else {
        return  children
    }

}

export const VerifiedEmailProtect = ({children, user}) => {

    if(!user) {
        return <Navigate to="/login" replace={true} />
    }
    else if(user.emailVerified){
        return <Navigate to="/" replace={true} />
    }
    else {
        return  children
    }

}



