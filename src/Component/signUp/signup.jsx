// import React, { useEffect, useState } from "react";
// import "./signup.css";
// import { useNavigate } from "react-router";
// import { FaAddressBook, FaUserAlt } from "react-icons/fa";
// import { BsFillTelephoneFill } from "react-icons/bs";
// import { AiFillLock } from "react-icons/ai";
// import { MdLocationPin } from "react-icons/md";
// import { MdEmail } from "react-icons/md";
// import fpng from "../../assets/image/fpng.png";
// import { FiAlertCircle } from "react-icons/fi";
// import {
//   Container,
//   Input,
//   InputAdornment,
//   IconButton,
//   Alert,
// } from "@mui/material";
// import { useUserAuth } from "../../context/UserAuthContext";
// import { MenuItem, Select } from "@mui/material";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

// export default function Signup() {
//   const navigate = useNavigate();

//   const Login = () => {
//     navigate("/login");
//   };
//   // const Cropinfo = () => {
//   //   navigate("/");
//   // };

//   const initialValues = {
//     user_type: "",
//     user_name: "",
//     phoneNo: "",
//     email: "",
//     password: "",
//     location: "",
//     shop: "",
//     city: "",
//   };
//   const [formValues, setFormValues] = useState(initialValues);
//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmit, setIsSubmit] = useState(false);
//   const { signUp, addUser, getLongTermCrops } = useUserAuth();
//   const [errorDisplay, setErrorDisplay] = useState(false);

//   const [selected, setSelected] = useState("Farmer");
//   const [value, setValue] = useState("");

  
//   const [isSelectVisible, setIsSelectVisible] = useState(false);

//   const menuItems = [
//     "Uttar Pradesh",
//     "Karnataka",
//     "Madhya Pradesh",
//     "Kerala",
//     "Gujarat",
//   ];

//   const handleInputChange = (e) => {
//     setValue(e.target.value);
//     setIsSelectVisible(false);
//   };

//   const handleSelectChange = (e) => {
//     setValue(e.target.value);
//   };

//   const handleInputClick = () => {
//     setIsSelectVisible(true);
//   };

//   const [values, setValues] = React.useState({
//     password: "",
//     showPassword: false,
//   });

