import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";


const Message = ({value,imgURL,id}) => {


    const {currentUser} = useContext(AuthContext)

    return(
        imgURL ?
                 <div className={`withimg a ${id != currentUser.uid?"":"not-owner" }`}>
                    <img src={imgURL} />
                    {value &&   <p className="message" >{value}</p>}
                 </div> 
                :
                <p className={`message ${id != currentUser.uid?"":"not-owner"} a `}>{value}</p>
    )
}


export default Message