import { useState } from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import "./App.css";
import Crop from "./Component/Crop/Crop";
import Login from "./Component/loginPage/login";
import Nav from "./Component/nav/Nav";
import Signup from "./Component/signUp/signup";
import CropInfo from "./Container/CropInfo/CropInfo";
import Cropdec from "./Component/Cropdec/Cropdec";
import UploadShortTerm from "./Component/UploadCropDetails/uploadShortTerm";
import UploadLongTerm from "./Component/UploadCropDetails/uploadLongTerm";
import UploadScheme from "./Component/UploadCropDetails/uploadScheme";
import UploadArticle from "./Component/UploadCropDetails/uploadArticle";
import UploadNews from "./Component/UploadCropDetails/uploadNews";
import Cropmarket from "./Container/CropMarket/Cropmarket";
import News_sg from "./Component/News/News_sg";
import Scheme from "./Component/Scheme/Scheme";
import OrderHistoryCard from "./Component/orderTab/OrderHistoryCard";

import { useUserAuth } from "./context/UserAuthContext";

import { AddMarketplace } from "./Component/UploadCropDetails/AddMarketplace";
import Fertilizermarket from "./Container/Fertilizermarket/Fertilizermarket";
import AdminCropmarket from "./Component/AdminCropmarket/AdminCropmarket";
import AdminFertilizermarket from "./Component/AdminFertilizermarket/AdminFertilizermarket";
import MakeaDeal from "./Component/MakeaDeal/MakeaDeal";
import Done from "./Component/Done/Done";
import BuyDone from "./Component/BuyDone/BuyDone";
import Cancel from "./Component/BuyDone/Cancel";
import DashBoardCrop from "./Component/DashBoardCrop/DashBoardCrop";
import { Provider } from "react-redux";
import Profile from "./Component/Profile/Profile";
import ForgotPassword from "./Component/ForgotPassword/ForgotPassword";

import Admindashboard from "./Component/AdminDashboard/Admindashboard";
import CrowdSourcing from "./Component/CrowdSourcing/CrowdSourcing";
import Addcrop from "./Component/AddCrop/Addcrop";
import Addpendingcrop from "./Component/editpendingcrop/Addcrop"
import Editpendingcrop from "./Component/editpendingcrop/EditPendingCrop";

function App() {
  const { user } = useUserAuth();
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/crowdsourcing" exact element={<Addcrop />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/forgotpassword" exact element={<ForgotPassword />} />
          <Route path="/cropdec/:id" exact element={<Cropdec />} />
          
          {user && (
            <Route
              path="/uploadshortterm"
              exact
              element={<UploadShortTerm />}
            />
          )}
          {user && (
            <Route path="/uploadlongterm" exact element={<UploadLongTerm />} />
          )}
          {user && (
            <Route path="/uploadscheme" exact element={<UploadScheme />} />
          )}
          {user && (
            <Route path="/uploadarticle" exact element={<UploadArticle />} />
          )}
          {user && <Route path="/uploadnews" exact element={<UploadNews />} />}
          {user && <Route path="/news" exact element={<News_sg />} />}
          {/* {user && <Route path="/news" exact element={<Admindashboard />} />} */}
          {user && <Route path="/sucess/:id" exact element={<Done />} />}
          {user && <Route path="/buysucess" exact element={<BuyDone />} />}
          {user && <Route path="/cancel" exact element={<Cancel />} />}
          {user && <Route path="/orders" exact element={<OrderHistoryCard />} />}
          {user && <Route path="/editpendingcrop/:id" exact element={<Editpendingcrop />} />}
          {user && <Route path="/scheme" exact element={<Scheme />} />}
          {user && (
            <Route
              path="/cropmarket"
              exact
              element={
                user.user_type == "Market" ? (
                  <AdminCropmarket />
                ) : (
                  <Cropmarket />
                )
              }
            />
          )}
          {user && (
            <Route
              path="/fertilizermarket"
              exact
              element={
                user.user_type == "Market" ? (
                  <AdminFertilizermarket />
                ) : (
                  <Fertilizermarket />
                )
              }
            />
          )}
          {user && (
            <Route
              path="/CropInfo"
              element={
                user.user_type == "Market" ? <DashBoardCrop /> :user.user_type == "Admin"?<Admindashboard/>:<CropInfo />
              }
            ></Route>
          )}
          <Route path="/" element={<Navigate to="/Login" />} />
          <Route path="*" element={<Login />} />
        </Routes>

        {/* {user ? (<div><Signup/> </div>):(<div>     <Nav />
     <CropInfo /></div>)} */}
      </div>
    </BrowserRouter>
  );
}

export default App;