//   const handleClickShowPassword = () => {
//     setValues({ ...values, showPassword: !values.showPassword });
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const handlePasswordChange = (prop) => (event) => {
//     setValues({ ...values, [prop]: event.target.value });
//     formValues.password = event.target.value;
//   };

//   formValues.user_type = selected;

//   const handleChangeRadio = (event) => {
//     // console.log(event.target.value);
//     setSelected(event.target.value);
//   };

//   const handleChange = (e) => {
//     if (errorDisplay) {
//       setErrorDisplay(false);
//     }
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//   formValues.location = value;

//   const errors = validate(formValues);
//   setFormErrors(errors);

//   // Set isSubmit only after validation
//   if (Object.keys(errors).length === 0) {
//     setIsSubmit(true);
//   } else {
//     setIsSubmit(false);
//   }




//     // e.preventDefault();
//     // formValues.location = value;
//     // setFormErrors(validate(formValues));


    
//     // if (Object.keys(formErrors).length === 0) {
//     //   console.log("line 115");
//     //   setIsSubmit(true);
//     // }
//     // if (formErrors.length === 0) {
//     //   setIsSubmit(true);
//     // }
//     // else{
//     //   setIsSubmit(false);
//     // }
//     if (document.getElementById("shop")) {
//       formValues.shop = document.getElementById("shop").value;
//     } else if (selected === "Farmer") {
//       formValues.shop = "";
//     }
//     //  console.log(formValues);
//     if (isSubmit) {
//       try {

//         //const a = await signUp(formValues.email, formValues.password);
//         console.log("line 133");
//        await addUser(formValues).then(a=>{
//         console.log("line 134",a);
//           if (a !== "success") {
//             setErrorDisplay(true);
//           } 
//           else {
//           console.log("line 141");
//             <Alert severity="success">Signup Succesful</Alert>
//           //   addUser(formValues);
//             navigate("/CropInfo");
//           }
//        })
          
        
//       } catch (err) {
//         console.log("line 149");
//       }
//     }
//   };

//   useEffect(() => {
//     //console.log(formErrors);
//     if (Object.keys(formErrors).length === 0 && isSubmit) {
//       // console.log(formValues);
//     }
//   }, [formErrors]);

//   const validate = (values) => {
//     const errors = {};
//    const regex = /^\d{10}$/;
//     if (!values.user_name) {
//       errors.user_name = "Username is required!";
//     }
//     // if (!values.phoneNo) {
//     //   errors.password = "Usernam/PhoneNo is required";
//     // }
//     if (!regex.test(values.phoneNo)) {
//       errors.phoneNo = "This is not a valid phone number!";
//     }
//     if (!values.password) {
//       errors.password = "Password is required!";
//     } else if (values.password.length < 4) {
//       errors.password = "Password must be more than 4 characters!";
//     } else if (values.password.length > 10) {
//       errors.password = "Password cannot exceed more than 10 characters!";
//     }
//     if (!values.city) {
//       errors.city = "City is required!";
//     }
//     if (!values.location) {
//       errors.location = "State is required!";
//     }
//     if (!values.email) {
//       errors.email = "Email is required!";
//     } else if (
//       !values.email.match(
//         /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//       )
//     ) {
//       errors.email = "Email is not valid!";
//     }
//    if(Object.keys(errors).length>0){
//     setIsSubmit(false);
//    }
//    else{
//     setIsSubmit(true);
//    }

//     return errors;
//   };

//   // function insertAfter(referenceNode, newNode) {
//   //   referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
//   // }

//   // function dynInput(rb) {
//   //   var ReactDOMServer = require("react-dom/server");
//   //   if (document.getElementById("raadio2").checked === true) {
//   //     var input = document.createElement("input");
//   //     input.type = "text";
//   //     input.placeholder = "Shop";
//   //     input.name = "text-837";
//   //     input.id = "shop";
//   //     input.required = "true";
//   //     input.value = formValues.shop;
//   //     var i = document.createElement("div");
//   //     i.className = "icon";
//   //     i.innerHTML = ReactDOMServer.renderToString(<FaAddressBook size={16} />);
//   //     var div = document.createElement("div");
//   //     div.id = rb.target.name + "div";
//   //     div.className = "input-field";
//   //     div.appendChild(i);
//   //     div.appendChild(input);
//   //     var div2 = document.getElementById("insertinputs");
//   //     insertAfter(div2, div);
//   //   }
//   //   if (
//   //     document.getElementById("raadio2").checked === false &&
//   //     document.getElementById(rb.target.name + "div")
//   //   ) {
//   //     document.getElementById(rb.target.name + "div").remove();
//   //   }

//   //   formValues.user_type = document.querySelector(
//   //     'input[name="rb"]:checked'
//   //   ).value;
//   // }

//   return (
//     <Container>
//       <div className="container"  style={{ height: "100vh", overflowY: "auto" }}>
//         <div className="panels-container">
//           <div className="panel left-panel">
//             <div className="content">
//               <h3>One of us ?</h3>
//               <p>
//                 We are Helping Farmer to produce there product and 24/7
//                 guildance to Farmers
//               </p>
//               <button
//                 className="btn transparent"
//                 id="sign-in-btn"
//                 onClick={Login}
//               >
//                 {" "}
//                 Log in
//               </button>
//             </div>
//             <img src={fpng} className="image" alt="fpng" />
//           </div>
//         </div>

//         <div className="forms-container">
//           <div className="signin-signup1">
//             <form
//               action="/signup"
//               method="POST"
//               className="sign-in-form"
//               name="myForm"
//               onSubmit={handleSubmit}
//             >
//               <h2 className="title">Sign up</h2>
//               {errorDisplay && (
//                 <Alert
//                   sx={{
//                     width: "380px",
//                     borderRadius: "55px",
//                     marginBottom: "20px",
//                   }}
//                   severity="error"
//                 >
//                   The requested email id already in use.
//                 </Alert>
//               )}
//               <div className="radio">
//                 <label>
//                   <input
//                     type="radio"
//                     name="rb"
//                     id="raadio"
//                     value="Farmer"
//                     // onChange={dynInput}
//                     onClick={handleChangeRadio}
//                     checked={selected === "Farmer"}
//                   />{" "}
//                   Farmer &nbsp;&nbsp;
//                   <input
//                     type="radio"
//                     name="rb"
//                     id="raadio2"
//                     value="Market"
//                     // onChange={dynInput}
//                     onClick={handleChangeRadio}
//                     checked={selected === "Market"}
//                   />{" "}
//                   Market owner
//                 </label>
//               </div>
              
//               <div className="input-field1">
//                 <div className="icon">
//                   <FaUserAlt size={16} />
//                 </div>
//                 <input
//                   type="text"
//                   value={formValues.user_name}
//                   name="user_name"
//                   placeholder="Full name"
//                   onChange={handleChange}
//                 />
//               </div>
//               {formValues.user_name.length >= 0 && formErrors.user_name ? (
//                 <>
//                 <div className="error-container">
//                   <FiAlertCircle size={16} color="red"/>
//                   <p className="error-message">{formErrors.user_name}</p>
//                 </div>
//               </>
                
//               ) : (
//                 ""
//               )}
              
//               <div className="input-field1">
//                 <div className="icon">
//                   <MdEmail size={19} />
//                 </div>
//                 <input
//                   type="text"
//                   value={formValues.email}
//                   name="email"
//                   placeholder="Email"
//                   onChange={handleChange}
//                 />
//               </div>
//               {formValues.email.length >= 0 && formErrors.email ? (
//                  <>
//                  <div className="error-container1">
//                    <FiAlertCircle size={16} color="red"/>
//                    <p className="error-message">{formErrors.email}</p>
//                  </div>
//                </>): ""}
//               <div className="input-field1">
//                 <div className="icon">
//                   <BsFillTelephoneFill size={16} />
//                 </div>
//                 <input
//                   type="tel"
//                   value={formValues.phoneNo}
//                   name="phoneNo"
//                   placeholder="Phone number"
//                   onChange={handleChange}
//                 />
//               </div>
//               {formValues.phoneNo.length >= 0 && formErrors.phoneNo? (
//                 <>
//                 <div className="error-container2">
//                   <FiAlertCircle size={16} color="red"/>
//                   <p className="error-message">{formErrors.phoneNo}</p>
//                 </div>
//               </>
               
//               ) : (
//                 ""
//               )}
            
//               <div className="input-field1">
//                 <div className="icon">
//                   <AiFillLock size={19} />
//                 </div>
//                 <Input
//                   type={values.showPassword ? "text" : "password"}
//                   onChange={handlePasswordChange("password")}
//                   value={values.password}
//                   placeholder="Password"
//                   disableUnderline
//                   endAdornment={
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={handleClickShowPassword}
//                         onMouseDown={handleMouseDownPassword}
//                       >
//                         {values.showPassword ? (
//                           <Visibility />
//                         ) : (
//                           <VisibilityOff />
//                         )}
//                       </IconButton>
//                     </InputAdornment>
//                   }
//                 />
//               </div>
//               {formValues.password.length >= 0  && formErrors.password? (
//                 <>
//                 <div className="error-container3">
//                   <FiAlertCircle size={16} color="red"/>
//                   <p className="error-message">{formErrors.password}</p>
//                 </div>
//               </>
//               ) : (
//                 ""
//               )}
//               <div className="input-field1">
//                 <div className="icon">
//                   <MdLocationPin size={19} />
//                 </div>
//                 <input
//                   type="text"
//                   name="city"
//                   value={formValues.city}
//                   placeholder="Enter your city"
//                   onChange={handleChange}
//                 />
//               </div>
//               {formValues.city.length >= 0 && formErrors.city? (
//                 <>
//                 <div className="error-container4">
//                   <FiAlertCircle size={16} color="red"/>
//                   <p className="error-message">{formErrors.city}</p>
//                 </div>
//               </>
//               ) : (
//                 ""
//               )}
//               <div className="input-field1">
//                 <div className="icon">
//                   <MdLocationPin size={19} />
//                 </div>
//                 <>
//                   {/* {!isSelectVisible && (

//                       <input
//                         type="text"
//                         name="city"
//                         placeholder="Enter your state"
//                         onChange={handleInputChange}
//                         onClick={handleInputClick}
//                       />
                  
//                   )}

//                   {isSelectVisible && ( */}
                   
//                       <Select
//                         onChange={handleSelectChange}
//                         className="select-box"
//                         name="state"
//                         variant="standard"
//                         value={value}
//                         placeholder="State"
//                         disableUnderline
//                         sx={{ fontWeight: 600 }}
//                       >
                        
//                         {menuItems.map((val) => (
//                           <MenuItem
//                             key={val}
//                             value={val}
//                             className="select-box-option"
//                             sx={{ fontWeight: 600 }}
//                           >
//                             {val}
//                           </MenuItem>
//                         ))}
//                       </Select>
                   
//                   {/* )} */}
//                 </>
//               </div>
//               {value.length >= 0 && formErrors.location ? (<>
//                 <div className="error-container5">
//                   <FiAlertCircle size={16} color="red"/>
//                   <p className="error-message">{ formErrors.location}</p>
//                 </div>
//               </> ): ""}

//               <input
//                 type="submit"
//                 className="btn"
//                 value="Sign up" /*onClick={Cropinfo}*/
//               />
//             </form>
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// }



import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Container,
  IconButton,
  Input,
  InputAdornment,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { AiFillLock } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaAddressBook, FaUserAlt } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { useNavigate } from "react-router";
