import React, { useState } from 'react'
import './BuyFertilizer.scss'
import { Icon } from '@iconify/react';
import { InputAdornment, TextField } from '@mui/material';
import { useUserAuth } from "../../context/UserAuthContext";
import { useNavigate } from 'react-router'
import { loadStripe } from "@stripe/stripe-js";
import Backdrop from '@mui/material/Backdrop';
import axios from 'axios';
import Loder from '../Loder/LoderPayment';



const BuyFertilizer = ({ id, open, onClose, data }) => {
    console.log(new Date().getDate());
    const [kg, setKg] = useState(0)
    const { user, makeDeal, getCropMarket, buyFertilizer } = useUserAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    //const stripe = new stripePromise(STRIPE_SECRET_KEY);

    const navigate = useNavigate()

    const handelsell = async () => {
        if(kg>0){
        setIsProcessing(true);
        setErrorMessage('');
        const senddata = {
            quantity: kg,
            farmerName: user.user_name,
            owner: data.owner
        }

        const STRIPE_SECRET_KEY = "pk_test_51OYphVSIebbx1BJCR4C4jNX9wd0oKwi9ThyTG8ufLWzwqrWzzL2VH1L4huRz939976Q0mUUOFlOq9uSPLu7vnP2600J1DoRnHF"
        // Initialize Stripe with your publishable key
        const stripePromise = loadStripe(STRIPE_SECRET_KEY);
        const stripe = await stripePromise;
        const url = 'http://localhost:8080/checkout';
        const transaction = {
            id: id,
            owner: data.owner,
            name: data.name,
            offerPrice: data.offerPrice,
            quantity: kg,
            farmerName: user.user_name,
            email: user.email
        }
        const res = await axios.post(url, transaction);

        await stripe.redirectToCheckout({ sessionId: res.data.data })
        // buyFertilizer(id,senddata)
        // navigate(`/buysucess/${(kg*data.offerPrice)}`)
    }
    else {
        setErrorMessage('Please enter a quantity greater than 0.');
    }

    }

    const handelclose = async () => {
        onClose()
    }

    if (!open) return null
    return (
        <>
        <div className='overlayfer'>
            <div onClick={(e) => {
                e.stopPropagation()
            }} className='modelcontainerfer'>
                <div className='modal_leftfer'>
                    <img src={data.url} alt="" />
                </div>


                <div className='modal_rightfer'>
                    <div className='modal_closefer'>
                        <p onClick={() => handelclose()}>X</p>
                    </div>

                    <div className='modal_bodyfer'>
                        <h1>{data.name}</h1>
                        <div className='sellerfer'>
                            <Icon icon="icon-park-solid:avatar" width="30" height="30" />
                            <h2>{data.owner}</h2>
                        </div>

                        <div className='locationfer'>
                            <Icon icon="ep:location-filled" width="30" height="30" />
                            <h2>{data.location}</h2>
                        </div>
                        <div className='pricefer'>
                            <Icon icon="heroicons-solid:currency-rupee" width="30" height="30" />
                            <h2 style={{ color: "green" }}>{data.offerPrice}/Item</h2>
                            <h2 style={{ textDecoration: ' line-through' }}>({data.mrp})</h2>
                        </div>

                        <div className="sellfer">
                            <TextField
                                label="Quantity"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '25ch', color: "#ffffff" }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start" sx={{ color: "black" }}>Qty</InputAdornment>,
                                }}
                                value={kg}
                                onChange={(e) => setKg(e.target.value)}
                                type='number'
                            />
                        </div>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        <div className='modalbtnfer'>
                            <div className='btnclosefer' onClick={() => handelclose()}>
                                <Icon icon="eva:close-outline" color="white" width="24" height="24" />
                                <h2>Close</h2>
                            </div>
                        
                             <div className="btnsellfer" onClick={()=>handelsell()}>
                                    <Icon icon="icons8:buy" color="white" width="24" height="24" />
                                    <h2>Buy</h2>
                                    </div>
                              
                        </div>
                    </div>
                </div>
            </div>
            {isProcessing && <Loder />} 
        </div>
        
        </>
    )
}

export default BuyFertilizer