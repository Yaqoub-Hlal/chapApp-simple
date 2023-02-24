import React, { useContext, useEffect, useRef, useState } from "react";
import "./chat.css"
import { GoDeviceCameraVideo } from "react-icons/go";
import { HiUserAdd } from "react-icons/hi";
import {SlOptions} from "react-icons/sl";
import {AiOutlineLink} from "react-icons/ai";
import {MdOutlinePermMedia} from "react-icons/md";
import { arrayUnion, doc, onSnapshot, Timestamp, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase/firebase";
import { AuthContext } from "../../context/authContext";
import Message from "./Message";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


const Chat = () => {

    const {currentUser,userToChat} = useContext(AuthContext)
    const [message, setMessage] = useState([])
    const [text,setText] = useState("")
    const [img,setImage] = useState("")
    

    useEffect(() => {
 
       if(userToChat.chatId){
        const unsub = onSnapshot(doc(db,"chats",userToChat.chatId), async (doc) => {
            setMessage(doc.data().messages)
        })
        return () => {unsub()}
       }else {
        setMessage([])

       }

    },[userToChat])

    const sendMessage =async () => {
 
        if(img) {
           let g = img
           setImage("")

        const storageRef = ref(storage, `${uuid()}`);
        const uploadTask = uploadBytesResumable(storageRef,g);
        let imgurl = ""
        uploadTask.on(
            (error) => {
                console.log(error)
                }, 
            () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                console.log(downloadURL)
                await updateDoc(doc(db, 'chats', userToChat.chatId), {
                    messages: arrayUnion({
                        imgURL: downloadURL ,
                        id:uuid(),
                        text,
                        senderId : currentUser.uid,
                        date: Timestamp.now()
                        
                    })
                })
            });
                }
                );
        
       


      
       }else if(text) {
        let t = text
        setText("")
        await updateDoc(doc(db, 'chats', userToChat.chatId), {
            messages: arrayUnion({
                id:uuid(),
                text:t,
                senderId : currentUser.uid,
                date: Timestamp.now()
                
            })
        })

       }

       
       document.getElementsByClassName("a")[document.getElementsByClassName("a").length - 1].scrollIntoView();
    }



    return (
        <div className="chat">

            <div className="chat-top">
                <p>{userToChat.displayName}</p>
                <div className="chat-options">
                    <GoDeviceCameraVideo  className="icon" />
                    <HiUserAdd  className="icon"/>
                    <SlOptions className="icon" />
                </div>
            </div>

            <div className="chat-body">
                {
                    message.map((each,index) => {
                        return <Message id={each.senderId}value={each.text} imgURL={each.imgURL} key={each.id}/>
                    })
                }
            </div>


                <div className="chat-message">
                    <input type="text" placeholder="Type Your Message..." value={text} onChange={(e) => {setText(e.target.value)}}/>
                    <div className="message-options">
                        <AiOutlineLink className="icon" />
                        <label htmlFor="img">
                        <MdOutlinePermMedia className="icon" />
                        </label>
                        <input type="file" id="img" style={{display:"none"}} onChange={(e) => {setImage(e.target.files[0])}}/>
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>

        </div>
    )
}



export default Chat