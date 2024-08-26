import React from 'react'
import './BuyDone.scss'
import image from '../../assets/cancel.gif'
import { useNavigate } from 'react-router-dom';
import Lottie from "react-lottie";
import cancel from "../../assets/cancel-lottie.json"


const Cancel = () => {
    const navigate = useNavigate()
  
 
    const handelclose = async() =>{
        navigate('/fertilizermarket')
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: cancel, // the path to your animation data
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };

  return (
    
    <div className='overlaydone'>
              <div onClick={(e)=>{
            e.stopPropagation()
        }} className='modelcontainerdone'>         
        <div className='modal_leftdoneCancel'>
                {/* <img src={image} alt="" /> */}
                 <Lottie options={defaultOptions} height={270} width={270} />
            </div>
            <div className='modal_rightdone'>
                <div className='modal_closedone'>
                    <p onClick={()=>handelclose()}>X</p>
                </div>

                <div className='modal_bodycancel'>
                    <h1>Your payment failed</h1>
                </div>
            </div>
            </div>
    </div>
   
  )
}

export default Cancel

