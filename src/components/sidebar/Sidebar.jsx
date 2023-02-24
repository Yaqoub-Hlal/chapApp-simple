import React from "react";
import Friends from "./Friends";
import Search from "./Search";
import "./sidebar.css"
import Userlogin from "./Userlogin";


const Sidebar = () => {

    return (
        <div className="sidebar">
            <Userlogin />
            <Search />
            <Friends />
        </div>
    )
}




export default Sidebar