import React, { useState } from "react";
import "./ForgotPassword.scss";
import { FaUserAlt } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import farmer2 from "../../assets/image/farmer2.png";
import { Container, Input, InputAdornment, IconButton } from "@mui/material";
import { useNavigate } from "react-router";
import { useUserAuth } from "../../context/UserAuthContext";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "@mui/material";
import { MdEmail } from "react-icons/md";
import {auth} from "../../config/firebase"
import {sendPasswordResetEmail} from "firebase/auth"
// import { Alert } from "@mui/material";
import { BsFillTelephoneFill } from "react-icons/bs";


export default function ForgotPassword() {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const navigate = useNavigate();

  const Signup = () => {
    navigate("/login");
  };

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { logIn, getCrop, forgotPassword} = useUserAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email.length>0 && phone.length>0){
      
    const data={
      email:email,
      phone:phone
    }
    setIsSubmitting(true); // Disable submit button
    setMessage(""); 
    setErrorMessage("")
    try {
      await forgotPassword(data);
      setMessage("Password reset email has been sent."); // Success message
      // setTimeout(() => {
        
      // }, 3000);
      // navigate("/login");
      setEmail("")
      setPhone("")
    } catch (error) {
      setErrorMessage("User not found or phone number does not match."); // Error message
    } finally {
      setIsSubmitting(false); // Re-enable submit button
    }
    }
    else{
      setErrorMessage("Please enter the details.");
    }
    
  

  };
  return (
    <Container>
      <div className="parent">
        <div className="container">
          <div className="forms-container">
            <div className="signin-signup">
              <form
                className="sign-in-form"
                name="myLoginForm"
                onSubmit={handleSubmit}
              >
                <h2 className="title">Forgot Password</h2>
                {/* {error && <Alert variant="danger">{error}</Alert> } */}
                {message && <div className="success-message">{message}</div>}
                {errormessage && <div className="forgot-message">{errormessage}</div>}
                <div className="input-field">
                  <div className="icon">
                  <MdEmail size={16} />

                  </div>
                  <input
                    type="text"
                    name="user_phone"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                
                </div>
                <div className="input-field">
                  <div className="icon">
                  <BsFillTelephoneFill size={16} />
                  </div>
                  <input
                    type="text"
                    name="user_phone"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <input
                  type="Submit"
                  value="Reset Password"
                  className="btn solid" /*onClick={Cropinfo}*/
                  disabled={isSubmitting}
                />
              </form>
            </div>
          </div>

          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <h3>Already Have Account ?</h3>
                <p>
                  Join the Technology Unifying,The Largest Community in
                  India-Farmers
                </p>
                <button
                  className="btn transparent"
                  id="sign-up-btn"
                  onClick={Signup}
                >
                Login
                </button>
              </div>
              <img src={farmer2} className="image" alt="" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
