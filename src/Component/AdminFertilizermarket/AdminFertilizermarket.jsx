import React, { useEffect, useState } from 'react'
import wheat from '../../assets/image/Pesticides.jpg'
import money from '../../assets/image/money_1.jpg'
import rupee from '../../assets/image/rupee.jpg'
import "./AdminFertilizermarketstyle.scss"

import { Icon } from '@iconify/react'
import { collection } from "firebase/firestore"
import Footer from "../../Component/Footer/Footer"
import { db } from "../../config/firebase"
import { useUserAuth } from "../../context/UserAuthContext"
import AdminFertilizerCard from '../AdminFertilizerCard/AdminFertilizerCard'
import CarouselList from '../Carousel/CarouselFertilizer'
import CropModel from '../CropModel/CropModel'
import Loder from '../Loder/Loder'
import Nav from '../nav/Nav'


const AdminFertilizermarket = () => {
    const[open,setOpen]=useState(false)
    const[cropmarket,setCropmarket]=useState(null)
    const {getFertilizerMarket } =useUserAuth();
    const ref=collection(db,"fertilizer market")
    useEffect(() => {
      const getdata=async()=>{
        const data = await getFertilizerMarket()
        await setCropmarket(data);
        // const data = onSnapshot(ref, (doc) => {
        //   console.log("line 28",doc.docs);
        //   setCropmarket(doc.docs)
        // });
      }
     getdata()
    }, [window.location.pathname==="/fertilizermarket"])
    
  return (
    <div className='admincropmarketmainfer'>
      <Nav/>
     {cropmarket
     ?<>
     
     <div className='markettopfer'>
        <div className='carousel'>
        <CarouselList type={""}/>
        </div>

        <div className='banner'>
          <div className='eachbanner'>
            <img style={{opacity:"0.7"}} src={wheat} alt="" />
            <div className='text-block'  style={{position:"absolute",top:"50px",left:"30px"}}>
              <p>Directly  From Dealer To Farmer</p>
            </div>
          </div>
          <div className='eachbanner'>
            <img src={money} alt="" />
            <div className='text-block' style={{position:"absolute",top:"50px",right:"30px"}}>
              <p>Fertillizer At Factory Rate  </p>
            </div>
          </div>
          <div className='eachbanner'>
            <img src={rupee} alt="" />
            <div className='text-block'  style={{position:"absolute",top:"40px",left:"30px"}}>
              <p>No middle man....</p>
              <p>No processing Fee...</p>
            </div>
          </div>
        </div>
      </div>
      <div className='adminmarketcard'>
        <div className='admincardheading'>
            <h5>Your Fertilizer MarketPlace </h5>
             <div className='addbtn' onClick={()=>setOpen(true)}>
             <Icon icon="carbon:add-alt" color="white" width="24" height="24" />
             <h5>Add</h5>
             </div>
            <div>
            </div>
        </div>

        <div className='cardlist'>
          {
            cropmarket.map((cropone)=>(
              <AdminFertilizerCard id={cropone._id} data={cropone}/>
            ))
          }
        </div>
      </div>
     </>:<Loder/>}
     <CropModel open={open} onClose={()=>{setOpen(false)}} type="fertilizer"/>

     <Footer/>
    </div>
  )
}

export default AdminFertilizermarket