import fpng from "../../assets/image/fpng.png";
import { useUserAuth } from "../../context/UserAuthContext";
import "./signup.css";

export default function Signup() {
  const navigate = useNavigate();

  const initialValues = {
    user_type: "Farmer",
    user_name: "",
    phoneNo: "",
    email: "",
    password: "",
    location: "Kerala",
    shop: "",
    city: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [values, setValues] = useState({ password: "", showPassword: false });
  const [selected, setSelected] = useState("Farmer");
  const [value, setValue] = useState("");

  const { signUp, addUser } = useUserAuth();

  const menuItems = ["Karnataka", "Kerala", "Tamilnadu", "Andrapradesh"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrorDisplay(false);
  };

  const handlePasswordChange = (e) => {
    setValues({ ...values, password: e.target.value });
    setFormValues({ ...formValues, password: e.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleSelectChange = (e) => {
    setValue(e.target.value);
    setFormValues({ ...formValues, location: e.target.value });
  };

  const handleRadioChange = (e) => {
    setSelected(e.target.value);
    setFormValues({ ...formValues, user_type: e.target.value, shop: e.target.value === "Market" ? formValues.shop : "" });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/;


    if (!values.user_name) errors.user_name = "Username is required!";
    if (!regex.test(values.phoneNo)) errors.phoneNo = "This is not a valid phone number!";
    if (!values.password) {
      errors.password = { message: "Password is required!", type: "required" };
    } else if (values.password.length < 4) {
      errors.password = { message: "Password must be more than 4 characters!", type: "too_short" };
    } else if (values.password.length > 10) {
      errors.password = { message: "Password cannot exceed more than 10 characters!", type: "too_long" };
    }
    else if (!passwordRegex.test(values.password)) {
      errors.password = {
        message: "Password needs upper, lower, and a special character.",
        type: "invalid_format",
      };
    }
    if (!values.city) errors.city = "City is required!";
    if (!values.location) errors.location = "State is required!";
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Email is not valid!";
    }
    if (values.user_type === "Market" && !values.shop) {
      errors.shop = "Shop name is required!";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    
    const errors = validate(formValues);
    setFormErrors(errors);
    console.log("line 628");
    console.log(Object.keys(errors).length);
    console.log(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
      const pass=formValues.password;
      try {
        await addUser(formValues).then(result=>{
          if (result !== "success") {
            setErrorDisplay(true);
            formValues.password=pass
          } else {
            navigate("/login");
          }
      })
        
      } catch (err) {
        console.error(err);
      }
    } else {
      setIsSubmit(false);
    }
  };

  return (
    <Container>
      <div className="container" style={{ height: "100vh", overflowY: "auto" }}>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>One of us?</h3>
              <p>We are helping farmers to produce their products and providing 24/7 guidance.</p>
              <button className="btn transparent" onClick={() => navigate("/login")}>
                Log in
              </button>
            </div>
            <img src={fpng} className="image" alt="fpng" />
          </div>
        </div>

        <div className="forms-container">
          <div className="signin-signup1">
            <form className="sign-in-form1" onSubmit={handleSubmit}>
              <h2 className="title">Sign up</h2>

              {errorDisplay && (
                <Alert severity="error" sx={{ width: "380px", borderRadius: "55px", marginBottom: "20px" }}>
                  The requested email ID is already in use.
                </Alert>
              )}

              <div className="radio">
                <label>
                  <input type="radio" name="rb" value="Farmer" onChange={handleRadioChange} checked={selected === "Farmer"}  /> Farmer
                  <input type="radio" name="rb" value="Market" onChange={handleRadioChange} checked={selected === "Market"} style ={{marginLeft:"10px"}}/> Market owner
                </label>
              </div>

              <div className="input-field1">
                <div className="icon">
                  <FaUserAlt size={16} />
                </div>
                <input type="text" name="user_name" value={formValues.user_name} placeholder="Full name" onChange={handleChange} />
              </div>
              {formErrors.user_name && <ErrorMessage message={formErrors.user_name} margin={"189px"}/>}
              
              {selected === "Market" && (
                <>
                <div className="input-field1">
                  <div className="icon">
                    <FaAddressBook size={16} />
                  </div>
                  <input
                    type="text"
                    name="shop"
                    placeholder="Shop"
                    value={formValues.shop}
                    onChange={handleChange}
                  />
                </div>
                
                {formErrors.shop && <ErrorMessage message={formErrors.shop} margin={"185px"} />}
                
                </>
              )}
              <div className="input-field1">
                <div className="icon">
                  <MdEmail size={19} />
                </div>
                <input type="email" name="email" value={formValues.email} placeholder="Email" onChange={handleChange} />
              </div>
              {formErrors.email && <ErrorMessage message={formErrors.email} margin={"214px"} />}

              <div className="input-field1">
                <div className="icon">
                  <BsFillTelephoneFill size={16} />
                </div>
                <input type="tel" name="phoneNo" value={formValues.phoneNo} placeholder="Phone number" onChange={handleChange} />
              </div>
              {formErrors.phoneNo && <ErrorMessage message={formErrors.phoneNo} margin={"130px"}/>}

              <div className="input-field1">
                <div className="icon">
                  <AiFillLock size={19} />
                </div>
                <Input
                  type={values.showPassword ? "text" : "password"}
                  onChange={handlePasswordChange}
                  value={values.password}
                  className="custom-input"
                  placeholder="Password"
                  disableUnderline
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </div>
              {formErrors.password &&  <ErrorMessage
    message={formErrors.password.message}
    margin={
      formErrors.password.type === "required"
        ? "190px"
        : formErrors.password.type === "too_short"
        ? "78px"
        : formErrors.password.type === "too_long"
        ? "35px"
        : formErrors.password.type === "invalid_format"?
        "17px":"190px"
    }/>}

              <div className="input-field1">
                <div className="icon">
                  <MdLocationPin size={19} />
                </div>
                <input type="text" name="city" value={formValues.city} placeholder="Enter your city" onChange={handleChange} />
              </div>
              {formErrors.city && <ErrorMessage message={formErrors.city} margin={"220px"} />}

              <div className="input-field1">
                <div className="icon">
                  <MdLocationPin size={19} />
                </div>
                <Select
                  onChange={handleSelectChange}
                  name="location"
                  value={formValues.location}
                  placeholder="State"
                  disableUnderline
                  sx={{ fontWeight: 600, height:"40px", boxShadow: "none",fontFamily: "inherit",
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'transparent',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'transparent',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'transparent',
                    },
                    '&:focus .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'transparent',
                    }}}
                >
                  {menuItems.map((val) => (
                    <MenuItem key={val} value={val} sx={{ fontWeight: 600,'&:focus': { backgroundColor: 'transparent' } }}>
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              {formErrors.location && <ErrorMessage message={formErrors.location} margin={"200px"} />}

              <input type="submit" className="btn solid" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}

const ErrorMessage = ({ message,margin }) => (
  <p style={{ color: "#f00", display: "flex", alignItems: "center", marginBottom: "8px", fontSize: "12px", fontWeight: "500",lineHeight:"0px",marginRight:margin }}>
    <FiAlertCircle style={{ marginRight: "6px" }} />
    {message}
  </p>
);
