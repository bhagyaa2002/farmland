// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import "./App.css";
// import Cropdec from "./Component/Cropdec/Cropdec";
// import Login from "./Component/loginPage/login";
// import News_sg from "./Component/News/News_sg";
// import OrderHistoryCard from "./Component/orderTab/OrderHistoryCard";
// import Scheme from "./Component/Scheme/Scheme";
// import Signup from "./Component/signUp/signup";
// import UploadShortTerm from "./Component/UploadCropDetails/uploadShortTerm";
// import CropInfo from "./Container/CropInfo/CropInfo";
// import Cropmarket from "./Container/CropMarket/Cropmarket";

// import { useUserAuth } from "./context/UserAuthContext";

// import AdminCropmarket from "./Component/AdminCropmarket/AdminCropmarket";
// import AdminFertilizermarket from "./Component/AdminFertilizermarket/AdminFertilizermarket";
// import BuyDone from "./Component/BuyDone/BuyDone";
// import Cancel from "./Component/BuyDone/Cancel";
// import DashBoardCrop from "./Component/DashBoardCrop/DashBoardCrop";
// import Done from "./Component/Done/Done";
// import ForgotPassword from "./Component/ForgotPassword/ForgotPassword";
// import Fertilizermarket from "./Container/Fertilizermarket/Fertilizermarket";

// import Addcrop from "./Component/AddCrop/Addcrop";
// import Admindashboard from "./Component/AdminDashboard/Admindashboard";
// import ArticleForm from "./Component/ArticleForm/ArticleForm";
// import Editpendingcrop from "./Component/editpendingcrop/EditPendingCrop";
// import Footer from "./Component/Footer/Footer";
// import NewsForm from "./Component/NewsForm/NewsForm";
// import SchemeForm from "./Component/SchemeForm/SchemeForm";
// function App() {
//   const { user } = useUserAuth();
  
//   return (
//     <BrowserRouter>
//       <div className="App">
//         <Routes>
//           <Route path="/crowdsourcing" exact element={<Addcrop />} />
//           {/* <Route path="/uploadscheme" exact element={<SchemeForm />} /> */}
//           {/* <Route path="/uploadnews" exact element={<NewsForm />} /> */}
//           {/* <Route path="/uploadarticle" exact element={<ArticleForm />} /> */}
//           <Route path="/login" exact element={<Login />} />
//           <Route path="/signup" exact element={<Signup />} />
//           <Route path="/forgotpassword" exact element={<ForgotPassword />} />
//           <Route path="/cropdec/:id" exact element={<Cropdec />} />
          
//           {user && (
//             <Route
//               path="/uploadshortterm"
//               exact
//               element={<UploadShortTerm />}
//             />
//           )}
//           {/* {user && (
//             <Route path="/uploadlongterm" exact element={<UploadLongTerm />} />
//           )}
//           {user && (
//             <Route path="/uploadscheme" exact element={<UploadScheme />} />
//           )}
//           {user && (
//             <Route path="/uploadarticle" exact element={<UploadArticle />} />
//           )} */}
//           {/* {user && <Route path="/uploadnews" exact element={<UploadNews />} />} */}
//           {user && <Route path="/news" exact element={<News_sg />} />}
//           {/* {user && <Route path="/news" exact element={<Admindashboard />} />} */}
//           {user && <Route path="/sucess/:id" exact element={<Done />} />}
//           {user && <Route path="/buysucess" exact element={<BuyDone />} />}
//           {user && <Route path="/cancel" exact element={<Cancel />} />}
//           {user && <Route path="/orders" exact element={<OrderHistoryCard />} />}
//           {user && <Route path="/editpendingcrop/:id" exact element={<Editpendingcrop />} />}
//           {user && <Route path="/scheme" exact element={<Scheme />} />}
//           {user && (
//             <Route
//               path="/cropmarket"
//               exact
//               element={
//                 user.user_type == "Market" ? (
//                   <AdminCropmarket />
//                 ) : (
//                   <Cropmarket />
//                 )
//               }
//             />
//           )}
//           {user && (
//             <Route
//               path="/fertilizermarket"
//               exact
//               element={
//                 user.user_type == "Market" ? (
//                   <AdminFertilizermarket />
//                 ) : (
//                   <Fertilizermarket />
//                 )
//               }
//             />
//           )}
//           {user && (
//             <Route
//               path="/CropInfo"
//               element={
//                 user.user_type == "Market" ? <DashBoardCrop /> :user.user_type == "Admin"?<Admindashboard/>:<CropInfo />
//               }
//             ></Route>
//           )}

