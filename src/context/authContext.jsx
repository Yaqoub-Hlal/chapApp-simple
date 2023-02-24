import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React, {createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";


export const AuthContext = createContext(  )

export const AuthContextProvider = ( {children}) => {

    const [currentUser,setCurrentUser] = React.useState("")
    const [users, setUsers] = useState("")
    const [userToChat, setUserToChat] = useState({})
    
    const useCurentUser = () => {
        useEffect(  () => {
            const unSub = onAuthStateChanged(auth, (user) => {
                 setCurrentUser(user)
             })
     
             return () => {unSub()}
         },[])

         return currentUser
    }

    const useUser = () => {

        useEffect(() => {
            
            const getData = async () => {   
            const unsub = onSnapshot(doc(db,"userChats", currentUser.uid), (doc) => {
                const propertyNames = Object.entries(doc.data());
                setUsers(propertyNames)
            })
        }

        if(currentUser){
            getData()
        }else{
            setUsers([])
        }
         
    },[currentUser?.uid])
    
    return users
}
     

    return(
       
        <AuthContext.Provider
        value={
            {
                currentUser:useCurentUser(),
                users: useUser(),
                userToChat,
                setUserToChat

            }
        }
        >
            {children}
        </AuthContext.Provider>
    )
}