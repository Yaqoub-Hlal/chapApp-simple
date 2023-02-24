import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import {BsImage} from "react-icons/bs"
import React, { useState } from "react";
import { auth, storage,db } from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore"; 
import {
Link, useNavigate
  } from "react-router-dom";
import "./signup.css"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


const SingUp = () => {

    const [userName,setUserName] = useState("")
    const [userEmail,setUserEmail] = useState("")
    const [userPassword,setUserPassword] = useState("")
    const [userimage,setUserimage] = useState("")
    const navigate = useNavigate()

    // HANDLE SUBMIT CLICK===============================
    const handleSubmit = async (e) =>{
        e.preventDefault()
        
        const storageRef = ref(storage, `images/${userName}`);
        const uploadTask = uploadBytesResumable(storageRef,userimage);
        let imgurl = ""

        if(userimage){
            uploadTask.on(
                (error) => {
                  console.log(error)
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        imgurl = downloadURL
                    });
                }
                );
        }

        try{
            const newUser = await createUserWithEmailAndPassword(auth, userEmail , userPassword)

            await updateProfile(auth.currentUser, {
                displayName: userName,
                photoURL: imgurl
            })
            
            await setDoc(doc(db,"users",newUser.user.uid), {
                uid: newUser.user.uid,
                displayName: userName,
                email: userEmail,
                photoURL: imgurl,
                password: userPassword,
                createDate: new Date(),
            })
            await setDoc(doc(db,"userChats", newUser.user.uid),{})
        } catch (error) {
            console.log(error)
        }

        sendEmailVerification(auth.currentUser)
        navigate("/")



    } 



    return(
        <div className="login">
            <div className="login-box">
                <div className="header">
                     <h3>mario chat</h3>
                     <p>SignUp</p>
                </div>
                <form onSubmit={handleSubmit}>
                <div className="user-inputs">
                    <input type="text"  onChange={(e) => setUserName(e.target.value)}  className="user-input" placeholder="Enter Your Name" />
                    <input type="text" onChange={(e) => setUserEmail(e.target.value)}  className="user-input" placeholder="Enter Your Email" />
                    <input type="password" onChange={(e) => setUserPassword(e.target.value)} className="user-input" placeholder="Enter Your Password" />
                    <label htmlFor="image">Choose Image < BsImage /></label>
                    <input id="image" type="file" style={{display:"none"}} onChange={(e) => setUserimage(e.target.files[0])} className="user-input" placeholder="Enter Your Password" />
                </div>
                <div className="login-button">
                    <button>SingUp</button>
                </div>
                <div className="register-check">
                    <p>you have an account? <Link to="/login">Login Now</Link></p>
                </div>
                </form>
            </div>
        </div>
    )
} 



export default SingUp