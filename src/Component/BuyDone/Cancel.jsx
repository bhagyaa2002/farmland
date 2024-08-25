import React from 'react'
import './BuyDone.scss'
import image from '../../assets/cancel.gif'
import { useNavigate } from 'react-router-dom';


const Cancel = () => {
    const navigate = useNavigate()
  
 
    const handelclose = async() =>{
        navigate('/fertilizermarket')
    }


  return (
    
    <div className='overlaydone'>
              <div onClick={(e)=>{
            e.stopPropagation()
        }} className='modelcontainerdone'>         
        <div className='modal_leftdone'>
                <img src={image} alt="" />
            </div>
            <div className='modal_rightdone'>
                <div className='modal_closedone'>
                    <p onClick={()=>handelclose()}>X</p>
                </div>

                <div className='modal_bodydone'>
                    <h1>Your payment failed</h1>
                </div>
            </div>
            </div>
    </div>
   
  )
}

export default Cancel

