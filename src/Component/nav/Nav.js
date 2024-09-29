import React, { useState, useEffect } from 'react';
import "./Navstyle.scss";
import { useNavigate } from "react-router";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { Icon } from "@iconify/react";
// import searchOutlined from '@iconify/icons-ant-design/search-outlined';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { auth } from "../../config/firebase";
import {
  BrowserRouter,
  Route,
  Navigate,
  Routes,
  useLocation,
} from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";

function Nav() {
  let location = useLocation().pathname;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, getCrop, logout, setUser,getCartItemsLength, cartItemLength } = useUserAuth();
  const [cartLength, setCartLength] = useState(-1);


  useEffect(() => {
    const fetchCartItemsLength = async () => {
      const itemLength= await getCartItemsLength(user.email)
      setCartLength(itemLength);
    };

    fetchCartItemsLength();
  }, []);

  const Logout = async () => {
    await logout();
    await setUser(false);
    navigate("/login");
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  return (
    <div className="nav">
      <div className="navlogo">
        <h2>
          Farm<span>Land</span>
        </h2>
      </div>
      <div className="navlink">
        <div
          onClick={() => {
            getCrop();
            navigate("/CropInfo");
          }}
          className={location.match("/CropInfo") ? "navitemon" : "navitem"}
        >
          <h3>Home</h3> {location.match("/CropInfo") ? <hr /> : <div />}{" "}
        </div>
        <div
          onClick={() => {
            navigate("/cropmarket");
          }}
          className={location.match("/cropmarket") ? "navitemon" : "navitem"}
        >
          <h3>CropMarket</h3> {location.match("/cropmarket") ? <hr /> : <div />}
        </div>
        <div
          onClick={() => {
            navigate("/fertilizermarket");
          }}
          className={
            location.match("/fertilizermarket") ? "navitemon" : "navitem"
          }
        >
          <h3>FertilizerMarket</h3>{" "}
          {location.match("/fertilizermarket") ? <hr /> : <div />}
        </div>
       
        <div
          onClick={() => {
            navigate("/scheme");
          }}
          className={location.match("/scheme") ? "navitemon" : "navitem"}
        >
          <h3>Schemes</h3> {location.match("/scheme") ? <hr /> : <div />}
        </div>
        <div
          onClick={() => {
            navigate("/news");
          }}
          className={location.match("/news") ? "navitemon" : "navitem"}
        >
          <h3>Articles</h3> {location.match("/news") ? <hr /> : <div />}
        </div>
        {user.user_type == "Farmer" && (
        <div onClick={
        ()=>{
          navigate("/orders");
        } 
      } className={location.match("/orders") ? "navitemon" : "navitem"}>
      <h3>Orders</h3>{location.match("/orders") ? <hr /> : <div />}
      </div>)}
      
      </div>
      
      


      <div className="searchbar">
        <LocationOnIcon sx={{ color: "#ffffff" }} />
        <h3>
        {capitalizeFirstLetter(user.city)}, {capitalizeFirstLetter(user.location)}
        </h3>
      </div>

      {user.user_type == "Farmer" && (
      <div onClick={
        ()=>{
          navigate("/cart");
        }} className="cartIcon">
          
      <ShoppingCartIcon sx={{fontSize: 30, color: "#fff",position:"relative",top:"15px"}}/>
      {location.match("/cart") ? <hr style={{color:"white", position:"relative",top:"10px",height:"4px", backgroundColor:"white"}}/> : <div />}
      {/* <p style={{position:"relative",top:"-25px",left:"20px", fontSize:"12px",color:"white", backgroundColor:"red", height:"20px",width:"20px",  borderRadius:"20px",paddingBottom:"20px"}}>10</p>
       */}
       <p style={{
    position: "relative",
    top: "-25px",
    left: "20px",
    fontSize: "10px", // Reduced font size
    color: "white",
    backgroundColor: "red",
    height: "16px", // Circle height
    width: "16px", // Circle width
    borderRadius: "50%", // Make it a circle
    display: "flex", // Use flexbox for centering
    alignItems: "center", // Center vertically
    justifyContent: "center", // Center horizontally
    padding: "0" // Remove padding
}}>
    {cartItemLength}
</p>

      </div>)}


      

      <div className="profile">
        <h3>{capitalizeFirstLetter(user.user_name)}</h3>
        <div className="profileicon" onClick={() => setOpen(!open)}>
          <AccountCircleOutlinedIcon
            sx={{ fontSize: 40, color: "#fff", paddingLeft: 1 }}
          />
        </div>
        {open && (
          <div className="profiledrop">
            <div
              onClick={() => {
                navigate("/crowdsourcing");
              }}
            >
              {" "}
              <h3>Crowd Souring</h3>
            </div>


            {user.user_type == "Admin" && (<div
              onClick={() => {
                navigate("/uploadnews");
              }}
            >
              {" "}
              <h3>Upload News</h3>
            </div>)
            }

            {user.user_type == "Admin" && (<div
              onClick={() => {
                navigate("/uploadarticle");
              }}
            >
              {" "}
              <h3>Upload Article</h3>
            </div>)}


            {user.user_type == "Admin" && (<div
              onClick={() => {
                navigate("/uploadscheme");
              }}
            >
              {" "}
              <h3>Upload Scheme</h3>
            </div>)}


            <hr></hr>
            <div onClick={Logout}>
              <h3>LogOut</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
