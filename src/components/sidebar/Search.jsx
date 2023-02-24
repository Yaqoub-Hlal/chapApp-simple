import React, { useContext, useState } from "react";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import {db} from "../../firebase/firebase"
import "./sidebar.css"
import { AuthContext } from "../../context/authContext";

const Search = () => {

    const [searchValue, setSearchValue] = useState("")
    const [userData, setUserData] = useState("")
    const {currentUser} = useContext(AuthContext)

    const handleUserClick = async () => {
        
        const combinedId = currentUser.uid + userData.uid
        
        const a = await getDoc(doc(db,"chats",combinedId))
        
        if(!a.exists()){
          await setDoc(doc(db,"chats",combinedId),{messages:[]})
        }

        await updateDoc(doc(db,'userChats',currentUser.uid), {
            [combinedId + ".userInfo"]:{
                displayName:userData.displayName,
                photoURL:userData.photoURL,
                email:userData.email
            },
            [combinedId+".date"]:{
                timestamp: serverTimestamp()
            }
        })
        await updateDoc(doc(db,'userChats',userData.uid), {
            [combinedId + ".userInfo"]:{
                displayName:currentUser.displayName,
                photoURL:currentUser.photoURL,
                email:currentUser.email
            },
            [combinedId+".date"]:{
                timestamp: serverTimestamp()

            }
        })
    
        setSearchValue("")
        setUserData("")
    
    
    }


    {
        
    }






    const handleSearch = async (e) => {
        setSearchValue(e.target.value)
        var s = e.target.value
        const usersRef = collection(db,'users')
        const q =  query(usersRef,where("displayName","==",s))
        try{
            const querySnapshot = await getDocs(q);
            if(!querySnapshot.empty){
                querySnapshot.forEach(each => {   
                    setUserData({id:each.id, ...each.data()})
                })}else if(querySnapshot.empty && !!userData) {
                    setUserData("")
                }
            }
        catch (err) {
            console.log(err)
        }
  
    }



    return(
        <div className="search">
            <input
            type="text"
            placeholder="Find Your Friend"
            onChange={(e) => handleSearch(e)}
            value={searchValue}
            />
            {
                userData &&
            <div className="user" key={userData.id} onClick={handleUserClick}>
                <img src={userData.photoURL} />
                <div className="user-info">
                    <p>{userData.displayName}</p>
                </div>
            </div>
            }
        </div>
    )
}


export default Search