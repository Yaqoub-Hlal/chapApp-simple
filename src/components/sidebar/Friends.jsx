import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { db } from "../../firebase/firebase";
import "./sidebar.css"

const Friends = () => {



    const {userToChat,currentUser,users,setUserToChat} = useContext(AuthContext)


    useEffect(() => {
        setUserToChat("")
    },[currentUser])


    const selectUser = (u,id) => {
        if(userToChat.chatId == id){
            setUserToChat("")
        }else{
            setUserToChat({
                chatId:id,
                ...u
            })
        }
    }

    return(
        <div className="friends">
            <div className="header">
                <p>Friends</p>
            </div>
            {
                users && users.map(user => (
                <div className="user" key={user[0]} onClick={() => selectUser(user[1].userInfo,user[0])}>
                    <img src={user[1].userInfo.photoURL} />
                    <div className="user-info">
                        <p>{user[1].userInfo.displayName}</p>
                    </div>
                </div>
                ))
            }
        </div>
    )
}


export default Friends