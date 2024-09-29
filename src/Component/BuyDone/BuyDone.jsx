import React, { useState,useEffect } from 'react'
import './BuyDone.scss'
import done from '../../assets/image/done.gif'
import {useNavigate} from 'react-router'
import { useParams,useLocation } from "react-router-dom";
import Lottie from "react-lottie";
import success from "../../assets/success2.json"
import axios from 'axios';
import Loder from '../Loder/Loder'
import { useUserAuth } from "../../context/UserAuthContext";



const BuyDone = () => {
    const navigate = useNavigate()
  const params = useParams();
  const location = useLocation();
  const[data,setData]=useState({})
  const {buyFertilizer } =useUserAuth();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: success, // the path to your animation data
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const getdata=async()=>{
      const searchParams = new URLSearchParams(location.search);
        const sessionId = searchParams.get('session_id');
        console.log("line 27",sessionId);
      const url = 'http://localhost:8080/checkout/success';
      const transaction={
        session_id:sessionId
      }
    const res= await axios.post(url, transaction);
    console.log("line 33",res.data.data);
    setData(res.data.data)
    const ids = res.data.data.ids;

ids.forEach(async (ans) => {
    await buyFertilizer(ans.id);
});
const email = res.data.data.email
console.log("line 47", email);

const url1 = 'http://localhost:8080/deleteCartByUser';
 await axios.post(url1, {email});
    }
    

   getdata()
  }, [])

    const handelclose = async() =>{
        navigate('/orders')
    }
  return (<>
    {data?
    <div className='overlaydone'>
              <div onClick={(e)=>{
            e.stopPropagation()
        }} className='modelcontainerdone'>         
        <div className='modal_leftdone'>
                <img src={done} alt="" />
                {/* <Lottie options={defaultOptions} height={400} width={400} /> */}
            </div>
            <div className='modal_rightdone'>
                <div className='modal_closedone'>
                    <p onClick={()=>handelclose()}>X</p>
                </div>

                <div className='modal_bodydone'>
                    <h1>Your payment worth ₹{data.totalAmount} successful</h1>
                    <h1>Your Order will be initiated soon</h1>
                    <h1>Thank you for choosing Us</h1>
                </div>
            </div>
            </div>
    </div>
    :<Loder/>}
    </>
  )
}

export default BuyDone

