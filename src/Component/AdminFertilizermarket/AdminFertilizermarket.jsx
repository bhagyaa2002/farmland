import React,{useState,useEffect} from 'react'
import "./AdminFertilizermarketstyle.scss"
import wheat from '../../assets/image/Pesticides.jpg'
import money from '../../assets/image/money_1.jpg'
import rupee from '../../assets/image/rupee.jpg'

import CarouselList from '../Carousel/CarouselFertilizer'
import Nav from '../nav/Nav'
import { Icon } from '@iconify/react'
import AdminCropcard from '../AdminCropcard/AdminCropcard'
import CropModel from '../CropModel/CropModel'
import { useUserAuth } from "../../context/UserAuthContext";
import AdminFertilizerCard from '../AdminFertilizerCard/AdminFertilizerCard'
import {collection,onSnapshot} from "firebase/firestore"
import {db} from "../../config/firebase"
import Loder from '../Loder/Loder'

const AdminFertilizermarket = () => {
    const[open,setOpen]=useState(false)
    const[cropmarket,setCropmarket]=useState(null)
    const {getFertilizerMarket } =useUserAuth();
    const ref=collection(db,"fertilizer market")
    useEffect(() => {
      const getdata=async()=>{
        // const data = await getFertilizerMarket()
        // await setCropmarket(data.docs);
        const data = onSnapshot(ref, (doc) => {
          setCropmarket(doc.docs)
        });
      }
     getdata()
    }, [window.location.pathname==="/fertilizermarket", open])
    
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
              <AdminFertilizerCard id={cropone.id} data={cropone.data()}/>
            ))
          }
        </div>
      </div>
     </>:<Loder/>}
     <CropModel open={open} onClose={()=>{setOpen(false)}} type="fertilizer"/>

      
    </div>
  )
}

export default AdminFertilizermarket