//           {user && user.user_type == "Admin" &&(         
//              <Route path="/uploadscheme" exact element={<SchemeForm />} />)}
//           {user && user.user_type == "Admin" &&(         
//              <Route path="/uploadnews" exact element={<NewsForm />} />)}
//           {user && user.user_type == "Admin" &&(         
//              <Route path="/uploadarticle" exact element={<ArticleForm />} />)}
//           <Route path="/" element={<Navigate to="/Login" />} />
//           <Route path="*" element={<Login />} />
//         </Routes>

//         {/* {user ? (<div><Signup/> </div>):(<div>     <Nav />
//      <CropInfo /></div>)} */}
//       </div>
     
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Cropdec from "./Component/Cropdec/Cropdec";
import Login from "./Component/loginPage/login";
import News_sg from "./Component/News/News_sg";
import OrderHistoryCard from "./Component/orderTab/OrderHistoryCard";
import Scheme from "./Component/Scheme/Scheme";
import Signup from "./Component/signUp/signup";
import UploadShortTerm from "./Component/UploadCropDetails/uploadShortTerm";
import CropInfo from "./Container/CropInfo/CropInfo";
import Cropmarket from "./Container/CropMarket/Cropmarket";

import { useUserAuth } from "./context/UserAuthContext";

import AdminCropmarket from "./Component/AdminCropmarket/AdminCropmarket";
import AdminFertilizermarket from "./Component/AdminFertilizermarket/AdminFertilizermarket";
import BuyDone from "./Component/BuyDone/BuyDone";
import Cancel from "./Component/BuyDone/Cancel";
import DashBoardCrop from "./Component/DashBoardCrop/DashBoardCrop";
import Done from "./Component/Done/Done";
import ForgotPassword from "./Component/ForgotPassword/ForgotPassword";
import Fertilizermarket from "./Container/Fertilizermarket/Fertilizermarket";

import Addcrop from "./Component/AddCrop/Addcrop";
import Admindashboard from "./Component/AdminDashboard/Admindashboard";
import ArticleForm from "./Component/ArticleForm/ArticleForm";
import Editpendingcrop from "./Component/editpendingcrop/EditPendingCrop";
// import Footer from "./Component/Footer/Footer";
import NewsForm from "./Component/NewsForm/NewsForm";
import SchemeForm from "./Component/SchemeForm/SchemeForm";

function App() {
  const { user } = useUserAuth();

  return (
    <BrowserRouter>
      <div
        className="App"
        style={{
          // backgroundColor: "#eae8e1",
          backgroundColor:"#F8F8F8",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Routes>
          <Route path="/crowdsourcing" exact element={<Addcrop />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/forgotpassword" exact element={<ForgotPassword />} />
          <Route path="/cropdec/:id" exact element={<Cropdec />} />

          {user && (
            <Route path="/uploadshortterm" exact element={<UploadShortTerm />} />
          )}
          {user && <Route path="/news" exact element={<News_sg />} />}
          {user && <Route path="/sucess/:id" exact element={<Done />} />}
          {user && <Route path="/buysucess" exact element={<BuyDone />} />}
          {user && <Route path="/cancel" exact element={<Cancel />} />}
          {user && (
            <Route path="/orders" exact element={<OrderHistoryCard />} />
          )}
          {user && (
            <Route
              path="/editpendingcrop/:id"
              exact
              element={<Editpendingcrop />}
            />
          )}
          {user && <Route path="/scheme" exact element={<Scheme />} />}
          {user && (
            <Route
              path="/cropmarket"
              exact
              element={
                user.user_type === "Market" ? (
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
                user.user_type === "Market" ? (
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
                user.user_type === "Market" ? (
                  <DashBoardCrop />
                ) : user.user_type === "Admin" ? (
                  <Admindashboard />
                ) : (
                  <CropInfo />
                )
              }
            />
          )}

          {user && user.user_type === "Admin" && (
            <Route path="/uploadscheme" exact element={<SchemeForm />} />
          )}
          {user && user.user_type === "Admin" && (
            <Route path="/uploadnews" exact element={<NewsForm />} />
          )}
          {user && user.user_type === "Admin" && (
            <Route path="/uploadarticle" exact element={<ArticleForm />} />
          )}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Login />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
